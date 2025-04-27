// Ваш JavaScript код здесь

// Пример: Обновление текущего года в футере
document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Логика для переключения секций и тем дизайнов ---

    const toggleDesignsButton = document.getElementById('toggle-designs');
    const toggleMainHeaderButton = document.getElementById('toggle-main-header'); // Получаем новую кнопку в хедере
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const themeSwitches = document.querySelectorAll('.theme-switch');
    const samplePage = document.getElementById('sample-page');

    // Функция для применения темы
    function applyTheme(themeName) {
        // Удаляем активный класс у всех кнопок
        themeSwitches.forEach(btn => btn.classList.remove('active'));

        // Находим и добавляем активный класс кнопке с соответствующим data-theme
        const activeButton = document.querySelector(`.theme-switch[data-theme="${themeName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Удаляем все классы тем у примера страницы, оставляя только базовый 'sample-page'
        samplePage.className = 'sample-page';

        // Добавляем класс выбранной темы, если она не "default" (который соответствует базовому стилю)
        // У нас больше нет кнопки default, но функция все еще может быть вызвана с 'default'
        if (themeName && themeName !== 'default') {
            samplePage.classList.add('theme-' + themeName);
        }
    }


    // Функция для показа секции дизайнов
    function showDesigns() {
        // Скрываем кнопку "Показать Дизайны", показываем кнопку "Вернуться"
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
        }

        // Перед показом секции, применяем первую тему по умолчанию (например, Aero)
        const firstThemeButton = document.querySelector('.theme-switch'); // Находит первую кнопку .theme-switch
        if (firstThemeButton) {
            const defaultDesignTheme = firstThemeButton.getAttribute('data-theme');
             // Применяем тему и делаем кнопку активной
            applyTheme(defaultDesignTheme);
        } else {
            // Если кнопок тем нет (что маловероятно), применяем базовый стиль
             applyTheme('default');
        }


        // Используем opacity и затем display none после перехода
        mainContent.style.opacity = 0;
        setTimeout(() => {
             mainContent.classList.add('hidden'); // Скрываем основной контент
             designShowcase.classList.remove('hidden'); // Показываем секцию дизайнов
             // Убедимся, что opacity корректно установлено для плавного перехода
             designShowcase.style.opacity = 1;
             window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
    }

    // Функция для показа основного контента
    function showMainContent() {
         // Скрываем кнопку "Вернуться", показываем кнопку "Показать Дизайны"
         if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleMainHeaderButton.classList.add('hidden');
            toggleDesignsButton.classList.remove('hidden');
         }

        // Используем opacity и затем display none после перехода
        designShowcase.style.opacity = 0;
        setTimeout(() => {
            designShowcase.classList.add('hidden'); // Скрываем секцию дизайнов
            mainContent.classList.remove('hidden'); // Показываем основной контент
            // Убедимся, что opacity корректно установлено для плавного перехода
            mainContent.style.opacity = 1;
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
        // === ИСПРАВЛЕНИЕ: УДАЛЕНА ЛИШНЯЯ ", 500)" ЗДЕСЬ ===
    }


    // Обработчики кликов для кнопок переключения секций
    if (toggleDesignsButton) {
        toggleDesignsButton.addEventListener('click', showDesigns);
    }

    // Используем новую кнопку в хедере для возврата
    if (toggleMainHeaderButton) {
        toggleMainHeaderButton.addEventListener('click', showMainContent);
    }


    // Обработчики кликов для кнопок переключения тем
    if (themeSwitches.length > 0 && samplePage) {
        themeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                applyTheme(theme); // Используем функцию applyTheme
            });
        });

        // При загрузке страницы, если секция дизайнов скрыта,
        // убедимся, что пример страницы использует базовые стили (эквивалент "Стандартный")
         if (designShowcase.classList.contains('hidden')) {
            samplePage.className = 'sample-page'; // Применяем базовый класс
         }
    }

    // Управление видимостью кнопок в хедере при загрузке и начальное состояние opacity
    if (mainContent && designShowcase && toggleDesignsButton && toggleMainHeaderButton) {
        if (!mainContent.classList.contains('hidden')) {
             // Виден основной контент
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1; // Убедимся, что основной контент видим
             designShowcase.style.opacity = 0; // И дизайны скрыты
        } else if (!designShowcase.classList.contains('hidden')) {
             // Видны дизайны
             toggleDesignsButton.classList.add('hidden');
             toggleMainHeaderButton.classList.remove('hidden');
             designShowcase.style.opacity = 1; // Убедимся, что дизайны видны
             mainContent.style.opacity = 0; // И основной контент скрыт

             // Если дизайны видны при загрузке, активируем первую тему
             const firstThemeButton = document.querySelector('.theme-switch');
             if (firstThemeButton) {
                 applyTheme(firstThemeButton.getAttribute('data-theme'));
             }

        } else {
            // Обе секции скрыты (неожиданно, но на всякий случай)
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1;
             designShowcase.style.opacity = 0;
        }
    } else {
        console.error("Не найдены все необходимые элементы DOM для переключения секций!");
    }


});// Ваш JavaScript код здесь

// Пример: Обновление текущего года в футере
document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Логика для переключения секций и тем дизайнов ---

    const toggleDesignsButton = document.getElementById('toggle-designs');
    const toggleMainHeaderButton = document.getElementById('toggle-main-header'); // Получаем новую кнопку в хедере
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const themeSwitches = document.querySelectorAll('.theme-switch');
    const samplePage = document.getElementById('sample-page');

    // Функция для применения темы
    function applyTheme(themeName) {
        // Удаляем активный класс у всех кнопок
        themeSwitches.forEach(btn => btn.classList.remove('active'));

        // Находим и добавляем активный класс кнопке с соответствующим data-theme
        const activeButton = document.querySelector(`.theme-switch[data-theme="${themeName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Удаляем все классы тем у примера страницы, оставляя только базовый 'sample-page'
        samplePage.className = 'sample-page';

        // Добавляем класс выбранной темы, если она не "default" (который соответствует базовому стилю)
        // У нас больше нет кнопки default, но функция все еще может быть вызвана с 'default'
        if (themeName && themeName !== 'default') {
            samplePage.classList.add('theme-' + themeName);
        }
    }


    // Функция для показа секции дизайнов
    function showDesigns() {
        // Скрываем кнопку "Показать Дизайны", показываем кнопку "Вернуться"
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
        }

        // Перед показом секции, применяем первую тему по умолчанию (например, Aero)
        const firstThemeButton = document.querySelector('.theme-switch'); // Находит первую кнопку .theme-switch
        if (firstThemeButton) {
            const defaultDesignTheme = firstThemeButton.getAttribute('data-theme');
             // Применяем тему и делаем кнопку активной
            applyTheme(defaultDesignTheme);
        } else {
            // Если кнопок тем нет (что маловероятно), применяем базовый стиль
             applyTheme('default');
        }


        // Используем opacity и затем display none после перехода
        mainContent.style.opacity = 0;
        setTimeout(() => {
             mainContent.classList.add('hidden'); // Скрываем основной контент
             designShowcase.classList.remove('hidden'); // Показываем секцию дизайнов
             // Убедимся, что opacity корректно установлено для плавного перехода
             designShowcase.style.opacity = 1;
             window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
    }

    // Функция для показа основного контента
    function showMainContent() {
         // Скрываем кнопку "Вернуться", показываем кнопку "Показать Дизайны"
         if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleMainHeaderButton.classList.add('hidden');
            toggleDesignsButton.classList.remove('hidden');
         }

        // Используем opacity и затем display none после перехода
        designShowcase.style.opacity = 0;
        setTimeout(() => {
            designShowcase.classList.add('hidden'); // Скрываем секцию дизайнов
            mainContent.classList.remove('hidden'); // Показываем основной контент
            // Убедимся, что opacity корректно установлено для плавного перехода
            mainContent.style.opacity = 1;
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
        // === ИСПРАВЛЕНИЕ: УДАЛЕНА ЛИШНЯЯ ", 500)" ЗДЕСЬ ===
    }


    // Обработчики кликов для кнопок переключения секций
    if (toggleDesignsButton) {
        toggleDesignsButton.addEventListener('click', showDesigns);
    }

    // Используем новую кнопку в хедере для возврата
    if (toggleMainHeaderButton) {
        toggleMainHeaderButton.addEventListener('click', showMainContent);
    }


    // Обработчики кликов для кнопок переключения тем
    if (themeSwitches.length > 0 && samplePage) {
        themeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                applyTheme(theme); // Используем функцию applyTheme
            });
        });

        // При загрузке страницы, если секция дизайнов скрыта,
        // убедимся, что пример страницы использует базовые стили (эквивалент "Стандартный")
         if (designShowcase.classList.contains('hidden')) {
            samplePage.className = 'sample-page'; // Применяем базовый класс
         }
    }

    // Управление видимостью кнопок в хедере при загрузке и начальное состояние opacity
    if (mainContent && designShowcase && toggleDesignsButton && toggleMainHeaderButton) {
        if (!mainContent.classList.contains('hidden')) {
             // Виден основной контент
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1; // Убедимся, что основной контент видим
             designShowcase.style.opacity = 0; // И дизайны скрыты
        } else if (!designShowcase.classList.contains('hidden')) {
             // Видны дизайны
             toggleDesignsButton.classList.add('hidden');
             toggleMainHeaderButton.classList.remove('hidden');
             designShowcase.style.opacity = 1; // Убедимся, что дизайны видны
             mainContent.style.opacity = 0; // И основной контент скрыт

             // Если дизайны видны при загрузке, активируем первую тему
             const firstThemeButton = document.querySelector('.theme-switch');
             if (firstThemeButton) {
                 applyTheme(firstThemeButton.getAttribute('data-theme'));
             }

        } else {
            // Обе секции скрыты (неожиданно, но на всякий случай)
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1;
             designShowcase.style.opacity = 0;
        }
    } else {
        console.error("Не найдены все необходимые элементы DOM для переключения секций!");
    }


});
