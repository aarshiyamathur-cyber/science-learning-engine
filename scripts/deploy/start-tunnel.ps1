# Starts a Cloudflare quick tunnel pointed at the local app server, then
# records whatever fresh URL it was assigned (quick tunnels mint a new
# random hostname every time they start) into the two docs that reference
# it, commits + pushes that update, and pings Telegram with the new link.
# Registered as a Scheduled Task ("AarshiyaTunnel") with restart-on-failure.
$ErrorActionPreference = "Continue"
$repoRoot = "D:\Projects\aarshiya-science-learning-system"
$cloudflaredExe = "C:\Users\Lenovo\bin\cloudflared.exe"
$logFile = Join-Path $repoRoot "scripts\deploy\tunnel-current.log"
$errFile = Join-Path $repoRoot "scripts\deploy\tunnel-current.err.log"
$telegramTarget = "8714504720"

Set-Location $repoRoot

# Wait for the local app server to be reachable before opening the tunnel.
$deadline = (Get-Date).AddMinutes(2)
$serverUp = $false
while ((Get-Date) -lt $deadline) {
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 3
        if ($resp.StatusCode -eq 200) { $serverUp = $true; break }
    } catch {}
    Start-Sleep -Seconds 2
}
if (-not $serverUp) {
    Write-Output "Local server never came up on port 3000 after 2 minutes; starting tunnel anyway."
}

Remove-Item $logFile, $errFile -ErrorAction SilentlyContinue
$proc = Start-Process -FilePath $cloudflaredExe -ArgumentList "tunnel", "--url", "http://localhost:3000" `
    -RedirectStandardOutput $logFile -RedirectStandardError $errFile -PassThru -NoNewWindow

# Poll the log for the freshly assigned quick-tunnel URL (cloudflared logs to stderr).
$url = $null
$urlDeadline = (Get-Date).AddSeconds(30)
while ((Get-Date) -lt $urlDeadline -and -not $url) {
    Start-Sleep -Seconds 1
    $content = ""
    if (Test-Path $logFile) { $content += (Get-Content $logFile -Raw) }
    if (Test-Path $errFile) { $content += (Get-Content $errFile -Raw) }
    if ($content -match 'https://[a-z0-9-]+\.trycloudflare\.com') {
        $url = $matches[0]
    }
}

if ($url) {
    Write-Output "New tunnel URL: $url"

    $briefing = Join-Path $repoRoot "docs\product-owner-briefing.md"
    $liveFactory = Join-Path $repoRoot "management\LIVE_FACTORY.md"
    (Get-Content $briefing -Raw) -replace 'https://[a-z0-9-]+\.trycloudflare\.com', $url | Set-Content $briefing -NoNewline
    (Get-Content $liveFactory -Raw) -replace 'https://[a-z0-9-]+\.trycloudflare\.com', $url | Set-Content $liveFactory -NoNewline

    git add $briefing $liveFactory
    git commit -m "Auto-update live demo URL after restart ($url)" | Out-Null

    $pushed = $false
    for ($i = 0; $i -lt 5; $i++) {
        git push origin master 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) { $pushed = $true; break }
        Start-Sleep -Seconds 15
    }

    $status = if ($pushed) { "pushed to GitHub" } else { "NOT pushed - network was unreachable, will retry next session" }
    try {
        npx openclaw message send --channel telegram --target $telegramTarget -m "Aarshiya app restarted. New live URL: $url ($status)" | Out-Null
    } catch {
        Write-Output "Telegram notify failed: $_"
    }
} else {
    Write-Output "Could not find a tunnel URL in cloudflared's output within 30s."
}

# Tie this script's lifetime to cloudflared's, so Task Scheduler's
# restart-on-failure fires when the tunnel process actually dies.
Wait-Process -Id $proc.Id
