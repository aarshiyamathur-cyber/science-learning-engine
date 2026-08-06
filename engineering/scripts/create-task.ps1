[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$TaskId,
  [string]$Title
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

if (-not $Title) {
  $roadmap = Join-Path $repoRoot "management\ROADMAP.md"
  if (-not (Test-Path $roadmap)) { throw "Title is required because management/ROADMAP.md was not found." }
  $match = Select-String -Path $roadmap -Pattern [regex]::Escape($TaskId) | Select-Object -First 1
  if (-not $match) { throw "Task '$TaskId' was not found in management/ROADMAP.md. Supply -Title after confirming the task." }
  $Title = ($match.Line -replace "^.*$([regex]::Escape($TaskId))", "").Trim(" |`t-")
}

$slug = ($Title.ToLowerInvariant() -replace "[^a-z0-9]+", "-").Trim("-")
if (-not $slug) { throw "Task title must contain letters or numbers." }
$branch = "agent/$($TaskId.ToLowerInvariant())-$slug"

if ((git status --porcelain)) { throw "Working tree is not clean; commit or stash changes before creating a task branch." }
git switch -c $branch
Write-Output "Created task branch: $branch"
