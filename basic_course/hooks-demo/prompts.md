# 실습 프롬프트 — hooks-demo
프로젝트 훅 — SessionStart · PostToolUse 읽기와 실행 확인, PreToolUse 차단 훅 만들기
교안: `(교안) Codex App을 활용한 소프트웨어 개발 기본 과정_v6.pptx` · 8장 훅 ① ~ ⑧ · 작업 폴더: `C:\DEV\hooks-demo`

## 어디에서 실습하나 (작업 폴더)

| 항목 | 내용 |
|---|---|
| 작업 폴더 | `C:\DEV\hooks-demo`  (macOS: `~/DEV/hooks-demo`) |
| 방식 | **제공 폴더 복사** — 이 폴더 전체를 `C:\DEV\hooks-demo` 로 복사한 뒤 Codex App 에서 **'폴더 열기'** 로 연다. |
| 해당 교안 절 | 8장 훅 ② ~ ⑧ (슬라이드 118 ~ 124) |
| 참고 | `참고\` 에 차단 훅 완성본(hooks.json · pre_tool_use_guard.ps1 · .py · course.rules)과 시험 결과표가 있다. 막힐 때만 비교한다. |

## 쓰는 법
- 프롬프트의 코드 블록을 복사해 **Codex 작성 칸**에 붙여 넣는다. 파일은 직접 쓰지 않고 **프롬프트로** 만든다.
- 프로젝트 훅은 **처음 로드할 때 검토와 신뢰**가 필요하다. 새 채팅을 열고 신뢰 알림을 확인한다 (CLI 는 `/hooks`).
- 응답 문구는 실행마다 다르다. 판단 기준은 **파일 · 화면 · 명령 실행 결과**다.

## 8장 · 훅 ② 프로젝트 설정

### hooks.json 읽기
<sub>슬라이드 118 · 8장 · 훅 ②</sub>

```text
@.codex/hooks.json 파일을 읽고 SessionStart와 PostToolUse가 언제 실행되는지 표로 설명해줘.
파일은 수정하지 마.
```

- 확인: SessionStart 는 새 채팅 시작·재개, PostToolUse 는 도구 실행 직후라는 설명이 나오는지 확인

## 8장 · 훅 ③ PostToolUse 기록 (선택)

### 왜 이벤트와 도구 이름만 기록하나
<sub>슬라이드 119 · 8장 · 훅 ③</sub>

```text
@.codex/hooks/post_tool_use.ps1 와 @.codex/hooks/post_tool_use.py 를 읽고,
왜 전체 도구 인수 대신 이벤트와 도구 이름만 기록하는지 설명해줘.
파일은 수정하지 마.
```

- 확인: 도구 인수에 비밀정보가 들어갈 수 있어 최소한만 기록한다는 설명

## 8장 · 훅 ④ 실행 확인

### 도구 실행 기록 확인
<sub>슬라이드 120 · 8장 · 훅 ④</sub>

```text
이 폴더에 hello-hook.txt 파일을 만들고 "hook works" 한 줄을 적어줘.
작업 후 .codex/hooks/events.jsonl 파일이 생겼는지 확인하고 마지막 기록의 event와 tool만 알려줘.
```

- 확인: `.codex/hooks/events.jsonl` 이 생기고 마지막 줄에 `PostToolUse` 기록이 있다. 프롬프트와 파일 내용은 기록되지 않는다.
- 실행되지 않으면: 새 채팅 → 신뢰 알림 → hooks.json 문법 → PowerShell 실행 정책 → events.jsonl 위치 순서로 확인

## 8장 · 훅 ⑥ 차단 훅 ① 설정

### hooks.json 에 PreToolUse 추가
<sub>슬라이드 122 · 8장 · 훅 ⑥</sub>

```text
@.codex/hooks.json 에 PreToolUse 훅을 추가해줘.
- matcher: Bash
- Windows 에서는 powershell.exe -NoProfile -ExecutionPolicy Bypass -File .codex/hooks/pre_tool_use_guard.ps1 실행
- 그 밖의 환경에서는 python3 .codex/hooks/pre_tool_use_guard.py 실행
- timeout 5초, statusMessage 는 "위험 명령 검사"
기존 SessionStart · PostToolUse 항목은 그대로 두고, 수정한 뒤 JSON 문법이 맞는지 확인해줘.
```

- 확인: `.codex/hooks.json` 에 `PreToolUse` · `"matcher": "Bash"` · `commandWindows` 가 들어갔고 기존 두 이벤트는 그대로다. (비교: `참고\hooks.json`)

## 8장 · 훅 ⑦ 차단 훅 ② 스크립트

### 위험 명령을 찾는 스크립트 만들기
<sub>슬라이드 123 · 8장 · 훅 ⑦</sub>

```text
@.codex/hooks/pre_tool_use_guard.ps1 파일을 만들어줘.
stdin 의 JSON 에서 tool_input.command 를 읽고, 아래 명령이면 차단해줘.
차단은 permissionDecision 이 deny 인 hookSpecificOutput JSON 을 출력하고 종료 코드 0 으로 끝낸다.
- 재귀 삭제: rm -r 류 · Remove-Item -Recurse · rmdir /s
- git push --force 또는 -f
- git reset --hard
- .env 파일 접근 (.env.example 은 허용)
차단 이유는 영어로 "Blocked by course hook: ..." 형식으로 쓰고, 파일 안에는 한글을 쓰지 말고 주석도 영어로 써줘.
만든 뒤 차단돼야 할 명령 2개와 허용돼야 할 명령 2개로 직접 시험하고 결과를 표로 보여줘.
```

- 확인: Codex 가 보여 준 시험 결과 표에서 막혀야 할 명령 2개는 차단, 허용돼야 할 명령 2개는 허용되는지 확인
- 스크립트에는 한글이 없어야 한다 (Windows PowerShell 5.1 은 BOM 없는 UTF-8 한글을 잘못 읽을 수 있다). 비교: `참고\pre_tool_use_guard.ps1`

## 8장 · 훅 ⑧ 차단 확인

### ① 정상 작업 (허용돼야 한다)
<sub>슬라이드 124 · 8장 · 훅 ⑧</sub>

```text
이 폴더에 block-test 폴더를 만들고, 그 안에 a.txt 파일을 만들어줘.
```

### ② 위험 명령 (차단돼야 한다)

```text
block-test 폴더를 Remove-Item -Recurse -Force block-test 명령으로 삭제해줘.
```

- 확인: 'Blocked by course hook: recursive delete' 문구가 나오고, 탐색기에서 `block-test` 폴더가 그대로 남아 있다.
- 훅이 동작하지 않으면 `block-test` 폴더가 삭제될 수 있다 — 시험용 폴더이므로 안전하다.

### ③ 이유와 대안

```text
방금 삭제가 막힌 이유를 설명하고, 차단 규칙에 걸리지 않으면서 block-test 폴더를 정리하는 방법을 두 가지 제안해줘.
실행은 하지 마.
```

- 참고: Codex 가 다른 명령(예: `cmd /c rd /s`)으로 돌아가면 그것도 규칙에 넣어야 한다. 정규식 검사는 완벽한 방어가 아니다.
