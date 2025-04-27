// Ваш JavaScript код здесь

// Пример: Обновление текущего года в футере
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOMContentLoaded fired"); // Лог для отладки

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
    const modeSwitches = document.querySelectorAll('.mode-switch');         // Кнопки выбора режима
    const samplePage = document.getElementById('sample-page');

    // Переменные для хранения текущего выбранного стиля и режима
    let currentBaseTheme = 'aero'; // Стиль по умолчанию
    let currentMode = 'light';     // Режим по умолчанию

    // Функция для применения текущего выбранного стиля и режима к примеру страницы
    function applyCurrentTheme() {
        console.log(`Applying theme: ${currentBaseTheme}, mode: ${currentMode}`); // Лог

        // Удаляем все классы тем и режимов у примера страницы
        samplePage.className = 'sample-page';

        // Добавляем класс базового стиля
        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        }

        // Добавляем класс режима (только если это не режим по умолчанию 'light')
        if (currentMode && currentMode !== 'light') {
             samplePage.classList.add('mode-' + currentMode);
        }

        // Обновляем активные состояния кнопок управления
        baseThemeSwitches.forEach(button => {
            if (button.getAttribute('data-base-theme') === currentBaseTheme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        modeSwitches.forEach(button => {
            if (button.getAttribute('data-mode') === currentMode) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // После смены темы/режима, переинициализируем вкладки для нового стиля
        initializeSampleTabs();
    }


    // Функция для показа секции дизайнов
    function showDesigns() {
        console.log("showDesigns function called"); // Лог

        // Скрываем кнопку "Показать Дизайны", показываем кнопку "Вернуться"
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
        }

        // Перед показом секции, применяем текущий выбранный стиль и режим
        // Убедимся, что тема по умолчанию выбрана, если нет активных кнопок
        const activeBaseThemeButton = document.querySelector('.base-theme-switch.active');
         if (activeBaseThemeButton) {
              currentBaseTheme = activeBaseThemeButton.getAttribute('data-base-theme');
         } else if (baseThemeSwitches.length > 0) {
             // Если нет активных, выберем первую как активную по умолчанию
             currentBaseTheme = baseThemeSwitches[0].getAttribute('data-base-theme');
         } else {
             currentBaseTheme = 'aero'; // Fallback
         }

         const activeModeButton = document.querySelector('.mode-switch.active');
         if (activeModeButton) {
             currentMode = activeModeButton.getAttribute('data-mode');
         } else if (modeSwitches.length > 0) {
             currentMode = modeSwitches[0].getAttribute('data-mode');
         } else {
             currentMode = 'light'; // Fallback
         }

        applyCurrentTheme(); // Применяем текущий стиль и режим


        // Используем opacity и затем display none после перехода
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
        console.log("showMainContent function called"); // Лог

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
            mainContent.style.opacity = 1; // Показываем с плавным переходом
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручиваем вверх
        }, 500); // Время должно совпадать с transition opacity в CSS
    }


    // --- Логика для вкладок внутри примера страницы ---
    function initializeSampleTabs() {
        const sampleTabs = samplePage.querySelector('.sample-tabs');
        if (sampleTabs) {
            const tabButtons = sampleTabs.querySelectorAll('.tab-button');
            const tabPanes = sampleTabs.querySelectorAll('.tab-pane');

            // Удаляем все предыдущие обработчики
            tabButtons.forEach(button => {
                 const newButton = button.cloneNode(true);
                 button.parentNode.replaceChild(newButton, button);
            });

            // Получаем обновленные ссылки на кнопки
            const updatedTabButtons = samplePage.querySelectorAll('.sample-tabs .tab-button');

            updatedTabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.getAttribute('data-tab');

                    // Удаляем активный класс у всех кнопок и панелей
                    updatedTabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanes.forEach(pane => pane.classList.remove('active'));

                    // Добавляем активный класс кликнутой кнопке и целевой панели
                    button.classList.add('active');
                    const activePane = document.getElementById(targetTab + '-content');
                    if (activePane) {
                        activePane.classList.add('active');
                    }
                });
            });

            // Активируем первую вкладку по умолчанию при инициализации
            if (updatedTabButtons.length > 0 && tabPanes.length > 0) {
                 // Проверяем, есть ли уже активная вкладка (например, если сменили тему, находясь на 2 вкладке)
                 const activeTabButton = sampleTabs.querySelector('.tab-button.active');
                 if (activeTabButton) {
                      const targetTab = activeTabButton.getAttribute('data-tab');
                      const activePane = document.getElementById(targetTab + '-content');
                      if (activePane) {
                           activePane.classList.add('active');
                      }
                 } else {
                    // Если активной вкладки нет, активируем первую
                    updatedTabButtons[0].classList.add('active');
                    tabPanes[0].classList.add('active');
                 }
            }
        }
    }

    // --- Логика для виджета калькулятора ---
    const calculatorToggle = document.getElementById('calculator-toggle');
    const calculatorWidget = document.getElementById('calculator-widget');
    const calculatorCloseButton = calculatorWidget ? calculatorWidget.querySelector('.close-button') : null;
    const calculatorDisplay = calculatorWidget ? calculatorWidget.querySelector('.calculator-display') : null;
    const calculatorButtons = calculatorWidget ? calculatorWidget.querySelectorAll('.calculator-buttons .btn') : null;

    let currentInput = '0';
    let operator = null;
    let firstOperand = null;
    let waitingForSecondOperand = false;

    // Обновление дисплея калькулятора
    function updateDisplay() {
        if (calculatorDisplay) {
            calculatorDisplay.textContent = currentInput;
        }
    }

    // Обработка ввода числа
    function inputDigit(digit) {
        if (waitingForSecondOperand === true) {
            currentInput = digit;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
        updateDisplay();
    }

     // Обработка ввода десятичной точки
    function inputDecimal(dot) {
         // Если в текущем вводе уже есть точка, ничего не делаем
         if (currentInput.includes(dot)) {
             return;
         }
         // Если ждем второй операнд, начинаем новый ввод с "0."
         if (waitingForSecondOperand === true) {
             currentInput = "0.";
             waitingForSecondOperand = false;
             updateDisplay();
             return;
         }

         currentInput += dot;
         updateDisplay();
     }


    // Обработка операторов
    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
        updateDisplay(); // Обновим дисплей после выбора оператора
    }

    // Выполнение вычисления
    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '=': (firstOperand, secondOperand) => secondOperand // При нажатии равно, просто используем второй операнд если нет оператора
                                                           // или результат последней операции
    };

    // Обработка нажатия кнопки равно
    function handleEquals() {
         if (operator && !waitingForSecondOperand) {
              const inputValue = parseFloat(currentInput);
              const result = performCalculation[operator](firstOperand, inputValue);

              currentInput = String(result);
              firstOperand = null; // Сбрасываем для новой цепочки вычислений
              operator = null;
              waitingForSecondOperand = true; // Ждем новый ввод

              updateDisplay();
         } else if (!operator && firstOperand !== null) {
             // Если нет оператора, но есть первый операнд (например, после предыдущего "=")
             // Просто показываем текущий ввод как результат
             waitingForSecondOperand = true;
             updateDisplay();
         }
          // Если нет ни оператора, ни первого операнда, ничего не делаем
    }


    // Сброс калькулятора
    function resetCalculator() {
        currentInput = '0';
        operator = null;
        firstOperand = null;
        waitingForSecondOperand = false;
        updateDisplay();
    }


    // Обработчики кликов для кнопок переключения стилей
    if (baseThemeSwitches.length > 0 && samplePage) {
        baseThemeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                currentBaseTheme = button.getAttribute('data-base-theme');
                applyCurrentTheme(); // Применяем текущий стиль и режим
            });
        });
    } else {
         console.warn("Кнопки выбора базового стиля не найдены.");
    }

    // Обработчики кликов для кнопок переключения режимов (светлая/темная)
    if (modeSwitches.length > 0 && samplePage) {
        modeSwitches.forEach(button => {
            button.addEventListener('click', () => {
                currentMode = button.getAttribute('data-mode');
                applyCurrentTheme(); // Применяем текущий стиль и режим
            });
        });
    } else {
         console.warn("Кнопки выбора режима (светлая/темная) не найдены.");
    }


    // Обработчик клика для плавающей кнопки калькулятора
    if (calculatorToggle && calculatorWidget) {
        calculatorToggle.addEventListener('click', () => {
            // Переключаем видимость виджета
            calculatorWidget.classList.toggle('visible');
            // Если виджет становится видимым, убедимся, что дисплей сброшен
            if (calculatorWidget.classList.contains('visible')) {
                 resetCalculator();
            }
        });
    } else {
         console.warn("Кнопка или виджет калькулятора не найдены.");
    }

     // Обработчик клика для кнопки закрытия виджета калькулятора
    if (calculatorCloseButton && calculatorWidget) {
         calculatorCloseButton.addEventListener('click', () => {
             calculatorWidget.classList.remove('visible');
         });
    }

     // Обработчики кликов для кнопок калькулятора
    if (calculatorButtons && calculatorDisplay) {
         calculatorButtons.forEach(button => {
              button.addEventListener('click', (event) => {
                   const { target } = event;
                   const value = target.getAttribute('data-value');

                   if (!target.matches('button')) {
                       return; // Игнорируем клики не по кнопкам
                   }

                   if (target.classList.contains('operator')) {
                       if (value === '=') {
                            handleEquals();
                       } else {
                           handleOperator(value);
                       }
                       return;
                   }

                    if (target.classList.contains('decimal')) {
                       inputDecimal(value);
                       return;
                   }

                    if (target.classList.contains('clear')) {
                       resetCalculator();
                       return;
                   }

                   // По умолчанию обрабатываем числа
                   inputDigit(value);
              });
         });
    } else {
         console.warn("Кнопки калькулятора или дисплей не найдены.");
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

             // Если дизайны видны при загрузке, активируем первую тему и светлый режим
             const firstBaseThemeButton = document.querySelector('.base-theme-switch');
             if (firstBaseThemeButton) {
                 currentBaseTheme = firstBaseThemeButton.getAttribute('data-base-theme');
                 // Найдем активную кнопку режима, если есть, иначе используем light
                 const activeModeButton = document.querySelector('.mode-switch.active');
                 currentMode = activeModeButton ? activeModeButton.getAttribute('data-mode') : 'light';

                 applyCurrentTheme(); // Применяем текущий стиль и режим
             } else {
                 // Если нет кнопок тем, просто инициализируем вкладки
                 initializeSampleTabs();
             }

        } else {
            // Обе секции скрыты (неожиданно, но на всякий случай)
             toggleDesignsButton.classList.remove('hidden');
             toggleMainHeaderButton.classList.add('hidden');
             mainContent.style.opacity = 1;
             designShowcase.style.opacity = 0;
             // Инициализируем вкладки в базовом состоянии
             initializeSampleTabs();
        }
    } else {
        console.error("Не найдены все необходимые элементы DOM для переключения секций!");
    }

     // При загрузке страницы убедимся, что виджет калькулятора скрыт
    if (calculatorWidget) {
         calculatorWidget.classList.remove('visible');
         // Инициализируем калькулятор в начальное состояние
         resetCalculator();
    }

    // Изначально применяем стиль по умолчанию (Aero Light), если секция дизайнов скрыта
    // Это нужно, чтобы initializeSampleTabs корректно сработала для базового состояния
    if (designShowcase.classList.contains('hidden')) {
        samplePage.className = 'sample-page'; // Убедимся, что базовый стиль применен
        // Активируем первую кнопку стиля и светлого режима при загрузке, если секция скрыта
         const firstBaseThemeButton = document.querySelector('.base-theme-switch');
         const firstModeButton = document.querySelector('.mode-switch');
         if(firstBaseThemeButton) firstBaseThemeButton.classList.add('active');
         if(firstModeButton) firstModeButton.classList.add('active');
         initializeSampleTabs(); // Инициализируем вкладки
    }


});
