const hamburgerBtn = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

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

