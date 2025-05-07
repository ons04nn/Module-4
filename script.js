document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки всех изображений
    const images = document.querySelectorAll('.brandLogo img');
    let loadedCount = 0;
    
    const initSlider = () => {
      const track = document.querySelector('.carouselTrack');
      const logos = document.querySelectorAll('.brandLogo');
      const originalSet = Array.from(logos).slice(0, 7);
      
      // Рассчитываем общую ширину оригинального набора
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

  const blocksData = [
    {
      type: 'large',
      image: 'images/1.jpg',
      tag: 'Категория',
      date: '2023-11-15',
      title: 'Заголовок'
    }
    // ...
  ];
  
  function createBlock(data) {
    const block = document.createElement('div');
    block.className = `block block_${data.type}`;
    block.innerHTML = `
      <img src="${data.image}" alt="${data.title}">
      <div class="content">
        <span class="tag">${data.tag}</span>
        <time>${data.date}</time>
        <h3>${data.title}</h3>
      </div>
    `;
    return block;
  }
  
  function initBlocks() {
    const container = document.getElementById('blocks-container');
    blocksData.forEach(data => {
      container.appendChild(createBlock(data));
    });
  }
  
  document.addEventListener('DOMContentLoaded', initBlocks);