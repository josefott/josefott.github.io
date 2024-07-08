document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // Apply dark mode if previously set
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});
