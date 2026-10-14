[CmdletBinding()]
param()

# Thin wrapper around validators/validate-framework.js. The check logic
# lives in the Node script so it has exactly one implementation across
# Windows, Linux, and container/CI environments. This wrapper exists only
# for PowerShell users who prefer running a .ps1 directly.
#
# Requires Node.js on PATH. If Node is unavailable, run the JS file with
# any Node runtime, e.g.: node validators/validate-framework.js

$ErrorActionPreference = 'Stop'
$frameworkRoot = Split-Path -Parent $PSScriptRoot
$validatorScript = Join-Path $frameworkRoot 'validators/validate-framework.js'

$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Error "Node.js was not found on PATH. Install Node.js, or run: node `"$validatorScript`" from an environment that has it."
    exit 1
}

& node $validatorScript
exit $LASTEXITCODE
