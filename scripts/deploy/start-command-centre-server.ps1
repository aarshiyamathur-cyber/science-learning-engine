# Runs the Command Centre's production server (port 3001). Registered as a
# Scheduled Task ("AarshiyaCommandCentreServer") with restart-on-failure,
# mirroring start-server.ps1's pattern for the main learning app.
Set-Location "D:\Projects\aarshiya-science-learning-system\apps\command-centre"
$logFile = "D:\Projects\aarshiya-science-learning-system\scripts\deploy\command-centre-server.log"
Start-Transcript -Path $logFile -Force | Out-Null

if (-not (Test-Path ".next")) {
    npm run build
}

npm run start
