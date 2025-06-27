document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.brandLogo img');
    let loadedCount = 0;
    
    const initSlider = () => {
      const track = document.querySelector('.carouselTrack');
      const logos = document.querySelectorAll('.brandLogo');
      const originalSet = Array.from(logos).slice(0, 7);
      
      let totalWidth = 0;
      originalSet.forEach(logo => {
        totalWidth += logo.offsetWidth;
      });
      
      // Устанавливаем ширину трека (2 копии)
      track.style.width = `${totalWidth * 2}px`;
      
      // Настраиваем анимацию
      track.style.animationDuration = `${totalWidth / 100}s`;
    };
  
    // Проверяем загрузку каждого изображения
    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) initSlider();
        });
      }
    });
    
    // Если все изображения уже загружены
    if (loadedCount === images.length) initSlider();
    
    // Ресайз
    window.addEventListener('resize', () => {
      if (loadedCount === images.length) initSlider();
    });
  });

  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('menu-toggle').checked = false;
      document.querySelector('.menu').style.display = 'none';
    });
  });

  function initCarousel() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const track = document.querySelector('.carouselTrack');
    const logos = document.querySelectorAll('.brandLogo');
    const originalSet = Array.from(logos).slice(0, 7);
    
    // Уменьшаем скорость анимации для мобильных
    const animationDuration = isMobile ? '40s' : '20s';
    
    let totalWidth = 0;
    originalSet.forEach(logo => {
      totalWidth += logo.offsetWidth;
    });
  
    track.style.animationDuration = animationDuration;
    document.documentElement.style.setProperty('--translate-value', `-${totalWidth}px`);
  }