# AGENTS.md (Linksnip3 프로젝트 규칙)
## 프로젝트 개요
Linksnip3은 긴 URL을 짧게 만드는 웹 서비스다.
프론트엔드: Vite + TypeScript / 백엔드: Cloudflare Pages Functions + Workers KV.
## 셋업
- 의존성 설치: npm install
- 개발 서버: npm run dev
- 빌드: npm run build
## 변경 시 반드시 지킬 것 (검증 규칙)
- 코드를 바꾼 뒤에는 반드시 'npm run lint' 와 'npm test' 를 실행하고 둘 다 통과하는 것을 확인한 뒤 마무리할 것.
- 타입 에러가 0이어야 한다('npm run typecheck').
- 비밀키/토큰을 코드에 하드코딩하지 말 것. 환경변수를 사용한다.
## PR(풀 리퀘스트) 규칙
- 커밋 메시지는 한 줄 요약 + 변경 이유로 작성한다.
