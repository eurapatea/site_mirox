// Анимация при запуске страницы
document.addEventListener('DOMContentLoaded', () => {
  // Элементы, которые нужно анимировать
  const animatedElements = [
    { selector: '.company-description h1', delay: 100 },
    { selector: '.company-description p:nth-child(2)', delay: 300 },
    { selector: '.company-description p:nth-child(3)', delay: 500 },
    { selector: '.company-principles h2', delay: 700 },
    { selector: '.principle-card:nth-child(1)', delay: 900 },
    { selector: '.principle-card:nth-child(2)', delay: 1100 },
    { selector: '.principle-card:nth-child(3)', delay: 1300 }
  ];

  // Функция для плавного появления
  function fadeInUp(element, delay) {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  // Применяем анимацию к каждому элементу
  animatedElements.forEach(({ selector, delay }) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      fadeInUp(element, delay);
    }
  });

  
});

// Анимация блоков принципов
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.principle-card');
  
  cards.forEach(card => {
    // Сохраняем исходные цвета
    const originalBg = card.style.backgroundColor;
    const originalShadow = card.style.boxShadow;
    
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-7px) scale(1.03)';
      this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      this.style.backgroundColor = '#ffffff';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = originalShadow;
      this.style.backgroundColor = originalBg;
    });
  });
});

// Обработка клика по логотипу
document.querySelector('.logo').addEventListener('click', function() {
  fetch('index.html')
    .then(response => {
      if (response.ok) {
        window.location.href = 'index.html';
      } else {
        console.error('Страница index.html не найдена');
      }
    })
    .catch(error => console.error('Ошибка:', error));
});