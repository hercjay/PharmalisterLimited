

    document.addEventListener('DOMContentLoaded', function () {
        const themeToggleLabel = document.getElementById('themeToggleLabel');
        const themeStylesheet = document.getElementById('theme-stylesheet');
        const themeToggleModeText = document.getElementById('themeToggleModeText');

        themeToggleLabel.addEventListener('click', function () {
            if (themeStylesheet.href.endsWith('assets/css/light.css')) {
                themeStylesheet.href = 'assets/css/dark.css';
                themeToggleModeText.textContent = 'Light';
            } else {
                themeStylesheet.href = 'assets/css/light.css';
                themeToggleModeText.textContent = 'Dark';
            }
        });
    });


