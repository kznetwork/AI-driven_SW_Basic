# AGENTS.md (LinkSnip3 프로젝트 규칙)
## 프로젝트 개요
LinkSnip3은 긴 URL을 짧게 만드는 웹 서비스다.
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
## 작업 완료의 정의 (Definition of Done)
다음 세 명령이 모두 통과하기 전에는 작업을 끝났다고 하지 말 것:
1) npm run typecheck   (타입 에러 0)
2) npm run lint        (린트 에러 0)
3) npm test            (테스트 전부 통과)
실패하면 원인을 고치고 다시 실행한다. 통과 로그를 마지막에 요약해서 보여 준다.
