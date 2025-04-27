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
        // Используем opacity и затем display none после завершения перехода
        mainContent.style.opacity = 0;
        setTimeout(() => {
             mainContent.classList.add('hidden'); // Скрываем основной контент
             designShowcase.classList.remove('hidden'); // Показываем секцию дизайнов
             designShowcase.style.opacity = 1; // Показываем с плавным переходом
             window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
    }

    // Функция для показа основного контента
    function showMainContent() {
        // Используем opacity и затем display none после завершения перехода
        designShowcase.style.opacity = 0;
        setTimeout(() => {
            designShowcase.classList.add('hidden'); // Скрываем секцию дизайнов
            mainContent.classList.remove('hidden'); // Показываем основной контент
            mainContent.style.opacity = 1; // Показываем с плавным переходом
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
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
                // Сохраняем базовый класс 'sample-page'
                samplePage.className = 'sample-page';

                // Добавляем класс выбранной темы, если это не "default"
                if (theme !== 'default') {
                    samplePage.classList.add('theme-' + theme);
                }
            });
        });
    }

    // Изначально устанавливаем opacity для основной секции
    if (mainContent && !mainContent.classList.contains('hidden')) {
         mainContent.style.opacity = 1;
    }
     // Изначально устанавливаем opacity для секции дизайнов (если она случайно видима)
     if (designShowcase && !designShowcase.classList.contains('hidden')) {
         designShowcase.style.opacity = 1;
     } else if (designShowcase) {
         // Если секция дизайнов скрыта, убедимся, что opacity 0
         designShowcase.style.opacity = 0;
     }


});
