# Starts a Cloudflare quick tunnel pointed at the Command Centre server
# (port 3001), then records whatever fresh URL it was assigned (quick
# tunnels mint a new random hostname every time they start) into
# management/COMMAND_CENTRE.md, commits + pushes that update, and pings
# Telegram with the new link. Registered as a Scheduled Task
# ("AarshiyaCommandCentreTunnel") with restart-on-failure, mirroring
# start-tunnel.ps1's pattern for the main app.
#
# CAVEAT: like the main app's tunnel, this URL is stable only as long as
# this process keeps running without crashing or the machine restarting -
# it is NOT a permanent address. A genuinely permanent URL needs either a
# Cloudflare account + a named tunnel on a domain you control, or deploying
# to a hosting platform (e.g. Vercel) - both require an account the Sponsor
# would need to create, which this automation does not do.
$ErrorActionPreference = "Continue"
$repoRoot = "D:\Projects\aarshiya-science-learning-system"
Start-Transcript -Path (Join-Path $repoRoot "scripts\deploy\command-centre-tunnel-script.log") -Force | Out-Null
$cloudflaredExe = "C:\Users\Lenovo\bin\cloudflared.exe"
$logFile = Join-Path $repoRoot "scripts\deploy\command-centre-tunnel-current.log"
$errFile = Join-Path $repoRoot "scripts\deploy\command-centre-tunnel-current.err.log"
$telegramTarget = "8714504720"

Set-Location $repoRoot

# Wait for the local Command Centre server to be reachable before opening the tunnel.
$deadline = (Get-Date).AddMinutes(2)
$serverUp = $false
while ((Get-Date) -lt $deadline) {
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -TimeoutSec 3
        if ($resp.StatusCode -eq 200) { $serverUp = $true; break }
    } catch {}
    Start-Sleep -Seconds 2
}
if (-not $serverUp) {
    Write-Output "Command Centre server never came up on port 3001 after 2 minutes; starting tunnel anyway."
}

Remove-Item $logFile, $errFile -ErrorAction SilentlyContinue
$proc = Start-Process -FilePath $cloudflaredExe -ArgumentList "tunnel", "--url", "http://localhost:3001" `
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
    Write-Output "New Command Centre tunnel URL: $url"

    $ccDoc = Join-Path $repoRoot "management\COMMAND_CENTRE.md"
    if (Test-Path $ccDoc) {
        $content = Get-Content $ccDoc -Raw
        if ($content -match 'https://[a-z0-9-]+\.trycloudflare\.com') {
            $content = $content -replace 'https://[a-z0-9-]+\.trycloudflare\.com', $url
        } else {
            $content = $content + "`n## Live URL`n`n$url (ephemeral Cloudflare quick tunnel - see caveat in start-command-centre-tunnel.ps1)`n"
        }
        Set-Content $ccDoc -Value $content -NoNewline
        git add $ccDoc
        git commit -m "Auto-update Command Centre live URL after restart ($url)" | Out-Null

        $pushed = $false
        for ($i = 0; $i -lt 5; $i++) {
            git push origin master 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) { $pushed = $true; break }
            Start-Sleep -Seconds 15
        }
        $status = if ($pushed) { "pushed to GitHub" } else { "NOT pushed - network was unreachable, will retry next session" }
    } else {
        $status = "management/COMMAND_CENTRE.md not found - URL not recorded"
    }

    try {
        npx openclaw message send --channel telegram --target $telegramTarget -m "Command Centre restarted. New live URL: $url ($status)" | Out-Null
    } catch {
        Write-Output "Telegram notify failed: $_"
    }
} else {
    Write-Output "Could not find a tunnel URL in cloudflared's output within 30s."
}

# Tie this script's lifetime to cloudflared's, so Task Scheduler's
# restart-on-failure fires when the tunnel process actually dies.
Wait-Process -Id $proc.Id
