// Ваш JavaScript код здесь

// Пример: Обновление текущего года в футере
document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Вы можете добавить сюда функциональность для модальных окон проектов,
// анимации при прокрутке, валидации формы контактов (если добавите), и т.д.
