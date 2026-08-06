[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

$a11yTests = Get-ChildItem -Path @("tests", "app", "apps") -Recurse -File -Include "*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx" -ErrorAction SilentlyContinue |
  Select-String -Pattern "@accessibility|axe-core|jest-axe|toHaveNoViolations" -List

if (-not $a11yTests) {
  Write-Warning "No tagged automated accessibility tests are present. Manual keyboard, focus, and screen-reader review remains required for UI changes."
  exit 0
}

npm run test -- --grep "@accessibility"
