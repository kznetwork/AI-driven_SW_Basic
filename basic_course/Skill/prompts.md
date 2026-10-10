# 실습 프롬프트 — Skill
Skill — daily-summary · thread-export  
교안: `(교안) Codex App(데스크톱웹)을 활용한 소프트웨어 개발 기본 과정_v3.pptx` · 7장 7.7 · 7.8 · 작업 폴더: `C:\DEV\Skill`

## 어디에서 실습하나 (작업 폴더)

| 항목 | 내용 |
|---|---|
| 작업 폴더 | `C:\DEV\Skill`  (macOS: `~/DEV/Skill`) |
| 방식 | **새로 만들기** — 빈 폴더 `C:\DEV\Skill` 를 직접 만든 뒤 Codex App 에서 **'폴더 열기'**(또는 프로젝트 만들기 → 소스 폴더)로 연다. 이 제공 폴더(`Skill\`)는 **열어 보는 용도**다 — prompts.md 의 프롬프트를 복사하고, 막힐 때만 `참고/` 와 비교한다 (작업 폴더로 복사하지 않는다). |
| 해당 교안 절 | 7.7 · 7.8 |
| 참고 | 막히면 이 제공 폴더의 `참고/` 를 C:\DEV\Skill\.agents\skills 로 통째로 복사하면 바로 동작한다. |

## 쓰는 법
- 작업 폴더 `C:\DEV\Skill` 를 새로 만들고, **Codex App 에서 '폴더 열기'(또는 프로젝트 만들기 → 소스 폴더)** 로 연다.
- 이 파일을 VS Code 나 메모장에 열어 두고, 코드 블록을 복사해 **Codex 작성 칸**에 붙여 넣는다.
- `@경로` 는 파일을 컨텍스트에 넣고(작성 칸에서 `@` 입력 후 검색), `$이름` 은 Skill 을 부르고, `/명령` 은 앱 · CLI 명령이다.
- 승인 창이 뜨면 **무엇을 하려는지 읽고** 허용한다. 네트워크가 필요하면 '이번에만 허용'.
- 기대 결과는 요약이다 — **응답 문구와 코드 모양은 실행마다 다르다.** 판단 기준은 파일 · 화면 · 명령 실행 결과다.

## 7장 · 7.7

### daily-summary Skill 파일 만들기
<sub>슬라이드 91 · 7장 · 7.7</sub>

```text
이 폴더에 .agents/skills/daily-summary/SKILL.md 파일을 아래 내용으로 만들어줘. 끝나면 폴더 트리를 보여줘.

---
name: daily-summary
description: 산발적인 작업 메모를 완료, 다음 작업, 이슈로 구분한 간결한 일일 업무 보고로 정리한다. 사용자가 업무 메모나 데일리 보고 정리를 요청할 때 사용한다.
---

# Daily Summary

사용자가 제공한 메모만 사용해 한국어 업무 보고를 작성한다.

## 작성 형식

- 완료
- 다음 작업
- 이슈

각 항목은 짧은 글머리표로 작성한다.

내용이 없는 항목에는 `없음`이라고 쓴다.
메모에 없는 사실, 일정 또는 담당자를 추측해서 추가하지 않는다.
중복된 내용은 하나로 합친다.
```

**결과 예시** (응답 문구는 실행마다 다르다)

```text
C:.
└─.agents
    └─skills
        └─daily-summary
                SKILL.md
```

### daily-summary Skill ② 호출하고 확인하기
<sub>슬라이드 92 · 7장 · 7.7</sub>

```text
$daily-summary를 사용해서 아래 메모를 정리해줘.

오늘 로그인 오류를 수정했고 관련 단위 테스트도 추가했다.
모바일 화면은 내일 확인해야 한다.
테스트 계정이 아직 없다.
```

**결과 확인** — 교안 슬라이드 92 의 실행 화면과 비교한다.

- 확인: 새 Codex 작업(Skill 프로젝트)에서 $daily-summary 로 호출  ▸  아래 세 가지 확인 항목 점검

## 7장 · 7.8

### thread-export Skill 파일 만들기
<sub>슬라이드 93 · 7장 · 7.8</sub>

```text
@참고/thread-export/SKILL.md @참고/thread-export/scripts/export_thread.py 두 파일을 .agents/skills/thread-export/ 아래에 같은 구조로 만들어줘.
내용은 바꾸지 말고, 끝나면 폴더 트리를 보여줘.
```

**결과 예시** (응답 문구는 실행마다 다르다)

```text
.agents/
  skills/
    thread-export/
        SKILL.md
        scripts/
            export_thread.py
```

### 대화 세션 내보내기 Skill ③ 실행하고 확인하기
<sub>슬라이드 95 · 7장 · 7.8</sub>

```text
$thread-export 를 사용해서 지금까지의 대화를 내보내줘.
```

**결과 예시** (응답 문구는 실행마다 다르다)

```text
✦ thread-export 스킬로 내보냈는다.
> python .agents/skills/thread-export/scripts/export_thread.py --out exports/
내보내기 완료: exports/thread-20260817-141205.md

# Thread Export
- 세션 파일: rollout-2026-08-17T13-58-02.jsonl
- 메시지 수: 14
```

- 확인: $thread-export 로 호출 (또는 스크립트 직접 실행)  ▸  exports/ 폴더의 md 파일을 열어 네 가지 확인
