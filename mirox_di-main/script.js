document.addEventListener('DOMContentLoaded', () => {
   

    // Плавная прокрутка для ссылок
    const contactLink = document.querySelector('nav a[href="#contacts"]');
    const servicesLink = document.querySelector('nav a[href="#services"]');

    if (contactLink) {
        contactLink.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (servicesLink) {
        servicesLink.addEventListener('click', e => {
            e.preventDefault();
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Перенаправление для кнопки "О КОМПАНИИ"
    const companyBtn = document.querySelector('.company-btn');
    if (companyBtn) {
        companyBtn.addEventListener('click', () => {
            window.location.href = 'company.html';
        });
    }

    // Эффекты при прокрутке для hero
    const videoContainer = document.querySelector('.video-container');
    const experienceCard = document.querySelector('.experience-card');
    const windowHeight = window.innerHeight;

    if (videoContainer && experienceCard) {
        window.addEventListener('scroll', () => {
            const rect = videoContainer.getBoundingClientRect();

            if (rect.top <= windowHeight && rect.bottom >= 0) {
                const scrollProgress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height)));

                // Изменение прозрачности шторки
                const overlayOpacity = 1 - scrollProgress;
                videoContainer.style.setProperty('--overlay-opacity', overlayOpacity);

                // Изменение фона experience-card
                experienceCard.style.background = scrollProgress > 0.5 ? 'transparent' : '#000';
            }
        });
    }

    // Анимация текста "МИРОКС-ДИ"
    const headings = document.querySelectorAll('.heading');
    let firstRun = true;

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;

        headings.forEach((heading, index) => {
            heading.style.top = `${scrollValue * 0.01 * index}vw`;
            if (firstRun) {
                heading.style.transform = `translateY(0px)`;
                firstRun = false;
            }
        });
    });

    setTimeout(() => {
        headings.forEach((heading, index) => {
            heading.style.transform = `translateY(${index * 8}px)`;
        });
    }, 500);

    // Слайдер в experience-card
    const dots = document.querySelectorAll('.slider .dot');
    const slideContent = document.querySelector('.experience-card .slide-content');
    const arrows = document.querySelector('.experience-card .arrows span');

    // Контент для слайдов
    const slides = [
        {
            title: '12+ ЛЕТ',
            text: 'НА РЫНКЕ ЖЕЛЕЗНОДОРОЖНЫХ<br>КОМПЛЕКТУЮЩИХ С 2013 ГОДА' 
        },
        {
            title: '400К+',
            text: 'ДЕТАЛЕЙ ПОСТАВЛЕНО<br>ДЛЯ РЕМОНТНЫХ РАБОТ'
        },
        {
            title: '14',
            text: 'Ж/Д НАПРАВЛЕНИЙ<br>ДЛЯ ДОСТАВКИ ПО ВСЕЙ РОССИИ'
        },
        {
            title: 'ГОСТ/ТУ',
            text: 'СООТВЕТСТВИЕ ВСЕХ<br>ИЗДЕЛИЙ СТАНДАРТАМ'
        },
        {
            title: '1 000+',
            text: 'ЕДИНИЦ ТЕХНИКИ<br>В АРЕНДНОМ ПАРКЕ'
        }
    ];
    
    

    let currentSlide = 0;

    // Функция обновления слайда
    function updateSlide(index) {
        slideContent.classList.add('hidden');
        setTimeout(() => {
            slideContent.innerHTML = `
                <h2>${slides[index].title}</h2>
                <p>${slides[index].text}</p>
            `;
            slideContent.classList.remove('hidden');
        }, 500);

        dots.forEach(dot => dot.classList.remove('active-dot'));
        dots[index].classList.add('active-dot');

        arrows.textContent = `${index + 1}/${slides.length}`;
        currentSlide = index;
    }

    // Обработчики кликов по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            if (slideIndex !== currentSlide) {
                updateSlide(slideIndex);
            }
        });
    });

    // Автопереключение слайдов каждые 5 секунд
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }, 5000);

    // Инициализация первого слайда
    updateSlide(0);
});

