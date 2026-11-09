만들어 놓은 html 파일에 css 와 js를 연결하는 과정을 공부해 보았다.
original.html은 원래 만들어 두었던 파일이고
01_html_css_javascript.html은 css파일과 자바스크립트를 연결하였다.

```html
<head>
    <!--css/style.css과 연결하였다.-->
    <link rel="stylesheet" href="css/style.css">
</head>
```

css에는
* 나 body등이 있어서 어떻게 사용하는지 검색 해보니
css 선택자를 사용하여

*는 전체 선택
이름은 태그 선택
.이름은 클래스선택
#이름은 ID선택

이라고 한다.

자바 스크립트 에서는 document.getElementById( 아이디 )를 하여 dom요소와 연결 가능하다.

```js
document.getElementById('number')
```

html에서 css와 js를 사용하기 위해서

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>
```

위에 내용이 삽입되었으나 원리적으로 이해하기 힘들다

AI를 통해 질문해본 내용을