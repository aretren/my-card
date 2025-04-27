// Ваш JavaScript код здесь

// Пример: Обновление текущего года в футере
document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Логика для переключения секций и тем дизайнов ---

    const toggleDesignsButton = document.getElementById('toggle-designs');
    const toggleMainButton = document.getElementById('toggle-main');
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const themeSwitches = document.querySelectorAll('.theme-switch');
    const samplePage = document.getElementById('sample-page');

    // Функция для показа секции дизайнов
    function showDesigns() {
        mainContent.classList.add('hidden'); // Скрываем основной контент
        designShowcase.classList.remove('hidden'); // Показываем секцию дизайнов
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
    }

    // Функция для показа основного контента
    function showMainContent() {
        designShowcase.classList.add('hidden'); // Скрываем секцию дизайнов
        mainContent.classList.remove('hidden'); // Показываем основной контент
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
    }

    // Обработчики кликов для кнопок переключения секций
    if (toggleDesignsButton) {
        toggleDesignsButton.addEventListener('click', showDesigns);
    }

    if (toggleMainButton) {
        toggleMainButton.addEventListener('click', showMainContent);
    }

    // Обработчики кликов для кнопок переключения тем
    if (themeSwitches && samplePage) {
        themeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                themeSwitches.forEach(btn => btn.classList.remove('active'));

                // Добавляем активный класс кликнутой кнопке
                button.classList.add('active');

                // Получаем название темы из data-атрибута
                const theme = button.getAttribute('data-theme');

                // Удаляем все классы тем у примера страницы
                samplePage.className = 'sample-page'; // Сбрасываем до базового класса

                // Добавляем класс выбранной темы, если это не "default"
                if (theme !== 'default') {
                    samplePage.classList.add('theme-' + theme);
                }
            });
        });
    }
});
