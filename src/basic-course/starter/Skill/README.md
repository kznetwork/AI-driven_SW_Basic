# Skill — 7장 7.7 · 7.8

Skill 은 `.agents/skills/<이름>/SKILL.md` 에 둔다 (전역으로 쓰려면 `~/.agents/skills/`).

- 7.7: prompts.md 의 첫 프롬프트로 daily-summary 를 만들고 `$daily-summary` 로 호출한다.
- 7.8: `참고/thread-export/` 를 `.agents/skills/thread-export/` 로 옮긴 뒤 `$thread-export` 로 호출한다.

막히면 `참고/` 폴더를 통째로 `.agents/skills/` 로 복사하면 바로 동작한다. export_thread.py 는 Python 3 표준 라이브러리만 쓴다.
