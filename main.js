// Ваш JavaScript код здесь

// Пример: Обновление текущего года в футере
document.addEventListener('DOMContentLoaded', (event) => {
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
        // Удаляем все классы тем и режимов у примера страницы
        samplePage.className = 'sample-page';

        // Добавляем класс базового стиля
        if (currentBaseTheme && currentBaseTheme !== 'default') {
            samplePage.classList.add('theme-' + currentBaseTheme);
        }

        // Добавляем класс режима (только если это не режим по умолчанию, который обрабатывается базовым стилем)
        if (currentMode && currentMode !== 'light') {
             // Для Gaming, основной стиль уже темный, добавим mode-dark только если это нужно для переопределения
             if (!(currentBaseTheme === 'gaming' && currentMode === 'dark')) {
                 samplePage.classList.add('mode-' + currentMode);
             } else if (currentBaseTheme === 'gaming' && currentMode === 'dark') {
                 // Для Gaming Dark явно добавляем mode-dark, даже если базовый стиль уже темный,
                 // чтобы CSS селекторы .theme-gaming.mode-dark работали
                 samplePage.classList.add('mode-' + currentMode);
             }
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
        // Скрываем кнопку "Показать Дизайны", показываем кнопку "Вернуться"
        if (toggleDesignsButton && toggleMainHeaderButton) {
            toggleDesignsButton.classList.add('hidden');
            toggleMainHeaderButton.classList.remove('hidden');
        }

        // Перед показом секции, применяем текущий выбранный стиль и режим
        applyCurrentTheme();

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
                updatedTabButtons[0].classList.add('active');
                tabPanes[0].classList.add('active');
            }
        }
    }

    // --- Логика для виджета погоды ---
    const weatherToggle = document.getElementById('weather-toggle');
    const weatherWidget = document.getElementById('weather-widget');
    const weatherCloseButton = weatherWidget ? weatherWidget.querySelector('.close-button') : null;
    const weatherInfoDiv = weatherWidget ? weatherWidget.querySelector('.weather-info') : null;


    // Функция для получения погоды (используем placeholder)
    function getWeatherData(latitude, longitude) {
        console.log(`Получены координаты: ${latitude}, ${longitude}. Загрузка погоды...`);
        // Здесь нужно интегрировать ваш реальный API погоды (например, OpenWeatherMap)
        // Вам понадобится API ключ.
        // Пример fetch запроса (замените URL и KEY):
        /*
        const API_KEY = 'ВАШ_API_КЛЮЧ';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Данные погоды:", data);
                // Отобразить данные в виджете
                if (weatherInfoDiv) {
                    weatherInfoDiv.innerHTML = `
                        <p>Местоположение: <strong>${data.name}</strong></p>
                        <p>Температура: <strong>${data.main.temp}°C</strong></p>
                        <p>Описание: <strong>${data.weather[0].description}</strong></p>
                        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" id="weather-icon">
                    `;
                }
            })
            .catch(error => {
                console.error("Ошибка при получении погоды:", error);
                if (weatherInfoDiv) {
                     weatherInfoDiv.innerHTML = "<p>Не удалось загрузить данные погоды.</p>";
                }
            });
        */

        // Placeholder: Имитация загрузки
        if (weatherInfoDiv) {
             weatherInfoDiv.innerHTML = `<p>Ваши координаты: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}</p><p>Загрузка данных погоды...</p>`;

             // Через пару секунд покажем фейковые данные
             setTimeout(() => {
                 if (weatherInfoDiv) {
                     weatherInfoDiv.innerHTML = `
                        <p>Местоположение: <strong>Ваш город</strong></p>
                        <p>Температура: <strong>+15°C</strong></p>
                        <p>Описание: <strong>Ясно</strong></p>
                        <img src="http://openweathermap.org/img/wn/01d.png" alt="Ясно" id="weather-icon">
                     `;
                 }
             }, 2000);
        }
    }


    // Функция для получения местоположения пользователя
    function getUserLocation() {
        if (!navigator.geolocation) {
            if (weatherInfoDiv) {
                weatherInfoDiv.innerHTML = "<p>Геолокация не поддерживается вашим браузером.</p>";
            }
            console.error("Геолокация не поддерживается");
            return;
        }

        if (weatherInfoDiv) {
             weatherInfoDiv.innerHTML = "<p>Определение местоположения...</p>";
        }


        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherData(latitude, longitude); // Получаем погоду по координатам
            },
            (error) => {
                let errorMessage = "Не удалось определить местоположение.";
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Доступ к местоположению запрещен пользователем.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Информация о местоположении недоступна.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Истекло время ожидания запроса местоположения.";
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = "Произошла неизвестная ошибка геолокации.";
                        break;
                }
                 if (weatherInfoDiv) {
                     weatherInfoDiv.innerHTML = `<p>${errorMessage}</p>`;
                 }
                console.error("Ошибка геолокации:", errorMessage);
            }
        );
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


    // Обработчик клика для плавающей кнопки погоды
    if (weatherToggle && weatherWidget) {
        weatherToggle.addEventListener('click', () => {
            // Переключаем видимость виджета
            weatherWidget.classList.toggle('visible');
            // Если виджет становится видимым, пытаемся получить погоду
            if (weatherWidget.classList.contains('visible')) {
                 getUserLocation();
            }
        });
    } else {
         console.warn("Кнопка или виджет погоды не найдены.");
    }

     // Обработчик клика для кнопки закрытия виджета погоды
    if (weatherCloseButton && weatherWidget) {
         weatherCloseButton.addEventListener('click', () => {
             weatherWidget.classList.remove('visible');
         });
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
                 currentMode = 'light'; // По умолчанию светлый режим
                 applyCurrentTheme();
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

     // При загрузке страницы убедимся, что виджет погоды скрыт
    if (weatherWidget) {
         weatherWidget.classList.remove('visible');
    }

});
