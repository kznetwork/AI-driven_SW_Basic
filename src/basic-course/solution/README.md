# Codex App 실습 폴더 — Coding Agent 기본 · AI를 활용한 SW 개발 기초

교안: `Coding_Agent_기본_Codex_App_강의교안.pptx`

각 폴더를 `C:\DEV\` 아래로 복사하고(macOS 는 `~/DEV/`), Codex App 에서 그 폴더를 연 뒤 폴더 안의 **prompts.md** 를 위에서부터 따라 한다.

| 폴더 | 교안 | 내용 | 프롬프트 수 |
|---|---|---|---|
| `00_전역설정/` | 7장 7.2 · 7.5 | 전역 설정 — ~/.codex/AGENTS.md · ~/.codex/config.toml | 2 |
| `codex-hello/` | 3장 3.2 · 3.3 · 3.5 | 첫 작업 — hello.txt · 사이드 채팅 · CLI 첫 실행 | 3 |
| `manufacturing/` | 3장 3.4 | 유형별 대화 ①~⑩ — 요약 · 번역 · 분석 · 자동화 · 이미지 · 유사도 검색 | 11 |
| `meeting/` | 3장 3.4 | 유형별 대화 ⑪⑫ — 음성 → 텍스트 · 음성 → 영어 번역 | 2 |
| `sidebar/` | 4장 | 사이드바 — 사이트 · 예약 · 플러그인 | 8 |
| `linksnip1/` | 5장 5.6 · 5.7 · 5.8 | 프롬프트 엔지니어링 — 작게 쪼개기 · 기법 8가지 · Goal | 12 |
| `linksnip2/` | 6장 6.5 | 컨텍스트 엔지니어링 — @파일로 콕 집기 | 2 |
| `linksnip3/` | 7장 7.3 · 7.4 · 7.6 / 8장 | 지시 · 권한 체계와 하네스 — AGENTS.md · Sandbox · 완료의 정의 · codex exec | 7 |
| `Skill/` | 7장 7.7 · 7.8 | Skill — daily-summary · thread-export | 4 |
| `Tetris/` | 9장 · 10장 | 미니 프로젝트 — PRD → To-Do → 게임 → GitHub Pages | 21 |

## 함께 들어 있는 것
- `프롬프트_템플릿.md` — 꺾쇠 `< >` 만 바꿔 실무에서 재사용하는 일반형 (P · C · T · F · 기법 8가지 · 치트시트)
- `프롬프트_모음.md` — 슬라이드 번호 순서 · 결과 예시 · 진행 메모 (수강생용 배포본에는 없음)
- 각 폴더의 `참고/` — 해당 실습이 끝난 상태의 파일 (막혔을 때 비교 · 복사용)
- `manufacturing/` 의 데이터는 실습용 가상 데이터다. `meeting/` 의 녹음 파일은 각자 준비한다.

## 프롬프트 표기
- `@경로` 파일 지정 · `$이름` Skill 호출 · `/명령` 앱 · CLI 명령 (예: /model, /permissions, /goal, /side)
- 실행 결과는 실행마다 다르다 — 교안의 실행 화면 · 결과 예시와 '구조'가 같은지를 본다.
