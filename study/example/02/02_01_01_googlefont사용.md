# 구글 폰트 사용 방법

## html문서 <head>에 link 추가 및 사용할 부분 렌더 트리에서 매칭되도록 설정함

### html 문서 수정

```html
<html>
    <head>
        <link rel="preconnect" href="https://fonts.goolgeapis.com">
        <link rel="preconnect" href="http://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/상세구글폰트주소" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    
    </head>

    <body>
        <h1>안녕하세요 css에서 h1 또는 body로 글꼴을 변경가능합니다.</h1>
        <p style="font-family: 'Noto Sans KR', sans-serif;">Noto Sans KR 폰트가 적용된 텍스트입니다.</p>
        <p style="font-family: 'Jua', sans-serif;">Jua 폰트가 적용된 텍스트입니다.</p>
        <p>일반 폰트입니다.</p>
        <p>일반 폰트입니다.</p>
        <p class="weight-100">이 텍스트는 굵기 100 (가장 얇음) 입니다.</p>
        <p class="weight-400">이 텍스트는 굵기 400 (기본 굵기) 입니다.</p>
        <p class="weight-700">이 텍스트는 굵기 700 (굵음) 입니다.</p>
        <p class="weight-900">이 텍스트는 굵기 900 (가장 굵음) 입니다.</p>
    </body>


</html>
```

### CSS에서 원하는 스타일로 꾸민다.

```css
body {
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    padding: 20px;
}
h1 {
  font-family: "Jua", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.weight-100 { font-weight: 100;}
.weight-400 { font-weight: 400;}
.weight-700 { font-weight: 700;}
.weight-900 { font-weight: 900;}

```

