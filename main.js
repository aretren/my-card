document.addEventListener('DOMContentLoaded', () => {
    // Получаем текущий год для футера
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Получаем ссылки на элементы DOM ---
    // Одна кнопка для переключения секций
    const sectionToggleButton = document.getElementById('section-toggle-button');
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const baseThemeSwitches = document.querySelectorAll('.base-theme-switch'); // Кнопки выбора стиля
    const modeSwitchCheckbox = document.getElementById('sample-switch'); // Чекбокс переключателя режима
    const samplePage = document.getElementById('sample-page');
    const themeLabel = document.querySelector('.theme-label'); // Лейбл для текста "Светлая/Тёмная"

    // Переменная для хранения текущего выбранного стиля
    let currentBaseTheme = 'aero'; // Стиль по умолчанию

    // Проверяем наличие основных элементов
    if (!sectionToggleButton || !mainContent || !designShowcase || !samplePage) {
        console.error("Одна или несколько основных секций или кнопок не найдены!");
        return; // Останавливаем выполнение скрипта, если нет основных элементов
    }

    // Функция для применения текущего выбранного стиля и режима к примеру страницы
    function applyCurrentTheme() {
        // Определяем текущий режим по состоянию чекбокса
        const currentMode = modeSwitchCheckbox && modeSwitchCheckbox.checked ? 'dark' : 'light';

        console.log(`Применяется тема: ${currentBaseTheme}, режим: ${currentMode}`);

        // Сбрасываем все классы тем и режимов у примера страницы, кроме базового 'sample-page'
        samplePage.className = 'sample-page';

        // Добавляем класс базового стиля
        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        } else {
            // Если вдруг active кнопка не найдена или default, применяем стиль 'aero'
            samplePage.classList.add('theme-aero');
            currentBaseTheme = 'aero';
             // Убедимся, что кнопка 'aero' активна
            const aeroButton = document.querySelector('.base-theme-switch[data-base-theme="aero"]');
            if(aeroButton) aeroButton.classList.add('active');
        }

        // Добавляем класс темного режима, если он активен
        if (currentMode === 'dark') {
             samplePage.classList.add('mode-dark');
             // Обновляем текст лейбла
             if (themeLabel) themeLabel.textContent = 'Тёмная';
        } else {
             // Обновляем текст лейбла
             if (themeLabel) themeLabel.textContent = 'Светлая';
        }

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
        console.log("Тема применена и вкладки инициализированы.");
    }

    // Функция для показа секции дизайнов
    function showDesigns() {
        console.log("showDesigns() вызвана");

        // Меняем текст кнопки
        sectionToggleButton.textContent = 'Вернуться к Портфолио';
        console.log("Текст кнопки переключен на 'Вернуться к Портфолио'.");


        // Перед показом секции, применяем текущий выбранный стиль и режим
        const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
         if (activeBaseThemeButton) {
              currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
              console.log("Найдена активная базовая тема при переходе:", currentBaseTheme);
         } else if (baseThemeSwitches.length > 0) {
             currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
             baseThemeSwitches[0].classList.add('active');
             console.log("Активная базовая тема не найдена, по умолчанию выбрана первая:", currentBaseTheme);
         } else {
             currentBaseTheme = 'aero';
             console.warn("Кнопки базовых тем не найдены, по умолчанию выбрана 'aero'.");
             const aeroButton = document.querySelector('.base-theme-switch[data-base-theme="aero"]');
             if(aeroButton) aeroButton.classList.add('active');
         }

        applyCurrentTheme();
        console.log("applyCurrentTheme() вызвана из showDesigns.");

        // Используем opacity и затем display none после перехода
        mainContent.style.opacity = 0;
        console.log("opacity mainContent установлено в 0.");

        setTimeout(() => {
            console.log("Callback setTimeout executed.");
            mainContent.classList.add('hidden');
            console.log("mainContent: добавлен класс hidden.");
            designShowcase.classList.remove('hidden');
            console.log("designShowcase: удален класс hidden.");
            setTimeout(() => {
                 designShowcase.style.opacity = 1;
                 console.log("opacity designShowcase установлено в 1.");
            }, 50); // Небольшая задержка

            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log("Прокрутка вверх.");

        }, 500);
         console.log("setTimeout запланирован.");
    }

    // Функция для показа основного контента
    function showMainContent() {
        console.log("showMainContent() вызвана");

        // Меняем текст кнопки
        sectionToggleButton.textContent = 'Показать Примеры Дизайнов';
        console.log("Текст кнопки переключен на 'Показать Примеры Дизайнов'.");

        // Используем opacity и затем display none после перехода
        designShowcase.style.opacity = 0;
        console.log("opacity designShowcase установлено в 0.");

        setTimeout(() => {
             console.log("Callback setTimeout executed (showMainContent).");
            designShowcase.classList.add('hidden');
            console.log("designShowcase: добавлен класс hidden.");
            mainContent.classList.remove('hidden');
            console.log("mainContent: удален класс hidden.");
            setTimeout(() => {
                 mainContent.style.opacity = 1;
                 console.log("opacity mainContent установлено в 1.");
            }, 50); // Небольшая задержка

            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log("Прокрутка вверх.");

        }, 500);
         console.log("setTimeout запланирован (showMainContent).");
    }

    // --- Логика для вкладок внутри примера страницы ---
    function initializeSampleTabs() {
        const sampleTabs = samplePage ? samplePage.querySelector('.sample-tabs') : null;
        if (sampleTabs) {
             console.log("Инициализация вкладок примера...");
            const tabButtons = sampleTabs.querySelectorAll('.tab-button');
            const tabPanes = sampleTabs.querySelectorAll('.tab-pane');

             if (tabButtons.length === 0 || tabPanes.length === 0) {
                 console.warn("Вкладки или панели вкладок примера не найдены.");
                 return;
             }

             // Удаляем старые обработчики перед добавлением новых
             // Клонирование и замена узла - надежный способ удалить все обработчики
            tabButtons.forEach(button => {
                 const newButton = button.cloneNode(true);
                 if (button.parentNode) {
                     button.parentNode.replaceChild(newButton, button);
                 } else {
                      console.warn("Родитель кнопки вкладки не найден, невозможно заменить узел.");
                 }
            });

            // Получаем обновленные ссылки на кнопки после клонирования
            const updatedTabButtons = sampleTabs.querySelectorAll('.tab-button');

            // Добавляем новые обработчики кликов
            updatedTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');
                     console.log(`Клик по кнопке вкладки: ${targetTab}`);

                    // Удаляем активный класс у всех кнопок и панелей
                    updatedTabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));

                    // Добавляем активный класс кликнутой кнопке
                    button.classList.add('active');
                    // Находим и активируем соответствующую панель
                    const activePane = sampleTabs.querySelector(`#${targetTab}-content`);
                    if (activePane) {
                        activePane.classList.add('active');
                        console.log(`Панель активирована: ${targetTab}-content`);
                    } else {
                         console.warn(`Целевая панель вкладки не найдена: ${targetTab}-content`);
                    }
                });
            });

            // Активируем первую вкладку по умолчанию, если ни одна не активна
            let anyActive = false;
            updatedTabButtons.forEach(btn => {
                if (btn.classList.contains('active')) {
                    anyActive = true;
                }
            });

            if (!anyActive && updatedTabButtons.length > 0 && tabPanes.length > 0) {
                updatedTabButtons[0].classList.add('active');
                const initialTargetTab = updatedTabButtons[0].getAttribute('data-tab');
                const initialActivePane = sampleTabs.querySelector(`#${initialTargetTab}-content`);
                if(initialActivePane) {
                    initialActivePane.classList.add('active');
                     console.log(`Ни одна вкладка не активна, по умолчанию активирована первая: ${initialTargetTab}`);
                } else {
                     console.warn(`Не удалось найти панель для первой вкладки: ${initialTargetTab}-content`);
                }
            } else if (anyActive) {
                 const activeBtn = sampleTabs.querySelector('.tab-button.active');
                 if(activeBtn) {
                      const targetTab = activeBtn.getAttribute('data-tab');
                      const activePane = sampleTabs.querySelector(`#${targetTab}-content`);
                       if(activePane) {
                            activePane.classList.add('active');
                            console.log(`Сохранена активная вкладка: ${targetTab}`);
                       } else {
                            console.warn(`Активная кнопка вкладки найдена (${targetTab}), но соответствующая панель не найдена.`);
                            activeBtn.classList.remove('active');
                       }
                 }
            }

             console.log("Инициализация вкладок примера завершена.");
        } else {
            console.warn("Контейнер вкладок примера (.sample-tabs) не найден.");
        }
    }

    // --- Добавление обработчиков событий ---

    // Обработчик клика по объединенной кнопке
    sectionToggleButton.addEventListener('click', () => {
        // Проверяем, какая секция сейчас видна, чтобы определить, что делать
        if (mainContent && !mainContent.classList.contains('hidden')) {
            // Если виден основной контент, переключаемся на дизайны
            showDesigns();
        } else if (designShowcase && !designShowcase.classList.contains('hidden')) {
            // Если видны дизайны, переключаемся на основной контент
            showMainContent();
        }
    });
     console.log("Обработчик клика для объединенной кнопки переключения секций добавлен.");


    // Переключение тем-примеров (Aero, Gaming, Modern, Neumorphism)
    if (baseThemeSwitches.length > 0) {
        baseThemeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                currentBaseTheme = button.getAttribute('data-base-theme');
                console.log("Клик по кнопке базовой темы:", currentBaseTheme);
                applyCurrentTheme(); // Применяем текущий стиль и режим
            });
        });
        console.log("Обработчики кликов для кнопок базовых тем добавлены.");
    } else {
         console.warn("Кнопки выбора базового стиля не найдены.");
    }

    // Переключатель "Светлая/Тёмная" (только для sample-page)
    if (modeSwitchCheckbox) {
        modeSwitchCheckbox.addEventListener('change', applyCurrentTheme);
        console.log("Обработчик изменения для чекбокса режима добавлен.");
    } else {
         console.warn("Чекбокс переключателя режима не найден.");
    }


    // --- Логика при загрузке страницы ---
    console.log("Проверка начального состояния страницы...");
    // Определяем, какая секция должна быть видна при загрузке
    if (mainContent && designShowcase && sectionToggleButton) {
        if (!mainContent.classList.contains('hidden')) {
             // Виден основной контент
             console.log("Начальное состояние: основной контент видима.");
             designShowcase.classList.add('hidden'); // Убедимся, что дизайны скрыты
             mainContent.style.opacity = 1;
             designShowcase.style.opacity = 0;
             sectionToggleButton.textContent = 'Показать Примеры Дизайнов'; // Устанавливаем текст кнопки
             console.log("Начальное состояние кнопки: 'Показать Примеры Дизайнов'.");

        } else if (!designShowcase.classList.contains('hidden')) {
             // Видны дизайны
              console.log("Начальное состояние: секция дизайнов видима.");
              mainContent.classList.add('hidden'); // Убедимся, что основной контент скрыт
             designShowcase.style.opacity = 1;
             mainContent.style.opacity = 0;
             sectionToggleButton.textContent = 'Вернуться к Портфолио'; // Устанавливаем текст кнопки
             console.log("Начальное состояние кнопки: 'Вернуться к Портфолио'.");

             // Если дизайны видны при загрузке, применяем активную тему/режим и инициализируем вкладки
             const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
             if (activeBaseThemeButton) {
                 currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
                 console.log("Начальное состояние: найдена активная базовая тема для видимых дизайнов:", currentBaseTheme);
             } else if (baseThemeSwitches.length > 0) {
                  currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
                  baseThemeSwitches[0].classList.add('active');
                  console.log("Начальное состояние: активная тема не найдена, по умолчанию выбрана первая для видимых дизайнов:", currentBaseTheme);
             } else {
                 currentBaseTheme = 'aero';
                 console.warn("Начальное состояние: кнопки базовых тем не найдены, по умолчанию выбрана 'aero' для видимых дизайнов.");
             }

             // Режим читается из чекбокса. applyCurrentTheme все настроит.
             applyCurrentTheme();
             console.log("Начальное состояние: тема и вкладки инициализированы для видимой секции дизайнов.");


        } else {
            // Если обе секции скрыты (неожиданно), показываем основной контент по умолчанию
             console.log("Начальное состояние: обе секции скрыты. Показываем основной контент.");
             if (mainContent) {
                mainContent.classList.remove('hidden');
                mainContent.style.opacity = 1;
             }
             if (designShowcase) {
                designShowcase.classList.add('hidden');
                designShowcase.style.opacity = 0;
             }
             sectionToggleButton.textContent = 'Показать Примеры Дизайнов';
             console.log("Начальное состояние кнопки: 'Показать Примеры Дизайнов' (fallback).");

             // Инициализируем вкладки, даже если designShowcase скрыт
              if (samplePage) initializeSampleTabs(); // Вкладки могут быть в DOM, даже если секция скрыта
               console.log("Начальное состояние: инициализация вкладок (fallback).");

        }
    } else {
         console.error("Не найдены все необходимые основные элементы DOM при загрузке!");
         // Если samplePage не найден, initializeSampleTabs уже выведет предупреждение
         if (samplePage) initializeSampleTabs(); // Попытка инициализации вкладок даже при ошибке
    }


    // При загрузке страницы, если секция дизайнов скрыта, явно устанавливается
    // базовый стиль и режим по умолчанию (светлый, чекбокс выключен),
    // а также активируются кнопки и инициализируются вкладки.
    // Этот блок дублирует часть логики из `else` выше, но явно устанавливает состояние для `sample-page`
    // даже если основные контейнеры были скрыты в HTML. Убираем дублирование.
    // Логика начального состояния в блоках `if/else if/else` выше достаточна.


});
