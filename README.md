# 박성준 - 식스샵 프론트개발자 채용 과제

## 실행 방법

- 개발 환경
  - node: v16.15.1
  - yarn 1.22.19
  - 브라우저: 크롬 최신버전(103.0.5060.114)

```
  git clone https://github.com/curlyjun/curlyjun-fe.git

  cd curlyjun-fe

  git checkout feature

  yarn && yarn build && yarn start
```

## 요구 사항

### 1) 공통

- 각 페이지 렌더링 방식
  - pagination
    - 쿼리에 따라 데이터가 달라지고 리스트 페이지이기 때문에 Pre-rendering보다는 Skeleton UI로 페이지를 보여주고 데이터를 클라이언트에서 불러오도록 했습니다.
  - infinite-scroll
    - pagination 페이지처럼 리스트 페이지이기 때문에 Skeleton UI + Client side data fetch 방식을 채택했습니다.
  - products/[id]
    - 제품 상세 페이지는 썸네일이나 가격에 변동이 자주 있을 것이라 생각해서 getServerSideProps를 사용해 서버에서 미리 html을 렌더링 할 수 있도록 했습니다.
- 전역 상태 관리

  - 서버 상태 이외에 클라이언트에서 전역 상태 관리할 값이 없다고 판단하여 react-query만 사용했습니다.

- 의문점이 있다면 가정을 세우고 진행
  - [여기](#의문점)서 확인 가능합니다.

### 2) 로그인

- 아이디/비밀번호 유효성 검사
  - useValidInputValue 커스텀 훅을 만들어 정규 표현식을 사용해 유효성 검사를 했습니다.
- 새로고침 시 로그인 유지
  - 로그인 시 정보를 cookie에 담아두고 새로고침 시 쿠키를 확인합니다.
- 로그인 된 상태에서 로그인 화면(`/login`)에 진입하면 홈 화면(`/`)으로 리다이렉트
  - getServerSideProps를 통해 쿠키 값 체크 후 검증합니다. 유효한 유저라면(로그인 된 상태) 홈 화면으로 리다이렉트 시켰습니다.
    - 검증 api가 없어서 유저 정보 조회(`/users/{userId}`) 를 통해 검증했습니다.
- 테스트
  - 간단한 UI 위주의 테스트만 진행했습니다.
    - 입력 값에 따른 로그인 버튼 활성화 상태
    - 유효하지 않은 값에 대한 에러 체크
    - 유효한 값 입력시 에러 문구 삭제 체크

### 3) 페이지네이션

- Pagination 컴포넌트
  - api 문서를 확인해보니 `size`가 fix된 값이 아니여서 `size` 값에 따라 페이지네이션이 적용되도록 로직을 작성했습니다.
- 세 자리마다 콤마 구분
  - 자바스크립트 내장 함수인 [Number.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)을 사용했습니다.

### 4) 무한 스크롤

- 무한 스크롤 구현
  - [Intersection Observer API](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API)와 react-query의 [useInfiniteQuery](https://react-query-v3.tanstack.com/reference/useInfiniteQuery#_top)를 사용해 구현했습니다.
- 가져올 데이터 없는 경우 요청 금지
  - 매 요청마다 마지막인지 확인해서 요청하지 않도록 했습니다.
- 상품 상세 화면으로 이동했다가 다시 이전 페이지(/infinite-scroll)로 돌아오면 기존 위치
  - useScrollRestoration 이라는 커스텀 훅을 구현하여 스크롤을 복원합니다.
  - nextjs의 [router.events](https://nextjs.org/docs/api-reference/next/router#routerevents)를 사용했습니다.
- 이미지 lazy loading
  - 무한 스크롤을 위해 만들어둔 useIntersectionObserver hook을 사용해 화면에 보이기 100px 전에 이미지를 불러오도록 했습니다.

---

### etc.

- eslint
  - import order, 사용하지 않는 변수,모듈 확인을 위한 린트를 구성했습니다.
- 자동화(CI)

  - github actions를 통해 Pull Request 시 Test, Lint, Build 과정에 문제가 없는지 확인합니다.

- 에러 핸들링
  - api 서버에서 404(Not founded)로 보내주는 요청은 `null`을 리턴해 존재하지 않음을 UI 상으로 알려줍니다.
  - 나머지 에러는 ErrorBoundary 컴포넌트를 이용해서 핸들링 하고 있습니다. (해당 프로젝트에서는 에러가 있음만을 UI 상으로 보여줍니다.)
- 컴포넌트 구조
  ```
    index.ts  // 내보내기를 위한 index파일
    {ComponentName}.tsx // 컴포넌트 파일
    {ComponentName}.style.ts  // 스타일 파일
  ```
  - 일관된 컴포넌트를 생성할 수 있는 shell script를 작성했습니다.
  - styled-components 로 스타일된 컴포넌트를 일반 컴포넌트와 구분하기위해 스타일 파일을 분리하고 Styled(`import * as Styled from '{ComponentName}.styled.ts'`)로 가져와 사용했습니다.

## 문서 오탈자

- 과제 문서 확인 중 발견한 오탈자 공유드립니다.
  - **API문서**/로그인,유저 정보 조회 -> name, id -> NAME, ID
  - **API문서**/상품 목록 조회 producs -> products

## 의문점

- 해당 과제(프로젝트)는 msw에 의존하고 있습니다. 정의된 핸들러들은 상대 경로를 사용하고있지만 node 환경에선 절대경로를 사용해야됨을 msw 문서를 통해 확인했습니다. 상대 경로 사용시 서버 환경(getServerSideProps)을 사용하는데 문제가 있어 핸들러 파일에 임의의 절대 경로(`https://api.sixshop.dev`)를 추가했습니다.
  - [확인한 msw 문서](https://mswjs.io/docs/getting-started/integrate/node#direct-usage)
