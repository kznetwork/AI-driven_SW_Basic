# pre_tool_use_guard.ps1 - block dangerous commands before they run
$payload = [Console]::In.ReadToEnd()
$event = $payload | ConvertFrom-Json
$command = [string]$event.tool_input.command

# pattern and reason (keep this file ASCII-only: Windows PowerShell 5.1 can misread Korean)
$rules = @(
  @('\brm\s+(-\w+\s+)*-\w*[rR]', 'recursive delete'),
  @('Remove-Item(?=.*-Recurse)', 'recursive delete'),
  @('\b(rmdir|rd)\s+(.*\s)?/s', 'recursive delete'),
  @('git\s+push.*(--force|\s-f\b)', 'force push'),
  @('git\s+reset\s+--hard', 'discard all changes'),
  @('\.env\b(?!\.example)', 'secret file access')
)

foreach ($rule in $rules) {
  $pattern, $reason = $rule
  if ($command -match $pattern) {
    @{ hookSpecificOutput = @{
         hookEventName            = 'PreToolUse'
         permissionDecision       = 'deny'
         permissionDecisionReason = "Blocked by course hook: $reason"
    } } | ConvertTo-Json -Compress -Depth 5
    exit 0
  }
}
exit 0
