# 실습 프롬프트 — 00_전역설정
전역 설정 — ~/.codex/AGENTS.md · ~/.codex/config.toml  
교안: `(교안) Codex App(데스크톱웹)을 활용한 소프트웨어 개발 기본 과정_v3.pptx` · 7장 7.2 · 7.5 · 작업 폴더: `Codex App 에서 아무 프로젝트나 연 상태 (파일은 홈 폴더의 .codex 에 만들어진다)`

## 어디에서 실습하나 (작업 폴더)

| 항목 | 내용 |
|---|---|
| 작업 폴더 | `C:\Users\<사용자>\.codex` |
| 방식 | **전역 설정** — 프로젝트 폴더를 만들지 않는다. |
| 해당 교안 절 | 7.2 · 7.5 |
| 참고 | 프로젝트 폴더가 아니라 홈 폴더의 .codex 에 파일을 만든다 (macOS: ~/.codex). 프롬프트는 어떤 프로젝트를 연 상태에서든 실행한다. |

## 쓰는 법
- 프로젝트 폴더는 필요 없다 — Codex App 에서 아무 프로젝트나 연 상태에서 실행한다 (파일은 홈 폴더의 .codex 에 만들어진다).
- 이 파일을 VS Code 나 메모장에 열어 두고, 코드 블록을 복사해 **Codex 작성 칸**에 붙여 넣는다.
- `@경로` 는 파일을 컨텍스트에 넣고(작성 칸에서 `@` 입력 후 검색), `$이름` 은 Skill 을 부르고, `/명령` 은 앱 · CLI 명령이다.
- 승인 창이 뜨면 **무엇을 하려는지 읽고** 허용한다. 네트워크가 필요하면 '이번에만 허용'.
- 기대 결과는 요약이다 — **응답 문구와 코드 모양은 실행마다 다르다.** 판단 기준은 파일 · 화면 · 명령 실행 결과다.

## 7장 · 7.2

### 전역 AGENTS.md 만들기 (내 개인 공통 규칙)
<sub>슬라이드 82 · 7장 · 7.2</sub>

```text
~/.codex/AGENTS.md 파일을 아래 내용으로 만들어줘.

# ~/.codex/AGENTS.md (내 개인 공통 규칙)
## 작업 방식
- 변경 전 한 일과 변경 요약을 3줄 이내로 알려 줄 것.
- 한 번에 너무 많이 바꾸지 말고 작은 단위로 진행할 것.
- 새 운영 의존성을 추가하기 전에는 먼저 물어볼 것.
## 코드 스타일
- 들여쓰기는 스페이스 2칸.
- 의미 없는 주석은 달지 말고, 왜(Why)를 설명하는 주석만 달 것.
```

**결과 확인** — 교안 슬라이드 82 의 실행 화면과 비교한다.

- 확인: Codex App 에 아래 프롬프트  ▸  탐색기: C:\Users\<사용자>\.codex 에 AGENTS.md 가 생겼는지 확인

## 7장 · 7.5

### config.toml 기본 설정 만들기
<sub>슬라이드 86 · 7장 · 7.5</sub>

```text
~/.codex/config.toml 파일을 아래 내용으로 만들어줘. 이미 있으면 덮어쓰기 전에 차이를 먼저 보여줘.

# ~/.codex/config.toml — Codex 기본 설정 예시

# 사용할 기본 모델 (앱의 모델 선택 메뉴에서 쓸 수 있는 이름으로 바꾼다)
model = "gpt-5.6-sol"

# 승인 정책: untrusted | on-request | never
approval_policy = "on-request"

# 샌드박스: read-only | workspace-write | danger-full-access
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
# false = 외부 네트워크 차단(기본) / true = npm install 등 허용
network_access = false
```

**결과 예시** (응답 문구는 실행마다 다르다)

```text
✦ ~/.codex/config.toml 을 만들었다. (model · approval_policy · sandbox_mode · network_access)
  작성 칸 아래 모델 · 승인 표시가 바뀌었는지 확인하세요.
```
