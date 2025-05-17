document.addEventListener('DOMContentLoaded', () => {
    // Получаем текущий год для футера
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Получаем ссылки на элементы DOM ---
    const toggleDesignsButton = document.getElementById('toggle-designs');
    const toggleMainHeaderButton = document.getElementById('toggle-main-header');
    const mainContent = document.getElementById('main-content');
    const designShowcase = document.getElementById('design-showcase');
    const baseThemeSwitches = document.querySelectorAll('.base-theme-switch'); // Кнопки выбора стиля
    const modeSwitchCheckbox = document.getElementById('sample-switch'); // Чекбокс переключателя режима
    const samplePage = document.getElementById('sample-page');
    const themeLabel = document.querySelector('.theme-label'); // Лейбл для текста "Светлая/Тёмная"

    // Переменная для хранения текущего выбранного стиля
    let currentBaseTheme = 'aero'; // Стиль по умолчанию

    // Проверяем наличие основных элементов
    if (!toggleDesignsButton || !toggleMainHeaderButton || !mainContent || !designShowcase || !samplePage) {
        console.error("Одна или несколько основных секций или кнопок не найдены!");
        // Можно добавить вывод ошибки на страницу или полностью остановить выполнение скрипта,
        // если эти элементы критичны для работы.
        return; // Останавливаем выполнение скрипта, если нет основных элементов
    }

    // Функция для применения текущего выбранного стиля и режима к примеру страницы
    function applyCurrentTheme() {
        // Определяем текущий режим по состоянию чекбокса
        const currentMode = modeSwitchCheckbox && modeSwitchCheckbox.checked ? 'dark' : 'light';

        console.log(`Применяется тема: ${currentBaseTheme}, режим: ${currentMode}`); // Лог применения темы

        // Сбрасываем все классы тем и режимов у примера страницы, кроме базового 'sample-page'
        // Это важно, чтобы стили предыдущей темы не "залипали"
        samplePage.className = 'sample-page';

        // Добавляем класс базового стиля
        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        } else {
            // Если вдруг active кнопка не найдена или default, применяем стиль 'aero'
            samplePage.classList.add('theme-aero');
            currentBaseTheme = 'aero'; // Обновляем переменную
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

        // Скрываем кнопку "Показать Дизайны", показываем кнопку "Вернуться"
        toggleDesignsButton.classList.add('hidden');
        toggleMainHeaderButton.classList.remove('hidden');
        console.log("Видимость кнопок хедера переключена.");

        // Перед показом секции, применяем текущий выбранный стиль и режим
        // Убедимся, что тема по умолчанию выбрана, если нет активных кнопок
        const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
         if (activeBaseThemeButton) {
              currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
              console.log("Найдена активная базовая тема при переходе:", currentBaseTheme);
         } else if (baseThemeSwitches.length > 0) {
             // Если нет активных, выберем первую как активную по умолчанию
             currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
             baseThemeSwitches[0].classList.add('active'); // Активируем первую кнопку
             console.log("Активная базовая тема не найдена, по умолчанию выбрана первая:", currentBaseTheme);
         } else {
             currentBaseTheme = 'aero'; // Fallback
             console.log("Кнопки базовых тем не найдены, по умолчанию выбрана 'aero'.");
             const aeroButton = document.querySelector('.base-theme-switch[data-base-theme="aero"]');
             if(aeroButton) aeroButton.classList.add('active'); // Активируем кнопку 'aero' если она есть
         }

        // Режим определяется состоянием чекбокса, applyCurrentTheme это прочитает

        applyCurrentTheme(); // Применяем текущий стиль и режим
        console.log("applyCurrentTheme() вызвана из showDesigns.");


        // Используем opacity и затем display none после перехода
        mainContent.style.opacity = 0;
        console.log("opacity mainContent установлено в 0.");

        setTimeout(() => {
            console.log("Callback setTimeout executed.");
            mainContent.classList.add('hidden'); // Скрываем основной контент
            console.log("mainContent: добавлен класс hidden.");
            designShowcase.classList.remove('hidden'); // Показываем секцию дизайнов
            console.log("designShowcase: удален класс hidden.");
            // Даем небольшой таймаут перед установкой opacity 1, чтобы display: none успел примениться
            setTimeout(() => {
                 designShowcase.style.opacity = 1; // Показываем с плавным переходом
                 console.log("opacity designShowcase установлено в 1.");
            }, 50); // Небольшая задержка

            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
            console.log("Прокрутка вверх.");

        }, 500); // Время должно совпадать с transition opacity в CSS
         console.log("setTimeout запланирован.");
    }

    // Функция для показа основного контента
    function showMainContent() {
        console.log("showMainContent() вызвана");

         // Скрываем кнопку "Вернуться", показываем кнопку "Показать Дизайны"
        toggleMainHeaderButton.classList.add('hidden');
        toggleDesignsButton.classList.remove('hidden');
        console.log("Видимость кнопок хедера переключена.");

        // Используем opacity и затем display none после перехода
        designShowcase.style.opacity = 0;
        console.log("opacity designShowcase установлено в 0.");

        setTimeout(() => {
             console.log("Callback setTimeout executed (showMainContent).");
            designShowcase.classList.add('hidden'); // Скрываем секцию дизайнов
            console.log("designShowcase: добавлен класс hidden.");
            mainContent.classList.remove('hidden'); // Показываем основной контент
            console.log("mainContent: удален класс hidden.");
             // Даем небольшой таймаут перед установкой opacity 1
            setTimeout(() => {
                 mainContent.style.opacity = 1; // Показываем с плавным переходом
                 console.log("opacity mainContent установлено в 1.");
            }, 50); // Небольшая задержка

            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
            console.log("Прокрутка вверх.");

        }, 500); // Время должно совпадать с transition opacity в CSS
         console.log("setTimeout запланирован (showMainContent).");
    }

    // --- Логика для вкладок внутри примера страницы ---
    function initializeSampleTabs() {
        const sampleTabs = samplePage ? samplePage.querySelector('.sample-tabs') : null; // Проверяем, что samplePage существует
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
                    const activePane = sampleTabs.querySelector(`#${targetTab}-content`); // Ищем внутри sampleTabs
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
            // Проверяем, есть ли уже активная вкладка при инициализации
            updatedTabButtons.forEach(btn => {
                if (btn.classList.contains('active')) {
                    anyActive = true;
                }
            });

            // Если ни одна вкладка не активна (например, при первой загрузке), активируем первую
            if (!anyActive && updatedTabButtons.length > 0 && tabPanes.length > 0) {
                updatedTabButtons[0].classList.add('active');
                 // Активируем соответствующую панель
                const initialTargetTab = updatedTabButtons[0].getAttribute('data-tab');
                const initialActivePane = sampleTabs.querySelector(`#${initialTargetTab}-content`);
                if(initialActivePane) {
                    initialActivePane.classList.add('active');
                     console.log(`Ни одна вкладка не активна, по умолчанию активирована первая: ${initialTargetTab}`);
                } else {
                     console.warn(`Не удалось найти панель для первой вкладки: ${initialTargetTab}-content`);
                }
            } else if (anyActive) {
                 // Если активная вкладка уже была, просто убедимся, что ее панель тоже активна
                 const activeBtn = sampleTabs.querySelector('.tab-button.active');
                 if(activeBtn) {
                      const targetTab = activeBtn.getAttribute('data-tab');
                      const activePane = sampleTabs.querySelector(`#${targetTab}-content`);
                       if(activePane) {
                            activePane.classList.add('active');
                            console.log(`Сохранена активная вкладка: ${targetTab}`);
                       } else {
                            console.warn(`Активная кнопка вкладки найдена (${targetTab}), но соответствующая панель не найдена.`);
                            // Опционально: сбросить активный класс с кнопки, если панель не найдена
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

    // Кнопки показа/скрытия секций
    toggleDesignsButton.addEventListener('click', showDesigns);
    toggleMainHeaderButton.addEventListener('click', showMainContent);

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
    // Если #design-showcase не имеет класса 'hidden', показываем ее
    if (designShowcase && !designShowcase.classList.contains('hidden')) {
         console.log("Начальное состояние: секция дизайнов видима.");
         // Убедимся, что основной контент скрыт и opacity настроено
         if (mainContent) {
              mainContent.classList.add('hidden');
              mainContent.style.opacity = 0;
         }
         // Убедимся, что секция дизайнов видима и opacity настроено
         designShowcase.style.opacity = 1;

         // Убедимся, что кнопки в хедере соответствуют видимому состоянию
         if (toggleDesignsButton) toggleDesignsButton.classList.add('hidden');
         if (toggleMainHeaderButton) toggleMainHeaderButton.classList.remove('hidden');

         // Применяем активную тему/режим и инициализируем вкладки для видимой секции дизайнов
         // Находим активную кнопку темы или выбираем первую по умолчанию
         const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
         if (activeBaseThemeButton) {
             currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
             console.log("Начальное состояние: найдена активная базовая тема:", currentBaseTheme);
         } else if (baseThemeSwitches.length > 0) {
              currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
              baseThemeSwitches[0].classList.add('active');
              console.log("Начальное состояние: активная тема не найдена, по умолчанию выбрана первая:", currentBaseTheme);
         } else {
             currentBaseTheme = 'aero';
             console.warn("Начальное состояние: кнопки базовых тем не найдены, по умолчанию выбрана 'aero'.");
         }

         // Режим читается из чекбокса. applyCurrentTheme все настроит.
         applyCurrentTheme();
         console.log("Начальное состояние: тема и вкладки инициализированы для видимой секции дизайнов.");

    } else {
        // По умолчанию или если #design-showcase скрыт, показываем основной контент
        console.log("Начальное состояние: основной контент видимый (по умолчанию или скрыт design-showcase).");
         if (mainContent) {
             mainContent.classList.remove('hidden');
             mainContent.style.opacity = 1;
         }
         if (designShowcase) {
             designShowcase.classList.add('hidden');
             designShowcase.style.opacity = 0;
         }

         // Убедимся, что кнопки в хедере соответствуют видимому состоянию
         if (toggleDesignsButton) toggleDesignsButton.classList.remove('hidden');
         if (toggleMainHeaderButton) toggleMainHeaderButton.classList.add('hidden');

         // При загрузке страницы, если секция дизайнов скрыта, явно устанавливается
         // базовый стиль и режим по умолчанию (светлый, чекбокс выключен),
         // а также активируются кнопки и инициализируются вкладки.
        console.log("Секция дизайнов скрыта при загрузке, установка состояния по умолчанию.");
        if (samplePage) {
            samplePage.className = 'sample-page'; // Сброс классов

            // Активируем первую кнопку стиля при загрузке
            const firstBaseThemeButton = document.querySelector('.base-theme-switch');
            if(firstBaseThemeButton) {
                 firstBaseThemeButton.classList.add('active');
                 currentBaseTheme = firstBaseThemeButton.getAttribute('data-base-theme');
                 console.log("Начальное состояние: активирована первая кнопка темы:", currentBaseTheme);
            } else {
                 currentBaseTheme = 'aero'; // Fallback
                 console.warn("Начальное состояние: кнопки базовых тем не найдены, установка currentBaseTheme в 'aero'.");
            }


            // Убедимся, что чекбокс режима выключен для светлого режима по умолчанию
             if (modeSwitchCheckbox) {
                 modeSwitchCheckbox.checked = false;
                 if (themeLabel) themeLabel.textContent = 'Светлая'; // Устанавливаем текст лейбла
                 console.log("Начальное состояние: чекбокс режима выключен, лейбл 'Светлая'.");
             } else {
                 if (themeLabel) themeLabel.textContent = 'Светлая'; // Устанавливаем текст лейбла даже если чекбокс не найден
                  console.warn("Начальное состояние: чекбокс режима не найден.");
             }


            initializeSampleTabs(); // Инициализируем вкладки даже без полной applyCurrentTheme
            console.log("Начальное состояние: инициализация вкладок завершена.");
        } else {
             console.error("Элемент #sample-page не найден при инициализации!");
             // В этом случае initializeSampleTabs уже вывела предупреждение
        }
    }

    // Финальный вызов applyCurrentTheme для синхронизации состояния при первой загрузке,
    // если секция дизайнов уже была видна.
    // Если designShowcase был скрыт, состояние уже настроено в блоке else выше.
    // Если он был виден, applyCurrentTheme уже вызывалась в блоке if выше.
    // Поэтому этот финальный вызов, возможно, не нужен, но не повредит.
    // applyCurrentTheme(); // Закомментируем, чтобы избежать двойной инициализации при видимой designShowcase


});
