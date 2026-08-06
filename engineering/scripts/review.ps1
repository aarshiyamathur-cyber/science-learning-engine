[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

function Invoke-ReviewCommand {
  param(
    [Parameter(Mandatory = $true)] [string]$Label,
    [Parameter(Mandatory = $true)] [scriptblock]$Command
  )

  Write-Output "Running $Label..."
  & $Command
  if ($LASTEXITCODE -ne 0) { throw "$Label failed with exit code $LASTEXITCODE." }
}

Invoke-ReviewCommand "lint" { npm run lint }
Invoke-ReviewCommand "tests" { npm test }
Invoke-ReviewCommand "build" { npm run build }
Invoke-ReviewCommand "curriculum validation" { npm run validate:curriculum }
Invoke-ReviewCommand "accessibility validation" { & (Join-Path $PSScriptRoot "accessibility-validation.ps1") }

Write-Output "Review checks completed successfully."