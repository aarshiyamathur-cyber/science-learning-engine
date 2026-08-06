[CmdletBinding()]
param(
  [string]$BaseBranch = "origin/master"
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

$branch = (git branch --show-current).Trim()
if (-not $branch) { throw "No current branch detected." }
$commits = git log --format="- %s (%h)" "$BaseBranch..HEAD"
if (-not $commits) { throw "No commits found between $BaseBranch and $branch." }
$files = git diff --name-only "$BaseBranch...HEAD" | ForEach-Object { "- $_" }
$filesText = $files -join [Environment]::NewLine

$body = @(
  "## Summary",
  "",
  $commits,
  "",
  "## Changed areas",
  "",
  $filesText,
  "",
  "## Validation",
  "",
  "- [ ] engineering/scripts/review.ps1 completed",
  "- [ ] CI passed",
  "- [ ] QA/reviewer evidence attached where required",
  "",
  "## Scope",
  "",
  "Branch: $branch",
  "Base: $BaseBranch"
) -join [Environment]::NewLine

Write-Output $body