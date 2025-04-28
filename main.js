// Ваш JavaScript код здесь

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOMContentLoaded fired"); // Лог при старте скрипта

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Логика для переключения секций и тем дизайнов ---

    const toggleDesignsButton = document.getElementById('toggle-designs');
    const toggleMainHeaderButton = document.getElementById('toggle-main-header');
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const baseThemeSwitches = document.querySelectorAll('.base-theme-switch'); // Кнопки выбора стиля
    const modeSwitchCheckbox = document.getElementById('sample-switch'); // Чекбокс переключателя режима
    const samplePage = document.getElementById('sample-page');

    // Переменная для хранения текущего выбранного стиля
    let currentBaseTheme = 'aero'; // Стиль по умолчанию


    console.log("Elements obtained:", { toggleDesignsButton, toggleMainHeaderButton, mainContent, designShowcase, baseThemeSwitches, modeSwitchCheckbox, samplePage }); // Проверяем, найдены ли элементы


    // Функция для применения текущего выбранного стиля и режима к примеру страницы
    function applyCurrentTheme() {
        // Определяем текущий режим по состоянию чекбокса
        const currentMode = modeSwitchCheckbox && modeSwitchCheckbox.checked ? 'dark' : 'light';
        console.log(`Applying theme: ${currentBaseTheme}, mode: ${currentMode}`);

        // Удаляем все классы тем и режимов у примера страницы, кроме базового 'sample-page'
        samplePage.className = 'sample-page';

        // Добавляем класс базового стиля
        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        }

        // Добавляем класс темного режима, если он активен
        if (currentMode === 'dark') {
             samplePage.classList.add('mode-dark');
        }
        // Класс 'mode-light' не добавляем, так как светлый режим - это базовое состояние без 'mode-dark'


        // Обновляем активные состояния кнопок базовых стилей
        baseThemeSwitches.forEach(button => {
            if (button.getAttribute('data-base-theme') === currentBaseTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // После смены темы/режима, переинициализируем вкладки для нового стиля
        initializeSampleTabs();
        console.log("Theme applied and tabs initialized.");
    }


    // Функция для показа секции дизайнов
    function showDesigns() {
        console.log("showDesigns function called");

        // Скрываем кнопку "Показать Дизайны", показываем кнопку "Вернуться"
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
            console.log("Header buttons visibility toggled.");
        }

        // Перед показом секции, применяем текущий выбранный стиль и режим
        // Убедимся, что тема по умолчанию выбрана, если нет активных кнопок
        const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
         if (activeBaseThemeButton) {
              currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
              console.log("Active base theme found:", currentBaseTheme);
         } else if (baseThemeSwitches.length > 0) {
             currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
             console.log("No active base theme, defaulting to first:", currentBaseTheme);
         } else {
             currentBaseTheme = 'aero'; // Fallback
             console.log("No base theme switches found, defaulting to 'aero'.");
         }

        // Режим определяется состоянием чекбокса, applyCurrentTheme это прочитает

        applyCurrentTheme(); // Применяем текущий стиль и режим
        console.log("applyCurrentTheme called from showDesigns.");


        // Используем opacity и затем display none после перехода
        if (mainContent) mainContent.style.opacity = 0;
        console.log("mainContent opacity set to 0.");

        setTimeout(() => {
            console.log("setTimeout callback executed.");
            if (mainContent) mainContent.classList.add('hidden'); // Скрываем основной контент
            console.log("mainContent hidden class added.");
            if (designShowcase) designShowcase.classList.remove('hidden'); // Показываем секцию дизайнов
            console.log("designShowcase hidden class removed.");
            if (designShowcase) designShowcase.style.opacity = 1; // Показываем с плавным переходом
            console.log("designShowcase opacity set to 1.");
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
            console.log("Scrolled to top.");

        }, 500); // Время должно совпадать с transition opacity в CSS
         console.log("setTimeout scheduled.");
    }

    // Функция для показа основного контента
    function showMainContent() {
        console.log("showMainContent function called");

         // Скрываем кнопку "Вернуться", показываем кнопку "Показать Дизайны"
         if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleMainHeaderButton.classList.add('hidden');
            toggleDesignsButton.classList.remove('hidden');
            console.log("Header buttons visibility toggled.");
         }

        // Используем opacity и затем display none после перехода
        if (designShowcase) designShowcase.style.opacity = 0;
        console.log("designShowcase opacity set to 0.");

        setTimeout(() => {
             console.log("setTimeout callback executed (showMainContent).");
            if (designShowcase) designShowcase.classList.add('hidden'); // Скрываем секцию дизайнов
            console.log("designShowcase hidden class added.");
            if (mainContent) mainContent.classList.remove('hidden'); // Показываем основной контент
            console.log("mainContent hidden class removed.");
            if (mainContent) mainContent.style.opacity = 1; // Показываем с плавным переходом
            console.log("mainContent opacity set to 1.");
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
            console.log("Scrolled to top.");

        }, 500); // Время должно совпадать с transition opacity в CSS
         console.log("setTimeout scheduled (showMainContent).");
    }


    // --- Логика для вкладок внутри примера страницы ---
    function initializeSampleTabs() {
        const sampleTabs = samplePage ? samplePage.querySelector('.sample-tabs') : null; // Проверяем, что samplePage существует
        if (sampleTabs) {
             console.log("Initializing sample tabs.");
            const tabButtons = sampleTabs.querySelectorAll('.tab-button');
            const tabPanes = sampleTabs.querySelectorAll('.tab-pane');

             if (tabButtons.length === 0 || tabPanes.length === 0) {
                 console.warn("Sample tabs or panes not found.");
                 return;
             }

            // Удаляем все предыдущие обработчики
            tabButtons.forEach(button => {
                 const newButton = button.cloneNode(true);
                 // Убедимся, что родитель существует перед заменой
                 if (button.parentNode) {
                     button.parentNode.replaceChild(newButton, button);
                 } else {
                     console.warn("Button parent not found, cannot replace child.");
                 }
            });

            // Получаем обновленные ссылки на кнопки
            const updatedTabButtons = samplePage.querySelectorAll('.sample-tabs .tab-button');

            updatedTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                     console.log(`Tab button clicked: ${targetTab}`);

                    // Удаляем активный класс у всех кнопок и панелей
                    updatedTabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));

                    // Добавляем активный класс кликнутой кнопке и целевой панели
                    button.classList.add('active');
                    const activePane = document.getElementById(targetTab + '-content');
                    if (activePane) {
                        activePane.classList.add('active');
                        console.log(`Pane activated: ${targetTab}-content`);
                    } else {
                         console.warn(`Target pane not found: ${targetTab}-content`);
                    }
                });
            });

            // Активируем первую вкладку по умолчанию при инициализации
            if (updatedTabButtons.length > 0 && tabPanes.length > 0) {
                 const activeTabButton = sampleTabs.querySelector('.tab-button.active');
                 if (activeTabButton) {
                     // Если уже есть активная вкладка, просто убедимся, что соответствующая панель видна
                      const targetTab = activeTabButton.getAttribute('data-tab');
                      const activePane = document.getElementById(targetTab + '-content');
                      if (activePane) {
                           activePane.classList.add('active');
                           console.log(`Keeping existing active pane: ${targetTab}-content`);
                      } else {
                         // Fallback: если активная кнопка есть, но панель не найдена, активируем первую
                         updatedTabButtons[0].classList.add('active');
                         tabPanes[0].classList.add('active');
                          console.warn("Active tab button found but pane not found. Defaulting to first tab.");
                      }
                 } else {
                    // Если активной вкладки нет, активируем первую
                    updatedTabButtons[0].classList.add('active');
                    tabPanes[0].classList.add('active');
                    console.log("No active tab found, defaulting to first tab.");
                 }
            }
             console.log("Sample tabs initialization complete.");
        } else {
            console.warn("Sample tabs container not found.");
        }
    }


    // --- Обработчики кликов для кнопок переключения секций ---
    console.log("Attempting to add click listener to toggleDesignsButton.");
    if (toggleDesignsButton) {
        toggleDesignsButton.addEventListener('click', showDesigns);
        console.log("Click listener added to toggleDesignsButton.");
    } else {
         console.error("toggleDesignsButton not found.");
    }

    console.log("Attempting to add click listener to toggleMainHeaderButton.");
    if (toggleMainHeaderButton) {
        toggleMainHeaderButton.addEventListener('click', showMainContent);
        console.log("Click listener added to toggleMainHeaderButton.");
    } else {
         console.error("toggleMainHeaderButton not found.");
    }


    // Обработчики кликов для кнопок выбора базового стиля
    if (baseThemeSwitches.length > 0 && samplePage) {
        baseThemeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                currentBaseTheme = button.getAttribute('data-base-theme');
                console.log("Base theme switch clicked:", currentBaseTheme);
                applyCurrentTheme(); // Применяем текущий стиль и режим
            });
        });
        console.log("Base theme switch listeners added.");
    } else {
         console.warn("Кнопки выбора базового стиля не найдены или samplePage отсутствует.");
    }

    // Обработчик изменения состояния чекбокса режима (Светлая/Темная)
    if (modeSwitchCheckbox && samplePage) {
        modeSwitchCheckbox.addEventListener('change', () => {
            console.log("Mode switch checkbox changed.");
            applyCurrentTheme(); // Применяем текущий стиль и режим
        });
         console.log("Mode switch checkbox listener added.");
    } else {
         console.warn("Чекбокс переключателя режима не найден или samplePage отсутствует.");
    }


    // Управление видимостью кнопок в хедере при загрузке и начальное состояние opacity
    console.log("Checking initial state...");
    if (mainContent && designShowcase && toggleDesignsButton && toggleMainHeaderButton) {
        if (!mainContent.classList.contains('hidden')) {
             // Виден основной контент
             console.log("Initial state: Main content visible.");
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1;
             designShowcase.style.opacity = 0;
        } else if (!designShowcase.classList.contains('hidden')) {
             // Видны дизайны
              console.log("Initial state: Design showcase visible.");
             toggleDesignsButton.classList.add('hidden');
             toggleMainHeaderButton.classList.remove('hidden');
             designShowcase.style.opacity = 1;
             mainContent.style.opacity = 0;

             // Если дизайны видны при загрузке, активируем первую тему и режим по чекбоксу
             const firstBaseThemeButton = document.querySelector('.base-theme-switch');
             if (firstBaseThemeButton) {
                 currentBaseTheme = firstBaseThemeButton.getAttribute('data-base-theme');
                 // Режим определяется состоянием чекбокса, applyCurrentTheme прочитает его
                 console.log(`Initial design state theme: ${currentBaseTheme}. Mode will be read from checkbox.`);
                 applyCurrentTheme();
             } else {
                  console.warn("No base theme switches found for initial design state.");
                 initializeSampleTabs();
             }

        } else {
            // Обе секции скрыты (неожиданно, но на всякий случай)
             console.log("Initial state: Both sections hidden?");
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1;
             designShowcase.style.opacity = 0;
             initializeSampleTabs();
        }
    } else {
        console.error("Не найдены все необходимые элементы DOM для переключения секций при загрузке!");
    }

     // При загрузке страницы, если секция дизайнов скрыта, явно устанавливается
     // базовый стиль и режим по умолчанию (светлый, чекбокс выключен),
     // а также активируются кнопки и инициализируются вкладки.
    if (designShowcase && designShowcase.classList.contains('hidden')) {
        console.log("Design showcase is hidden on load, setting default theme state.");
        samplePage.className = 'sample-page'; // Убедимся, что базовый стиль применен

        // Активируем первую кнопку стиля при загрузке
         const firstBaseThemeButton = document.querySelector('.base-theme-switch');
         if(firstBaseThemeButton) firstBaseThemeButton.classList.add('active');

        // Убедимся, что чекбокс режима выключен для светлого режима по умолчанию
         if (modeSwitchCheckbox) {
             modeSwitchCheckbox.checked = false;
         }

         // Установим начальную переменную baseTheme
         currentBaseTheme = firstBaseThemeButton ? firstBaseThemeButton.getAttribute('data-base-theme') : 'aero';

         initializeSampleTabs();
         console.log("Initial theme/mode state set and tabs initialized for hidden design section.");
    }


});
