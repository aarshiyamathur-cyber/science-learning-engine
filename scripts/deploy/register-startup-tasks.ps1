# One-time setup: registers the app server and tunnel as Windows Scheduled
# Tasks that start at logon and auto-restart on crash, so the live demo
# survives machine restarts without someone manually re-running npm/cloudflared.
# Re-run this script any time to re-register (it replaces existing tasks
# of the same name first, so it's safe to run more than once).
$ErrorActionPreference = "Stop"
$repoRoot = "D:\Projects\aarshiya-science-learning-system"
$user = "$env:USERDOMAIN\$env:USERNAME"

$settings = New-ScheduledTaskSettingsSet `
    -RestartCount 999 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit ([TimeSpan]::Zero) `
    -MultipleInstances IgnoreNew `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries

$principal = New-ScheduledTaskPrincipal -UserId $user -LogonType Interactive -RunLevel Limited
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $user

$serverAction = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$repoRoot\scripts\deploy\start-server.ps1`""
$tunnelAction = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$repoRoot\scripts\deploy\start-tunnel.ps1`""

foreach ($name in @("AarshiyaAppServer", "AarshiyaTunnel")) {
    Unregister-ScheduledTask -TaskName $name -Confirm:$false -ErrorAction SilentlyContinue
}

Register-ScheduledTask -TaskName "AarshiyaAppServer" -Action $serverAction -Trigger $trigger -Settings $settings -Principal $principal | Out-Null
Register-ScheduledTask -TaskName "AarshiyaTunnel" -Action $tunnelAction -Trigger $trigger -Settings $settings -Principal $principal | Out-Null

Write-Output "Registered AarshiyaAppServer and AarshiyaTunnel (trigger: at logon for $user, restart on failure)."
