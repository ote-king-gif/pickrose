const menuIcon = document.querySelector('#menuIcon');

const navLinks = document.querySelector('#navLinks');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


