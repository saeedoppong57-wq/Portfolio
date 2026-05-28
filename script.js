const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav');
const header = document.querySelector('header');

menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu?.classList.toggle('open');
    header?.classList.toggle('menu-open', isOpen);
    menuToggle?.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});