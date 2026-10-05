# 실습 프롬프트 — linksnip3
지시 · 권한 체계와 하네스 — AGENTS.md · Sandbox · 완료의 정의 · codex exec  
교안: `Coding_Agent_기본_Codex_App_강의교안.pptx` · 7장 7.3 · 7.4 · 7.6 / 8장 · 작업 폴더: `C:\DEV\linksnip3`

## 쓰는 법
- 이 폴더를 `C:\DEV\linksnip3` 로 복사하고, **Codex App 에서 '폴더 열기'(또는 프로젝트 만들기 → 소스 폴더)** 로 연다.
- 이 파일을 VS Code 나 메모장에 열어 두고, 코드 블록을 복사해 **Codex 작성 칸**에 붙여 넣는다.
- `@경로` 는 파일을 컨텍스트에 넣고(작성 칸에서 `@` 입력 후 검색), `$이름` 은 Skill 을 부르고, `/명령` 은 앱 · CLI 명령이다.
- 승인 창이 뜨면 **무엇을 하려는지 읽고** 허용한다. 네트워크가 필요하면 '이번에만 허용'.
- 기대 결과는 요약이다 — **응답 문구와 코드 모양은 실행마다 다르다.** 판단 기준은 파일 · 화면 · 명령 실행 결과다.

## 7장 · 7.3

### 프로젝트 AGENTS.md 만들기 (Linksnip3)
<sub>슬라이드 81 · 7장 · 7.3</sub>

```text
AGENTS.md 파일을 아래 내용으로 만들어줘.
# AGENTS.md (Linksnip3 프로젝트 규칙)
## 프로젝트 개요
Linksnip3은 긴 URL을 짧게 만드는 웹 서비스다.
프론트엔드: Vite + TypeScript / 백엔드: Cloudflare Pages Functions + Workers KV.
## 셋업
- 의존성 설치: npm install  - 개발 서버: npm run dev  - 빌드: npm run build
## 변경 시 반드시 지킬 것 (검증 규칙)
- 코드를 바꾼 뒤에는 반드시 'npm run lint' 와 'npm test' 를 실행하고 둘 다 통과하는 것을 확인한 뒤 마무리할 것.
- 타입 에러가 0이어야 한다('npm run typecheck').
- 비밀키/토큰을 코드에 하드코딩하지 말 것. 환경변수를 사용한다.
## PR(풀 리퀘스트) 규칙
- 커밋 메시지는 한 줄 요약 + 변경 이유로 작성한다.
```

**결과 확인** — 교안 슬라이드 81 의 실행 화면과 비교한다.

- 확인: 터미널: C:\DEV 에서 mkdir linksnip3  ▸  App 에서 linksnip3 열기  ▸  아래 프롬프트로 AGENTS.md 생성

## 7장 · 7.4

### AGENTS.md 가 잘 로드되는지 확인한다
<sub>슬라이드 82 · 7장 · 7.4</sub>

```text
지금 적용 중인 지시(instruction) 출처들을 요약해줘. 수정은 하지 마.
```

**결과 확인** — 교안 슬라이드 82 의 실행 화면과 비교한다.

- 확인: linksnip3 를 연 상태에서 아래 프롬프트  ▸  전역 · 프로젝트 AGENTS.md 가 순서대로 인용되는지 확인

## 7장 · 7.6

### 권한을 바꿔 가며 실행 ① 읽기 전용으로 분석만
<sub>슬라이드 86 · 7장 · 7.6</sub>

```text
이 저장소 구조와 핵심 파일을 설명만 해줘. 수정은 하지 마.
```

**결과 확인** — 교안 슬라이드 86 의 실행 화면과 비교한다.

- 확인: 작성 칸 아래 승인 모드를 '읽기 전용'으로  ▸  아래 프롬프트  ▸  명령 실행 승인 창이 뜨면 내용 확인 후 허용  ▸  파일 변경이 없는지 확인
- 참고: 작성 칸 아래 승인 모드를 '읽기 전용'으로 바꾼 뒤 실행한다.

### 권한을 바꿔 가며 실행 ② Auto 로 실제 작업
<sub>슬라이드 87 · 7장 · 7.6</sub>

```text
README에 한 줄 설명을 추가해줘.
```

**결과 확인** — 교안 슬라이드 87 의 실행 화면과 비교한다.

- 확인: 승인 모드를 'Auto(기본 승인)'로 전환  ▸  아래 프롬프트  ▸  README.md 변경(diff) 확인
- 참고: 승인 모드를 'Auto(기본 승인)'로 바꾼 뒤 실행한다.

## 8장 · 8.5

### 하네스를 갖춘 프로젝트 뼈대 만들기 (Linksnip3)
<sub>슬라이드 99 · 8장 · 8.5</sub>

```text
Vite + TypeScript 프로젝트로 Linksnip3 뼈대를 만들어줘.
요구사항:
1) package.json 에 다음 스크립트가 있어야 한다:
   - dev: vite
   - build: vite build
   - typecheck: tsc --noEmit
   - lint: eslint .
   - test: vitest run
2) src/lib/shorten.ts 에 makeCode(url: string): string 함수를 만든다.
   같은 URL은 항상 같은 6자리 코드를, 빈 문자열이면 Error("EMPTY_URL")을 던진다.
3) tests/shorten.test.ts 에 정상/예외 테스트를 추가한다.
4) ESLint, Vitest, TypeScript 설정 파일을 포함한다.
끝나면 npm install 후 npm run typecheck, npm run lint, npm test 를 차례로 실행해서 모두 통과하는 것을 보여줘.
```

**결과 확인** — 교안 슬라이드 99 의 실행 화면과 비교한다.

- 확인: linksnip3 를 연 상태에서 아래 프롬프트  ▸  npm install 등 승인 요청은 내용 확인 후 허용
- 참고: 패키지 설치를 위해 네트워크 허용 승인 창이 뜨면 '이번에만 허용'.

## 8장 · 8.6

### AGENTS.md 에 '완료의 정의' 못 박기
<sub>슬라이드 102 · 8장 · 8.6</sub>

```text
linksnip3/AGENTS.md 맨 아래에 다음 절을 덧붙여줘.

## 작업 완료의 정의 (Definition of Done)
다음 세 명령이 모두 통과하기 전에는 작업을 끝났다고 하지 말 것:
1) npm run typecheck   (타입 에러 0)
2) npm run lint        (린트 에러 0)
3) npm test            (테스트 전부 통과)
실패하면 원인을 고치고 다시 실행한다. 통과 로그를 마지막에 요약해서 보여 준다.
```

**결과 확인** — 교안 슬라이드 102 의 실행 화면과 비교한다.

- 확인: 아래 프롬프트로 AGENTS.md 맨 아래에 덧붙이기  ▸  편집기에서 '작업 완료의 정의' 절 확인

## 8장 · 8.7

### 일부러 깨고, 하네스가 잡는지 본다
<sub>슬라이드 103 · 8장 · 8.7</sub>

```text
shorten.ts 의 makeCode 가 6자리가 아니라 5자리를 반환하도록 잠깐 바꿔봐.
그리고 npm test 를 실행해서 어떤 테스트가 왜 실패하는지 로그로 보여줘.
그다음 원래대로(6자리) 고치고 다시 통과시켜줘.
```

**결과 예시** (응답 문구는 실행마다 다르다)

```text
> npm test
× makeCode > 같은 URL은 항상 같은 6자리 코드를 반환
AssertionError: expected 'aellu' to match /^[0-9a-z]{6}$/
Tests  1 failed | 1 passed
# 6자리로 복구
> npm run typecheck  → 통과
> npm run lint       → 통과
> npm test           → 2 tests passed
```

- 확인: 아래 프롬프트  ▸  실패 로그(expected 'aellu' to match /^[0-9a-z]{6}$/) 읽기  ▸  복구 후 2 tests passed 확인
- 참고: 실패 로그를 읽은 뒤 Codex 가 6자리로 복구하는지까지 본다.

## 8장 · 8.8 — 비대화형 하네스 (터미널)
<sub>슬라이드 104–105 · Codex CLI</sub>

```bash
cd C:\DEV\linksnip3
codex            # 시작 화면에서 /model → GPT-5.6 Sol 확인 후 종료
codex exec -m gpt-5.6-sol --json --output-last-message result.txt "테스트를 실행하고, 실패가 있으면 고친 뒤 다시 통과시켜줘."
```

**결과 예시** — result.txt: `필수 검증이 전부 통과했다. (npm test 2개 · lint · typecheck 통과)`
