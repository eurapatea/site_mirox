
document.addEventListener('DOMContentLoaded', () => {
    // Обработка бургер-меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#nav-menu');
  
    if (burger && nav) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
        // Обновляем aria-expanded для доступности
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
      });
    }
  });



  document.addEventListener('DOMContentLoaded', function() {
    const link = document.querySelector('#address');
    
    // Проверяем, является ли устройство мобильным
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && link) {
        const address = encodeURIComponent(link.dataset.address);
        
        // Формируем правильный URI для системы
        link.href = `geo:0,0?q=${address}`;
        
        // Добавляем обработчик клика для проверки
        link.addEventListener('click', function(e) {
            // Формируем все возможные варианты ссылок
            const geoUri = `geo:0,0?q=${address}`;
            const googleMaps = `https://www.google.com/maps/search/?api=1&query=${address}`;
            const yandexMaps = `https://yandex.ru/maps/?ll=&z=&text=${address}`;
            
            // Пытаемся открыть через системный диалог
            window.location.href = geoUri;
            
        });
    }
    else
    {
        link.addEventListener('click', function(e) {
            // Пытаемся открыть через системный диалог
            window.location.href = "https://yandex.ru/maps/-/CHfNIDyu";
        });
    }
});