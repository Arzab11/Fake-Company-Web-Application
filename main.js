const theme_change = document.querySelector('.theme');
const theme = localStorage.getItem('theme');

document.body.classList.add(theme);

function toggle_style() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
    }
    else {
        localStorage.removeItem('theme');
    }
}

theme_change.addEventListener('click', toggle_style);