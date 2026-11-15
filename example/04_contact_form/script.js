const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const nameError = document.querySelector('#name-error');
const emailError = document.querySelector('#email-error');
const messageError = document.querySelector('#message-error');
const successMsg = document.querySelector('#success-msg')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 개별 필드 검증 후 에러 메시지 반환함 | 검증결과 후 통과 하면 빈 문자열을 반환함
const getNameError = (val) => (val.trim() === '' ? '이름을 입력해 주세요.' : '');
const getEmailError = (val) => {
    if (val.trim() === '') return '이메일을 입력해 주세요.';
    if (!emailRegex.test(val.trim())) return '올바른 형식이 아닙니다.';
    return '';
};
const getMessageError = (val) => (val.trim() === '' ? '메시지를 입력해 주세요.' : '');

// 렌더링 헬퍼: 입력창 테두리 + 에러 문구 업데이트
const showFieldError = (inputEl,errorEl,msg) => {
    errorEl.textContent = msg;
    inputEl.classList.toggle('invalid', msg !== '');
};

// 실시간 검증 (input 이벤트)
nameInput.addEventListener('input', () => showFieldError(nameInput,nameError,getNameError(nameInput.value)));
emailInput.addEventListener('input',() => showFieldError(emailInput,emailError,getEmailError(emailInput.value)));
messageInput.addEventListener('input',() => showFieldError(messageInput,messageError, getMessageError(messageInput.value)));

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

    if (!nErr && !eErr && !mErr) {
        successMsg.textContent = '문의가 성공적으로 접수되었습니다.';
        form.reset(); // 입력창 초기화
    }
});