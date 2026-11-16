
// 토글 버튼
const themeToggleBtn = document.querySelector('.theme-toggle');

// 햄버거 버튼
const hamburgerBtn = document.querySelector('.hamburger');

// 상단바
const header = document.querySelector('.header');
// 상단바 리스트
const nav = document.querySelector('.nav');

// 폼
const form = document.querySelector('#contact-form');
// 이름 입력칸
const nameInput = document.querySelector('#name');
// 이메일 입력칸
const emailInput = document.querySelector('#email');
// 메시지 입력 칸
const messageInput = document.querySelector('#message');

// -----

// 이름 에러시 메시지를 출력되는칸
const nameError = document.querySelector('#name-error');

// 이메일 에러시 메시지를 출력되는칸
const emailError = document.querySelector('#email-error');
// 메시지 에러시 메시지를 출력되는칸
const messageError = document.querySelector('#message-error');

// 전송 성공시 메시지를 출력되는칸
const successMsg = document.querySelector('#success-msg')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const projectsStatus = document.querySelector('#projects-status');
const projectsGrid = document.querySelector('#projects-grid')

// OS 설정에 맞는 테마를 가져옴
const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
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


// 햄버거 버튼 클릭시 이벤트 리스너
hamburgerBtn.addEventListener('click',() => {
    nav.classList.toggle('active');
});

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// contact 로직
    // contact폼 에러 함수 선언함
const getNameError = (val) => (val.trim() === '' ? '이름을 입력해 주세요.' : '');
const getEmailError = (val) => {
    if (val.trim() === '') return '이메일을 입력해 주세요';
    if (!emailRegex.test(val.trim())) return '올바른 형식이 아닙니다.';
    return '';
};
const getMessageError = (val) => (val.trim() === '' ? '메시지를 입력해 주세요.' : '');

    // 렌더링 헬퍼 : 렌더링을 도와주는 함수 : 입력창 테두리 + 에러 문구 업데이트
const showFieldError = (inputEl,errorEl,msg) => {
    errorEl.textContent = msg;
    inputEl.classList.toggle('invalid',msg !== '');
};

    // 실시간 검증 (input 이벤트)
nameInput.addEventListener('input', () => showFieldError(nameInput,nameError,getNameError(nameInput.value)));
emailInput.addEventListener('input',() => showFieldError(emailInput,emailError,getEmailError(emailInput.value)));
messageInput.addEventListener('input',() => showFieldError(messageInput,messageError,getMessageError(messageInput.value)));

    // 제출 검증 (submit 이벤트)
form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMsg.textContent = '';

    const nErr = getNameError(nameInput.value);
    const eErr = getEmailError(emailInput.value);
    const mErr = getMessageError(messageInput.value);

    showFieldError(nameInput,nameError,nErr);
    showFieldError(emailInput,emailError,eErr);
    showFieldError(messageInput,messageError,mErr);

    if(!nErr && !eErr && !mErr) {
        successMsg.textContent = '문의가 성공적으로 접수되었습니다.';
        form.reset();
    }
});

// 깃허브 api 연결
const projectState = {
    status: 'loading',
    repos: [],
    errorMessage: '',
};
    // 렌더링 함수  
const renderProjects = () => {
    // 초기화
    projectsStatus.innerHTML = '';
    projectsGrid.innerHTML = '';
    
        // 로딩중
    if (projectState.status === 'loading') {
        projectsStatus.innerHTML =  `
        <div class="spinner"></div>
        <p>프로젝트를 불러오는 중...</p>
        `;
        return;
    }
        // 에러 발생시
    if (projectState.status === 'error') {
        projectsStatus.innerHTML = `
        <p>${projectState.errorMessage}</p>
        <button type="button" id="retry-btn">다시 시도 </button>
        `;

        const retryBtn = document.querySelector('#retry-btn');
        retryBtn.addEventListener('click',fetchRepos);
        return;
    }

    if (projectState.status === 'empty') {
        projectsStatus.innerHTML = `<p>표시할 프로젝트가 없습니다.</p>`;
        return;
    }
        // 성공 상태 : 구조분해 할당 + map + 템플릿 리터럴로 카드 생성
    projectsGrid.innerHTML = projectState.repos.map((repo) => {
        const {name,description,html_url,stargazers_count,language} = repo;
        return `
        <article class="project-card">
            <h4>${name}</h4>
            <p>${description || '설명이 없습니다.'}</p>
            <div class="project-meta">
                <span>${language || '기타'}</span>
                <span>* ${stargazers_count}</span>
            </div>
            <a href="${html_url}" target="_blank" rel="noopener noreferrer">GitHub 보기</a>
            </article>
            `;
    }).join('');
};
    // 깃허브 가져오는 함수 선언
const fetchRepos = async () => {
    const url = 'https://api.github.com/users/ghwo6/repos';

        // 요청 시작 -> 로딩 상태로 변경 후 렌더링
    projectState.status = 'loading';
    projectState.errorMessage = '';
    renderProjects();

    try {
        const response = await fetch(url);

        if (response.status === 403){
            throw new Error('GitHub API 요청 한도(시간당 60회를 초과했습니다. 잠시 후 다시 시도해 주세요.');
        }

        if (!response.ok) {
            throw new Error(`프로젝트를 불러올 수 없습니다. (HTTP ${response.status})`);
        }
        const repos = await response.json();

        if (repos.length === 0) {
            projectState.status = 'empty';
            projectState.repos = [];
        } else {
            projectState.status = 'success';
            projectState.repos = repos;
        }
    } catch (error) {
        projectState.status = 'error';
        projectState.errorMessage = error.message || '프로젝트를 불러올 수 없습니다.';
    }

        // 최종 상태 반영
     renderProjects();
};

    // 페이지 로드시 실행
    fetchRepos();