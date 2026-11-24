import json
import re
import sys

event = json.load(sys.stdin)
command = str(event.get("tool_input", {}).get("command", ""))

# 차단할 패턴과 이유 (이유는 영어로 쓴다)
RULES = [
  (r"\brm\s+(-\w+\s+)*-\w*[rR]", "recursive delete"),
  (r"Remove-Item(?=.*-Recurse)", "recursive delete"),
  (r"\b(rmdir|rd)\s+(.*\s)?/s", "recursive delete"),
  (r"git\s+push.*(--force|\s-f\b)", "force push"),
  (r"git\s+reset\s+--hard", "discard all changes"),
  (r"\.env\b(?!\.example)", "secret file access"),
]

for pattern, reason in RULES:
  if re.search(pattern, command):
    print(json.dumps({
      "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": f"Blocked by course hook: {reason}",
      }
    }))
    sys.exit(0)
sys.exit(0)
