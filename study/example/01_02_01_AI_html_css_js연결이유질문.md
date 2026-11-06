브라우저는 단순히 텍스트 파일을 화면에 보여주는 것이 아니라, HTML 문서를 읽어 메모리 상에 객체 트리(자료구조)를 구성하고 이를 기반으로 스타일 계산, 연산 처리, 그래픽 렌더링을 수행하는 실행 환경(컴파일러/엔진)입니다.

`<link>`와 `<script>` 태그를 만났을 때 CS 관점에서 브라우저 내부에서 일어나는 동작 원리는 다음과 같습니다.

1. HTML 파싱과 DOM(Document Object Model) 트리 생성
브라우저가 네트워크나 로컬 디스크로부터 HTML 바이트 스트림을 수신하면 다음 파이프라인을 거칩니다:

    - 바이트 → 문자(Characters) → 토큰(Tokens) → 노드(Nodes) → DOM 트리(Tree Data Structure)

    - HTML 태그들을 부모-자식 관계를 가진 트리(Tree) 자료구조로 메모리에 올립니다.

2. `<link rel="stylesheet" href="...">`의 동작: CSSOM 생성
브라우저는 파싱 중 `<link>` 태그를 만나면 다음과 같이 동작합니다:

    1. 비동기 네트워크 I/O / 파일 로드: 지정된 경로(css/style.css)의 CSS 텍스트 리소스를 가져옵니다.

    2. CSSOM(CSS Object Model) 트리 생성: 내려받은 CSS 텍스트 역시 렉싱(Lexing)과 파싱(Parsing) 과정을 거쳐 선택자(Selector)와 속성(Rule)들의 상속 관계를 반영한 별도의 트리 구조(CSSOM)로 메모리에 빌드합니다.

    3. 렌더 트리(Render Tree) 결합:

        - 브라우저는 DOM + CSSOM을 결합하여 화면에 실제로 그려질 노드들만 모은 Render Tree를 만듭니다.

        - 각 노드의 정확한 크기와 위치를 계산하는 Layout(Reflow) 단계를 거친 뒤, 픽셀로 변환하는 Paint/Composite(Rasterization) 과정을 통해 GPU를 거쳐 화면에 출력합니다.

3. `<script src="...">`의 동작: 자바스크립트 엔진과 런타임 바인딩
스크립트 태그는 브라우저 내장 자바스크립트 가상 머신(V8, JavaScriptCore 등)을 구동시킵니다:
    1. JIT 컴파일 및 실행:

        - 브라우저는 HTML 파싱을 일시 정지(Parser-blocking)하고 js/script.js 파일을 로드합니다.

        - JS 엔진이 코드를 추상 구문 트리(AST)로 파싱한 뒤, 인터프리터와 JIT(Just-In-Time) 컴파일러를 통해 기계어/바이트코드로 변환하여 콜 스택(Call Stack)과 힙(Memory Heap) 메모리 영역에 올립니다.

    2. C++ Web API 바인딩(DOM 접근):

        - 이미지 코드의 document.getElementById('number')가 실행될 때, 자바스크립트 런타임은 C++로 구현된 브라우저 코어의 DOM 노드 포인터/레퍼런스를 가져와 JS 래퍼 객체(numberDisplay)에 할당합니다.

    3. 이벤트 루프(Event Loop)와 콜백 큐(Callback Queue):

        - increaseBtn.addEventListener('click', ...)는 브라우저 내부 이벤트 디스패처에 해당 DOM 노드의 함수 포인터를 등록합니다.

        - 사용자가 마우스를 클릭하면 OS 인터럽트 → 브라우저 입력 이벤트 발생 → 이벤트 큐에 등록 → 호출 스택이 비었을 때 이벤트 루프가 등록된 콜백 함수를 실행합니다.

    4. DOM 트리 변이(Mutation) 및 리렌더링:

        - numberDisplay.textContent = count;가 실행되면, 메모리 상의 DOM 트리의 텍스트 노드 값이 갱신됩니다.

        - DOM이 변경되면 브라우저 렌더링 엔진은 변경된 노드에 대해 스타일 재계산, 레이아웃, 리페인트 과정을 트리거하여 화면 픽셀을 즉시 갱신합니다.

4. 구조 요약

```md
[HTML 텍스트] ──(파싱)──> [DOM Tree (메모리 자료구조)] ──┐
                                                   ├─> [Render Tree] ──> [Layout & Paint] ──> [화면 픽셀]
[CSS  텍스트] ──(파싱)──> [CSSOM Tree (스타일 규칙)]  ──┘
                                 ▲
[JS 파일] ──(컴파일/실행)──> [JS 엔진 / 이벤트 루프] ──(C++ DOM API로 조작)

```
HTML: 객체 그래프(트리)의 뼈대를 메모리에 생성하는 데이터 정의서

CSS: 렌더 트리 생성 시 각 노드의 시각적 연산 규칙을 제공하는 스타일 메타데이터

JS: 메모리에 상주하면서 이벤트 발생 시 DOM/CSSOM 트리의 상태를 동적으로 변이(Mutate)시키는 실행 프로그램 코드