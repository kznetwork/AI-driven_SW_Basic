# Skill — 7장 7.7 · 7.8

## 어디에서 실습하나 (작업 폴더)

| 항목 | 내용 |
|---|---|
| 작업 폴더 | `C:\DEV\Skill`  (macOS: `~/DEV/Skill`) |
| 방식 | **새로 만들기** — 빈 폴더 `C:\DEV\Skill` 를 직접 만든 뒤 Codex App 에서 **'폴더 열기'**(또는 프로젝트 만들기 → 소스 폴더)로 연다. 이 제공 폴더(`Skill\`)는 **열어 보는 용도**다 — prompts.md 의 프롬프트를 복사하고, 막힐 때만 `참고/` 와 비교한다 (작업 폴더로 복사하지 않는다). |
| 해당 교안 절 | 7.7 · 7.8 |
| 참고 | 막히면 이 제공 폴더의 `참고/` 를 C:\DEV\Skill\.agents\skills 로 통째로 복사하면 바로 동작한다. |


Skill 은 `.agents/skills/<이름>/SKILL.md` 에 둔다 (전역으로 쓰려면 `~/.agents/skills/`).

- 7.7: prompts.md 의 첫 프롬프트로 daily-summary 를 만들고 `$daily-summary` 로 호출한다.
- 7.8: `참고/thread-export/` 를 `.agents/skills/thread-export/` 로 옮긴 뒤 `$thread-export` 로 호출한다.

막히면 `참고/` 폴더를 통째로 `.agents/skills/` 로 복사하면 바로 동작한다. export_thread.py 는 Python 3 표준 라이브러리만 쓴다.
