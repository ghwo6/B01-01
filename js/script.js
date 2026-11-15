const hamburgerBtn = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

// 토글 버튼
const themeToggleBtn = document.querySelector('.theme-toggle');

// OS 설정에 맞는 테마를 가져옴
const prefersDark = window.matchMedia(')prefers-color-scheme:dark)').matches;
// 현재 테마(localStorage) = 로컬스토리지 가져와서 저잠함
// 없으면 OS테마를 읽고 적용함
let currentTheme = localStorage.getItem('theme') ||(prefersDark ? 'dark' : 'light');

// 렌더링 함수
const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    themeToggleBtn.textContent = theme ==='dark' ? '라이트 모드' : '다크 모드';
};
// 페이지 로드시 localStorage에 있는 테마 적용
applyTheme(currentTheme);
// 테마버튼 클릭-> 상태를 변경 -> 저장 -> 화면 업데이트
themeToggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme',currentTheme);
    applyTheme(currentTheme);
});



hamburgerBtn.addEventListener('click',() => {
    nav.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

