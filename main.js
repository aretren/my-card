document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const toggleDesignsButton = document.getElementById('toggle-designs');
    const toggleMainHeaderButton = document.getElementById('toggle-main-header');
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const baseThemeSwitches = document.querySelectorAll('.base-theme-switch');
    const modeSwitchCheckbox = document.getElementById('sample-switch');
    const samplePage = document.getElementById('sample-page');
    const themeLabel = document.querySelector('.theme-label');

    let currentBaseTheme = 'aero';

    function applyCurrentTheme() {
        // Сбрасываем классы, кроме sample-page
        samplePage.className = 'sample-page';

        // Добавляем базовую тему
        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        }

        // Добавляем или убираем темную тему только для sample-page
        if (modeSwitchCheckbox && modeSwitchCheckbox.checked) {
            samplePage.classList.add('mode-dark');
            if (themeLabel) themeLabel.textContent = 'Тёмная';
        } else {
            if (themeLabel) themeLabel.textContent = 'Светлая';
        }

        // Активные кнопки тем
        baseThemeSwitches.forEach(button => {
            if (button.getAttribute('data-base-theme') === currentBaseTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        initializeSampleTabs();
    }

    function showDesigns() {
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
        }
        const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
        if (activeBaseThemeButton) {
            currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
        } else if (baseThemeSwitches.length > 0) {
            currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
        } else {
            currentBaseTheme = 'aero';
        }
        applyCurrentTheme();
        if (mainContent) mainContent.style.opacity = 0;
        setTimeout(() => {
            if (mainContent) mainContent.classList.add('hidden');
            if (designShowcase) designShowcase.classList.remove('hidden');
            if (designShowcase) designShowcase.style.opacity = 1;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    }

    function showMainContent() {
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleMainHeaderButton.classList.add('hidden');
            toggleDesignsButton.classList.remove('hidden');
        }
        if (designShowcase) designShowcase.style.opacity = 0;
        setTimeout(() => {
            if (designShowcase) designShowcase.classList.add('hidden');
            if (mainContent) mainContent.classList.remove('hidden');
            if (mainContent) mainContent.style.opacity = 1;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    }

    function initializeSampleTabs() {
        const sampleTabs = document.querySelector('.sample-tabs');
        if (!sampleTabs) return;
        const tabButtons = sampleTabs.querySelectorAll('.tab-button');
        const tabPanes = sampleTabs.querySelectorAll('.tab-pane');
        tabButtons.forEach((button, idx) => {
            button.onclick = () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                button.classList.add('active');
                tabPanes[idx].classList.add('active');
            };
        });
        let anyActive = false;
        tabButtons.forEach((btn, idx) => {
            if (btn.classList.contains('active')) {
                tabPanes[idx].classList.add('active');
                anyActive = true;
            }
        });
        if (!anyActive && tabButtons.length > 0 && tabPanes.length > 0) {
            tabButtons[0].classList.add('active');
            tabPanes[0].classList.add('active');
        }
    }

    // Кнопки показа/скрытия дизайнов
    if (toggleDesignsButton) toggleDesignsButton.addEventListener('click', showDesigns);
    if (toggleMainHeaderButton) toggleMainHeaderButton.addEventListener('click', showMainContent);

    // Переключение тем-примеров
    if (baseThemeSwitches.length > 0 && samplePage) {
        baseThemeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                currentBaseTheme = button.getAttribute('data-base-theme');
                applyCurrentTheme();
            });
        });
    }

    // Переключатель "Светлая/Тёмная" — только для sample-page!
    if (modeSwitchCheckbox && samplePage) {
        modeSwitchCheckbox.addEventListener('change', applyCurrentTheme);
        // Инициализация текста лейбла
        if (themeLabel) themeLabel.textContent = modeSwitchCheckbox.checked ? 'Тёмная' : 'Светлая';
    }

    initializeSampleTabs();
    applyCurrentTheme(); // При первой загрузке — корректная тема
});
