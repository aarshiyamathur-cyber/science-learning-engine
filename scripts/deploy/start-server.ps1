# Runs the production Next.js server. Registered as a Scheduled Task
# ("AarshiyaAppServer") with restart-on-failure, so it survives machine
# restarts and process crashes without a person watching it.
#
# $ErrorActionPreference stays "Continue" (the default) around the actual
# npm/next invocations: under "Stop", PowerShell 5.1 treats any stderr line
# from a native process (npm/next print harmless warnings there routinely)
# as a terminating error, which silently killed this script seconds after
# launch - Task Scheduler then reported a clean exit (0) even though the
# server never actually served a single request.
Set-Location "D:\Projects\aarshiya-science-learning-system"
$logFile = "D:\Projects\aarshiya-science-learning-system\scripts\deploy\server.log"
Start-Transcript -Path $logFile -Force | Out-Null

if (-not (Test-Path ".next")) {
    npm run build
}

npm run start

