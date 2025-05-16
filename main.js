// Ваш JavaScript код здесь

document.addEventListener('DOMContentLoaded', (event) => {
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

    let currentBaseTheme = 'aero';

    function applyCurrentTheme() {
        const currentMode = modeSwitchCheckbox && modeSwitchCheckbox.checked ? 'dark' : 'light';
        samplePage.className = 'sample-page';

        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        }
        if (currentMode === 'dark') {
            samplePage.classList.add('mode-dark');
        }

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
        const sampleTabs = samplePage ? samplePage.querySelector('.sample-tabs') : null;
        if (sampleTabs) {
            const tabButtons = sampleTabs.querySelectorAll('.tab-button');
            const tabPanes = sampleTabs.querySelectorAll('.tab-pane');

            tabButtons.forEach(button => {
                const newButton = button.cloneNode(true);
                if (button.parentNode) {
                    button.parentNode.replaceChild(newButton, button);
                }
            });

            const updatedTabButtons = samplePage.querySelectorAll('.sample-tabs .tab-button');

            updatedTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                    updatedTabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    button.classList.add('active');
                    const activePane = document.getElementById(targetTab + '-content');
                    if (activePane) {
                        activePane.classList.add('active');
                    }
                });
            });

            if (updatedTabButtons.length > 0 && tabPanes.length > 0) {
                const activeTabButton = sampleTabs.querySelector('.tab-button.active');
                if (activeTabButton) {
                    const targetTab = activeTabButton.getAttribute('data-tab');
                    const activePane = document.getElementById(targetTab + '-content');
                    if (activePane) {
                        activePane.classList.add('active');
                    } else {
                        updatedTabButtons[0].classList.add('active');
                        tabPanes[0].classList.add('active');
                    }
                } else {
                    updatedTabButtons[0].classList.add('active');
                    tabPanes[0].classList.add('active');
                }
            }
        }
    }

    if (toggleDesignsButton) {
        toggleDesignsButton.addEventListener('click', showDesigns);
    }
    if (toggleMainHeaderButton) {
        toggleMainHeaderButton.addEventListener('click', showMainContent);
    }

    if (baseThemeSwitches.length > 0 && samplePage) {
        baseThemeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                currentBaseTheme = button.getAttribute('data-base-theme');
                applyCurrentTheme();
            });
        });
    }

    if (modeSwitchCheckbox && samplePage) {
        modeSwitchCheckbox.addEventListener('change', () => {
            applyCurrentTheme();
        });
    }

    if (mainContent && designShowcase && toggleDesignsButton && toggleMainHeaderButton) {
        if (!mainContent.classList.contains('hidden')) {
            toggleDesignsButton.classList.remove('hidden');
            toggleMainHeaderButton.classList.add('hidden');
            mainContent.style.opacity = 1;
            designShowcase.style.opacity = 0;
        } else if (!designShowcase.classList.contains('hidden')) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
            designShowcase.style.opacity = 1;
            mainContent.style.opacity = 0;
            const firstBaseThemeButton = document.querySelector('.base-theme-switch');
            if (firstBaseThemeButton) {
                currentBaseTheme = firstBaseThemeButton.getAttribute('data-base-theme');
                applyCurrentTheme();
            } else {
                initializeSampleTabs();
            }
        } else {
            toggleDesignsButton.classList.remove('hidden');
            toggleMainHeaderButton.classList.add('hidden');
            mainContent.style.opacity = 1;
            designShowcase.style.opacity = 0;
            initializeSampleTabs();
        }
    }

    if (designShowcase && designShowcase.classList.contains('hidden')) {
        samplePage.className = 'sample-page';
        const firstBaseThemeButton = document.querySelector('.base-theme-switch');
        if(firstBaseThemeButton) firstBaseThemeButton.classList.add('active');
        if (modeSwitchCheckbox) {
            modeSwitchCheckbox.checked = false;
        }
        currentBaseTheme = firstBaseThemeButton ? firstBaseThemeButton.getAttribute('data-base-theme') : 'aero';
        initializeSampleTabs();
    }
});
