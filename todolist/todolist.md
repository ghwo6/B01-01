# B01-01 나를 소개하는 웹페이지 처음부터 만들기 — TODO LIST

> 분야: AI/SW 기초 · 웹 기초와 프론트엔드 · 학습시간 80시간 · **필수**
> 목표: 외부 라이브러리 없이 **순수 HTML / CSS / JavaScript**로 반응형 포트폴리오 웹사이트를 완성하고 **GitHub Pages로 배포**한다.
> 핵심: UI 퀄리티보다 **"이벤트 → 상태 변경 → 렌더링(DOM 업데이트)"** 흐름 이해가 우선 (React 학습의 기반)

---

## 0. 제약 사항 (작업 내내 지킬 것)

- [ ] React, Vue, jQuery, Bootstrap, Tailwind CSS 등 **외부 라이브러리 사용 금지**
- [ ] 허용: 아이콘(Font Awesome), 웹 폰트(Google Fonts)만
- [ ] `var` 금지 → `const`, `let`만 사용
- [ ] HTML의 `onclick` 속성 금지 → `addEventListener` 사용
- [ ] 인라인 스타일(`style="..."`) 금지
- [ ] 최신 Chrome 브라우저에서 정상 동작 확인
- [ ] GitHub API 레이트리밋(비인증 시간당 60회) 주의 — 짧은 시간 내 반복 새로고침 피하기

---

## 1. 프로젝트 기본 구성

- [ ] 폴더 구조 만들기
  ```
  B01-01/
  ├── index.html      # 메인 페이지
  ├── css/
  │   └── style.css   # 스타일시트
  ├── js/
  │   └── main.js     # JavaScript
  ├── images/         # 이미지 파일 (프로필 사진 등)
  └── README.md
  ```
- [ ] `index.html`에 외부 스타일시트(`css/style.css`) 연결
- [ ] `index.html`에 JS 파일을 **`defer` 속성**으로 연결
- [ ] VS Code + Live Server로 실시간 개발 환경 구성
- [ ] 기본 메타 태그 작성 (`charset`, `viewport`, `description`, `lang="ko"`)

---

## 2. HTML 구조 (시맨틱 마크업)

- [ ] `div`만 쓰지 않고 시맨틱 태그 사용: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- [ ] 섹션 작성
  - [ ] **Header** — 로고, 네비게이션 메뉴, 다크 모드 토글 버튼, 햄버거 버튼
  - [ ] **Hero** — 인사말, CTA 버튼 (예: View Projects / Contact)
  - [ ] **About** — 자기소개, 프로필 이미지
  - [ ] **Skills** — 기술 스택 목록
  - [ ] **Projects** — GitHub API 연동 카드 영역 (상태 표시 영역 포함)
  - [ ] **Contact** — 문의 폼 (이름, 이메일, 메시지)
  - [ ] **Footer** — 저작권, 소셜 링크 (GitHub, LinkedIn 등)
- [ ] 네비게이션에 각 섹션으로 이동하는 **앵커 링크**(`href="#about"` 등)
- [ ] 모든 이미지에 **의미 있는 `alt`** 속성
- [ ] 폼 요소에 `<label>` 올바르게 연결 (**`for` ↔ `id` 매칭**)
- [ ] 스크롤 탑 버튼 요소 추가

---

## 3. CSS 스타일링 (레이아웃 & 반응형)

- [ ] 외부 스타일시트 `css/style.css` 사용
- [ ] `:root`에 **CSS 변수**로 색상, 폰트, 간격 정의
- [ ] 다크 모드용 CSS 변수 별도 정의: `[data-theme="dark"] { ... }`
- [ ] 레이아웃
  - [ ] 네비게이션: **Flexbox** (로고 왼쪽, 메뉴 오른쪽)
  - [ ] Projects 카드: **Grid** (`repeat(auto-fit, minmax(...))`로 반응형)
- [ ] 반응형 디자인
  - [ ] **모바일 퍼스트**로 작성
  - [ ] 브레이크포인트: `768px`(태블릿), `1024px`(데스크톱) — `min-width` 미디어 쿼리
  - [ ] 모바일에서 네비게이션 숨김 + 햄버거 버튼 표시
- [ ] 시각 효과
  - [ ] 버튼, 카드에 `hover` 효과 + `transition`
  - [ ] 카드에 `box-shadow`
- [ ] 스크롤 애니메이션용 클래스 (예: `.fade-in` → `.visible`)
- [ ] 로딩 스피너 스타일

---

## 4. JavaScript 기초 (DOM & 이벤트)

- [ ] `querySelector`, `querySelectorAll`로 요소 선택
- [ ] `textContent`, `innerHTML`로 내용 변경
- [ ] `classList.add` / `remove` / `toggle`로 클래스 조작
- [ ] `click`, `submit`, `scroll`, `input` 이벤트 처리
- [ ] `event.preventDefault()`로 기본 동작 방지

---

## 5. 인터랙션 구현

- [ ] **a. 햄버거 메뉴 토글** — 모바일에서 클릭 시 메뉴 열기/닫기 (`classList.toggle('active')`)
  - [ ] (권장) 메뉴 링크 클릭 시 메뉴 자동 닫기
- [ ] **b. 부드러운 스크롤** — 네비 메뉴 클릭 시 해당 섹션으로 부드럽게 이동 (`scroll-behavior: smooth` 또는 `scrollIntoView({ behavior: 'smooth' })`)
- [ ] **c. 스크롤 탑 버튼** — 스크롤 **300px** 이상에서 표시, 클릭 시 맨 위로 이동 (기준값 변경 시 README에 명시)
- [ ] **d. 네비게이션 스타일 변경** — 스크롤 **60px** 이상에서 네비 배경색 변경 (기준값 변경 시 README에 명시)
- [ ] **e. 다크 모드 토글**
  - [ ] 버튼 클릭 시 `document.documentElement.dataset.theme` 전환
  - [ ] **localStorage**에 저장 → 새로고침 후에도 유지 (페이지 로드 시 저장값 읽어 적용)
- [ ] **f. 스크롤 애니메이션** — **Intersection Observer** 사용, `threshold` 0.2 이상 권장 (변경 시 README에 명시)

---

## 6. 폼 UX (Contact)

- [ ] 문의 폼 필드: 이름, 이메일, 메시지
- [ ] **필수값 검증** — 빈 필드 제출 불가
- [ ] **이메일 형식 검증** (정규식 등)
- [ ] 에러 메시지를 **입력 필드 근처**에 표시 (`input` 이벤트로 실시간 표시/숨김)
- [ ] 제출 시 `event.preventDefault()`로 기본 동작 방지
- [ ] 검증 통과 시 **성공 메시지** 표시 (+ 폼 초기화)

---

## 7. ES6+ 문법 & 배열 메서드

- [ ] **화살표 함수** 적절히 활용
- [ ] **템플릿 리터럴**로 HTML 동적 생성
- [ ] **구조분해 할당**으로 객체/배열 값 추출 (예: `const { name, html_url, stargazers_count, language } = repo;`)
- [ ] 배열 메서드
  - [ ] `map` — GitHub 데이터 → HTML 카드 변환
  - [ ] `filter` — 특정 조건 프로젝트만 표시 (선택)
  - [ ] `forEach` — 배열 순회

---

## 8. 비동기 처리 & GitHub API 연동

- [ ] `fetch` + `async/await`로 호출
  - 엔드포인트: `https://api.github.com/users/{본인아이디}/repos`
- [ ] `try/catch`로 에러 처리 (`response.ok` 체크 포함)
- [ ] 4가지 상태를 UI로 표현
  - [ ] **로딩**: 스피너 또는 "로딩 중..." 텍스트
  - [ ] **성공**: 카드 리스트 렌더링 (저장소명, 설명, 언어, Stars, 링크 등)
  - [ ] **에러**: "프로젝트를 불러올 수 없습니다" 메시지 + **[다시 시도] 버튼**
  - [ ] **빈 상태**: "표시할 프로젝트가 없습니다" 메시지
- [ ] 레이트리밋(**403 응답**) 발생 시 에러 상태 UI 표시

---

## 9. 상태 관리 패턴

- [ ] "사용자 이벤트 → 상태 변경 → 화면 업데이트" 흐름이 코드에서 명확히 보이도록 구성 (state 객체 + render 함수 분리 권장)
- [ ] 아래 중 **3가지 이상**의 "상태 → 렌더링" 흐름 구현
  - [ ] 다크 모드 토글 → 테마 상태 변경 → 전체 화면 스타일 변경
  - [ ] API 호출 → 로딩/성공/에러 상태 변경 → Projects 섹션 렌더링 변경
  - [ ] 폼 입력 → 유효성 상태 변경 → 에러 메시지 표시/숨김
  - [ ] (선택) 필터 버튼 클릭 → 필터 상태 변경 → 프로젝트 목록 변경

---

## 10. 배포 & 문서화

- [ ] GitHub 저장소에 push
- [ ] **GitHub Pages**로 배포 → 외부 접속 가능한 URL 확보
- [ ] 배포 URL에서 모든 기능 정상 동작 확인
  - [ ] 반응형 레이아웃
  - [ ] 인터랙션 (햄버거 메뉴, 다크 모드, 스크롤 등)
  - [ ] GitHub API 연동
  - [ ] 폼 유효성 검사
- [ ] **README.md** 작성
  - [ ] 프로젝트 설명
  - [ ] 사용 기술
  - [ ] 배포 URL
  - [ ] 스크린샷
  - [ ] 변경한 기준값 명시 (스크롤 탑 300px, 네비 60px, threshold 0.2 등)

---

## 11. 제출물

- [ ] GitHub 저장소 URL
- [ ] 배포된 사이트 URL (GitHub Pages)
- [ ] 스크린샷: **데스크톱 / 모바일 / 다크 모드**

---

## 12. 보너스 과제 (선택)

- [ ] 프로젝트 **언어별 필터링** 버튼 (`array.filter()` 활용)
- [ ] Hero 섹션 **타이핑 효과** (한 글자씩 나타나기)
- [ ] **폼 실제 전송** (Formspree 또는 EmailJS 연동)
- [ ] **시스템 다크 모드 감지** (`prefers-color-scheme` 미디어 쿼리)

---

## 13. 학습 목표 셀프 체크 (스스로 설명할 수 있는가?)

- [ ] 시맨틱 태그를 왜 사용하는지, 어떤 기준으로 구조를 설계했는지
- [ ] Flexbox와 Grid의 차이, 각각 언제 선택하는지
- [ ] `querySelector`로 DOM 선택 → `addEventListener`로 이벤트 연결하는 흐름
- [ ] 화살표 함수, 구조분해 할당, 배열 메서드(`map`/`filter`)가 왜 필요하고 어떻게 쓰는지
- [ ] `fetch`와 `async/await`로 비동기 데이터를 가져오고, 로딩/성공/실패 상태를 UI로 어떻게 표현했는지
- [ ] 하나의 기능에서 이벤트 → 상태 변경 → DOM 업데이트가 어떻게 연결되는지 (React 상태-렌더링 흐름의 기초)

---

## 추천 진행 순서

1. 폴더 구조 & 파일 연결 (1) → 2. HTML 뼈대 (2) → 3. CSS 변수·레이아웃·반응형 (3)
4. 햄버거/스크롤/네비/스크롤탑 (5-a~d) → 5. 다크 모드 + localStorage (5-e)
6. 스크롤 애니메이션 (5-f) → 7. 폼 검증 (6) → 8. GitHub API + 상태 UI (8, 9)
9. 코드 정리 (0, 7 규칙 점검) → 10. 배포 & README & 스크린샷 (10, 11) → 11. 보너스 (12)

