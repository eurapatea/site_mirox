document.addEventListener('DOMContentLoaded', () => {
    console.log('modal.js loaded'); // Проверяем, загружается ли скрипт

    // Инициализация EmailJS
    emailjs.init("YOUR_USER_ID"); // Замените YOUR_USER_ID на ваш User ID из EmailJS

    // Элементы модального окна
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close-btn');
    const openModalButton = document.querySelector('.digital-service');
    const modalForm = document.getElementById('modalForm');
    const modalConsentCheckbox = document.getElementById('policyAgree');
    const modalSubmitBtn = modalForm.querySelector('.submit-btn');

    // Проверка, что все элементы найдены
    if (modal && closeBtn && openModalButton) {
        // Открытие модального окна
        openModalButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Кнопка "Цифровые сервисы" нажата');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку фона
        });

        // Закрытие модального окна через крестик
        closeBtn.addEventListener('click', () => {
            console.log('Закрытие модального окна через крестик');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Включаем прокрутку фона
            // Сбрасываем форму
            modalForm.style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
            modalForm.reset();
            modalConsentCheckbox.checked = false;
            modalSubmitBtn.disabled = true;
        });

        // Закрытие модального окна при клике вне окна
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('Закрытие модального окна при клике вне окна');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                modalForm.style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
                modalForm.reset();
                modalConsentCheckbox.checked = false;
                modalSubmitBtn.disabled = true;
            }
        });

        // Управление состоянием кнопки отправки (активна только при согласии)
        if (modalConsentCheckbox && modalSubmitBtn) {
            modalConsentCheckbox.addEventListener('change', () => {
                modalSubmitBtn.disabled = !modalConsentCheckbox.checked;
            });
        }

        // Обработка отправки формы
        if (modalForm) {
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = modalForm.querySelector('#name').value.trim();
                const phone = modalForm.querySelector('#phone').value.trim();
                const message = modalForm.querySelector('#message').value.trim();
                const consent = modalConsentCheckbox.checked;

                // Валидация на клиенте
                if (!name || !phone || !message || !consent) {
                    alert('Пожалуйста, заполните все поля и дайте согласие на обработку данных.');
                    return;
                }

                // Отправка через EmailJS
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    name: name,
                    phone: phone,
                    message: message
                }).then(
                    (response) => {
                        console.log('SUCCESS!', response.status, response.text);
                        modalForm.style.display = 'none';
                        document.getElementById('successMessage').style.display = 'block';
                    },
                    (error) => {
                        console.log('FAILED...', error);
                        alert('Ошибка отправки формы. Пожалуйста, попробуйте позже.');
                    }
                );
            });
        }
    } else {
        console.error('Модальное окно, кнопка открытия или закрытия не найдены!');
    }
});