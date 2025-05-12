
// const basePath =  window.location.pathname.replace('/index.html', '');
const basePath = '';
const logoImage = document.getElementById('logo-image');
const themeToggleLabel = document.getElementById('themeToggleLabel');
const themeStylesheet = document.getElementById('theme-stylesheet');
const themeToggleModeText = document.getElementById('themeToggleModeText');


function setThemeMode() {
    //check if themeMode is set in localStorage, if not, set it to the user's preferred theme mode
    if(localStorage.getItem('pharmalister-themeMode') == null){
        let userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (userPrefersDark) {
            localStorage.setItem('pharmalister-themeMode', 'dark');
        } else {
            localStorage.setItem('pharmalister-themeMode', 'light');
        }
    }
  
    let themeMode = localStorage.getItem('pharmalister-themeMode') || 'light';

    if (themeMode === 'dark') {
        if (themeStylesheet) themeStylesheet.href = `assets/css/dark.css`;
        if (themeToggleLabel) themeToggleLabel.style.color = '#555';
        // if (logoImage) logoImage.src = `/assets/img/logos/Full_Logo_Grey.png`;
        } else {
            if (themeStylesheet) themeStylesheet.href = `assets/css/light.css`;
            if (themeToggleLabel) themeToggleLabel.style.color = '#ffb833';
        // logoImage.src = `/assets/img/logos/Full_Logo.png`;
        // logoImage.src = `/assets/img/logos/Full_Logo.png`;
    }
}

setThemeMode();


document.addEventListener('DOMContentLoaded', function () {

    if(themeToggleLabel) {
        themeToggleLabel.addEventListener('click', function () {
            if (themeStylesheet.href.endsWith('assets/css/light.css')) {
                themeStylesheet.href = `assets/css/dark.css`;
                // logoImage.src = `/assets/img/logos/Full_Logo_Grey.png`;
                // themeToggleModeText.textContent = 'Light';
                themeToggleLabel.style.color = '#555';
                localStorage.setItem('pharmalister-themeMode', 'dark');
            } else {
                themeStylesheet.href = `assets/css/light.css`;
                // logoImage.src = `/assets/img/logos/Full_Logo.png`;
                // themeToggleModeText.textContent = 'Dark';
                //themeToggle.classList.remove('text-light');
                //themeToggleModeText.classList.remove('text-light');
                themeToggleLabel.style.color = '#ffb833';
                localStorage.setItem('pharmalister-themeMode', 'light');
            }
        });
    }
});




