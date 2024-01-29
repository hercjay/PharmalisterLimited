
const basePath =  window.location.pathname.replace('/index.html', '');
alert(`${basePath}/assets/css/dark.css`);
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
        themeStylesheet.href = `${basePath}/assets/css/dark.css`;
        logoImage.src = `${basePath}/assets/img/logos/Full_Logo_Grey.png`;
    } else {
        themeStylesheet.href = `${basePath}/assets/css/light.css`;
        logoImage.src = `${basePath}/assets/img/logos/Full_Logo.png`;
    }
}

setThemeMode();


document.addEventListener('DOMContentLoaded', function () {

    themeToggleLabel.addEventListener('click', function () {
        if (themeStylesheet.href.endsWith('assets/css/light.css')) {
            themeStylesheet.href = `${basePath}/assets/css/dark.css`;
            logoImage.src = `${basePath}/assets/img/logos/Full_Logo_Grey.png`;
            // themeToggleModeText.textContent = 'Light';
            //themeToggleLabel.style.color = '#fff';
            localStorage.setItem('pharmalister-themeMode', 'dark');
        } else {
            themeStylesheet.href = `${basePath}/assets/css/light.css`;
            logoImage.src = `${basePath}/assets/img/logos/Full_Logo.png`;
            // themeToggleModeText.textContent = 'Dark';
            //themeToggle.classList.remove('text-light');
            //themeToggleModeText.classList.remove('text-light');
            //themeToggleLabel.style.color = '#ffb833';
            localStorage.setItem('pharmalister-themeMode', 'light');
        }
    });
});


