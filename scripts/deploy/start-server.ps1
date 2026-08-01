# Runs the production Next.js server. Registered as a Scheduled Task
# ("AarshiyaAppServer") with restart-on-failure, so it survives machine
# restarts and process crashes without a person watching it.
$ErrorActionPreference = "Stop"
Set-Location "D:\Projects\aarshiya-science-learning-system"

if (-not (Test-Path ".next")) {
    npm run build
}

npm run start
