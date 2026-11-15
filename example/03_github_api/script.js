const usernameInput = document.querySelector('#username-input')

const loadBtn = document.querySelector('#load-btn');
const statusEl = document.querySelector('#status')
const gridEl = document.querySelector('#project-grid')

const state = {
    status: 'idle',
    repos: [],
    errorMsg: '',
};

const render = () => {
    statusEl.innerHTML= '';
    gridEl.innerHTML = '';

    if (state.status === 'loading') {
        statusEl.textContent = '로딩 중...';
        return;
    }

    if (state.status ==='error') {
        statusEl.innerHTML = `
        <p>${state.errorMsg}</p>
        <button type="button" class="retry-btn">다시 시도</button>
        `;

        // 동적으로 만든 버튼에 addEventListener 연결
        document.querySelector('.retry-btn').addEventListener('click', () => {
            fetchRepos(usernameInput.value.trim());
        });
        return;
    }

    if (state.status === 'empty') {
        statusEl.textContent= '표시할 프로젝트가 없습니다.'
        return;
    }

    if (state.status ==='success') {
        gridEl.innerHTML = state.repos.map((repo) =>{
            const {name,description, html_url,stargazers_count,language} = repo;
            return `
            <article class="project-card">
            <h3>${name}</h3>
            <p>${description || '설명이 없습니다.'}
            </p>
            <p>${language || '기타'} · ★ ${stargazers_count}</p>
            <a href="${html_url}" target="_blank" rel="noopener noreferrer">GitHub 보기</a>
            </article>
            `;
        })
        .join('');

    }
};

const fetchRepos = async (username) => {
    if (!username) return;

    state.status = 'loading';
    render();

    try {
        console.log(`https://api.github.com/users/${username}repos`)
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`불러오기 실패 (상태 코드: ${response.status})`);
        }

        const data = await response.json();
        state.repos = data;

        state.status = data.length === 0 ? 'empty' : 'success';
    } catch (error) {
        state.status = 'error';
        state.errorMsg= '프로젝트를 불러올수 없습니다.';
        console.error(error);
    }
    render();
};

loadBtn.addEventListener('click', () => {
    fetchRepos(usernameInput.value.trim());
});
