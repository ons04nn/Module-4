document.addEventListener('DOMContentLoaded', function() {
  // ===== 1. Логика прокрутки табов =====
  const tabsBox = document.querySelector(".navbar");
  const allTabs = tabsBox.querySelectorAll(".nav-item");
  const arrowIcons = document.querySelectorAll(".icon i");
  let isDragging = false;
  let startX, scrollLeft;

  // Функция для обновления видимости стрелок
  const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  };

  // Обработчики стрелок
  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      tabsBox.scrollBy({
        left: icon.id === "left" ? -340 : 340,
        behavior: 'smooth'
      });
      setTimeout(() => handleIcons(tabsBox.scrollLeft), 300);
    });
  });

  // Обработчики для touch и мыши
  const startDrag = (e) => {
    isDragging = true;
    tabsBox.classList.add("dragging");
    startX = e.pageX || e.touches?.[0]?.pageX || 0;
    scrollLeft = tabsBox.scrollLeft;
    
    if (e.touches) {
      e.preventDefault();
    }
  };

  const dragging = (e) => {
    if (!isDragging) return;
    
    const x = e.pageX || e.touches?.[0]?.pageX || 0;
    const walk = (x - startX) * 2;
    tabsBox.scrollLeft = scrollLeft - walk;
    handleIcons(tabsBox.scrollLeft);
    
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  const dragStop = (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    tabsBox.classList.remove("dragging");
    
    // Проверка на клик
    const x = e.pageX || (e.changedTouches && e.changedTouches[0].pageX) || 0;
    const movedDistance = Math.abs(x - startX);
    
    if (movedDistance < 10) {
      const targetTab = document.elementFromPoint(x, e.clientY || 50);
      if (targetTab && targetTab.closest('.nav-item')) {
        targetTab.closest('.nav-item').click();
      }
    }
  };

  // Простой обработчик для трекпада без инерции
  const handleWheelScroll = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      const sensitivity = 0.5;  // Чувствительность (0.1-1.0)
    const minDelta = 0.5;     // Минимальное учитываемое движение
    const scrollMultiplier = 3; // Усиление прокрутки
      // Прямая прокрутка без инерции с плавностью
      tabsBox.scrollBy({
        left: e.deltaX * 3 ,
    // 'auto' вместо 'smooth' для мгновенного отклика
      });
      handleIcons(tabsBox.scrollLeft);
    }
  };

  // Добавляем обработчики
  tabsBox.addEventListener("mousedown", startDrag);
  tabsBox.addEventListener("touchstart", startDrag, { passive: false });
  tabsBox.addEventListener("mousemove", dragging);
  tabsBox.addEventListener("touchmove", dragging, { passive: false });
  tabsBox.addEventListener("wheel", handleWheelScroll, { passive: false });
  document.addEventListener("mouseup", dragStop);
  document.addEventListener("touchend", dragStop);
  document.addEventListener("touchcancel", dragStop);

  // ===== 2. Логика фильтрации статей =====
  const blocksGrid = document.querySelector('.blocks-grid');
  const originalBlocks = blocksGrid.innerHTML;
  const articlesData = JSON.parse(document.getElementById('articles-data').textContent);
  delete articlesData['все статьи'];

  function createBlock(article) {
    if (article.type === 'large') {
      return `
        <div class="block block_large">
          <img src="${article.image}" alt="${article.title}" class="block-image">
          <div class="block-content">
            <div class="block-meta">
              <span class="block-tag">${article.tag}</span>
              <time class="block-date" datetime="${article.date}">${new Date(article.date).toLocaleDateString('ru-RU')}</time>
            </div>
            <a href="${article.link}"><h4 class="block-title">${article.title}</h4></a>
          </div>
        </div>
      `;
    }
    return '';
  }

  const filterArticles = (tag) => {
    allTabs.forEach(item => item.classList.remove('active'));
    
    if (tag === 'все статьи') {
      blocksGrid.innerHTML = originalBlocks;
      return;
    }

    if (articlesData[tag]) {
      let filteredHTML = '';
      articlesData[tag].forEach(article => {
        filteredHTML += createBlock(article);
      });
      
      filteredHTML += `
        <div class="container padding-tops">
          <a href="./all_articles.html?tag=${encodeURIComponent(tag)}" class="btn white-btn-trs">
            Все статьи по теме "${tag}"
          </a>
        </div>
      `;
      
      blocksGrid.innerHTML = filteredHTML;
    }
  };

  allTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      if (isDragging) {
        e.preventDefault();
        return;
      }
      
      const tag = this.textContent.trim();
      filterArticles(tag);
      this.classList.add('active');
    });
  });

  // Инициализация
  handleIcons(tabsBox.scrollLeft);
  setTimeout(() => handleIcons(tabsBox.scrollLeft), 500);
});