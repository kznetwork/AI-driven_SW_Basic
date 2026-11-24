---
name: thread-export
description: 현재 Codex 작업(Thread)의 대화 세션을 사람이 읽기 좋은 Markdown 파일로 내보낸다. 사용자가 "이 대화 내보내줘", "세션 기록 저장", "스레드 export"를 요청할 때 사용.
---

# Thread Export

현재 진행 중인 Codex 세션(Thread)의 대화 기록을 Markdown 파일로 저장한다.

## 동작 방식
1. Codex 세션 로그 폴더(기본: ~/.codex/sessions)에서 가장 최근 세션 파일을 찾는다.
2. scripts/export_thread.py 를 실행해 세션을 Markdown 으로 변환한다.
3. 결과를 프로젝트의 exports/ 폴더에 thread-YYYYMMDD-HHMMSS.md 로 저장한다.

## 실행
python .agents/skills/thread-export/scripts/export_thread.py --out exports/

## 출력 형식
- 문서 맨 위에 세션 파일명, 내보낸 시각, 메시지 수를 요약한다.
- 각 발화는 "## 사용자" / "## Codex" 제목 아래 순서대로 기록한다.
- 코드 블록과 명령 실행 결과는 원문 그대로 보존한다.

## 주의
- 세션 파일을 찾지 못하면 "세션 파일을 찾을 수 없음"이라고 알리고 멈춘다.
- 내보낸 파일에는 토큰·비밀키가 포함될 수 있으니 공유 전에 반드시 확인한다.
