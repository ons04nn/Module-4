document.addEventListener('DOMContentLoaded', function() {
  // ===== 1. Логика прокрутки табов =====
  const tabsBox = document.querySelector(".navbar");
  const allTabs = tabsBox.querySelectorAll(".nav-item");
  const arrowIcons = document.querySelectorAll(".icon i");
  let isDragging = false;

  // Функция для обновления видимости стрелок
  const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
  };

  // Обработчики стрелок
  arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
      handleIcons(tabsBox.scrollLeft);
    });
  });

  // Обработчики перетаскивания
  const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft);
  };

  const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
  };

  tabsBox.addEventListener("mousedown", () => (isDragging = true));
  tabsBox.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  // ===== 2. Логика фильтрации статей =====
  const blocksGrid = document.querySelector('.blocks-grid');
  const originalBlocks = blocksGrid.innerHTML;
  const articlesData = JSON.parse(document.getElementById('articles-data').textContent);
  delete articlesData['все статьи'];

  // Создание HTML блока статьи
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

  // Обработчик кликов на табы
  allTabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault(); // Отключаем стандартное поведение ссылки
      
      // Убираем активность у всех табов и добавляем текущему
      allTabs.forEach(item => item.classList.remove('active'));
      this.classList.add('active');

      const tag = this.textContent.trim();

      // Если выбран "все статьи" — возвращаем исходный HTML
      if (tag === 'все статьи') {
        blocksGrid.innerHTML = originalBlocks;
        return;
      }

      // Фильтрация по тегу
      if (articlesData[tag]) {
        let filteredHTML = '';
        articlesData[tag].forEach(article => {
          filteredHTML += createBlock(article);
        });
        
        // Добавляем кнопку "Все статьи по теме"
        filteredHTML += `
          <div class="container padding-tops">
            <a href="./all_articles.html?tag=${encodeURIComponent(tag)}" class="btn white-btn-trs">
              Все статьи по теме "${tag}"
            </a>
          </div>
        `;
        
        blocksGrid.innerHTML = filteredHTML;
      }
    });
  });

  // Инициализация стрелок при загрузке
  handleIcons(tabsBox.scrollLeft);
});