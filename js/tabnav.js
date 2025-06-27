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

  // Обработчики перетаскивания мышью
  const startDrag = (e) => {
    isDragging = true;
    tabsBox.classList.add("dragging");
    startX = e.pageX || e.touches?.[0]?.pageX || 0;
    scrollLeft = tabsBox.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches?.[0]?.pageX || 0;
    const walk = (x - startX) * 2;
    tabsBox.scrollLeft = scrollLeft - walk;
    handleIcons(tabsBox.scrollLeft);
  };

  const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
  };

  // Обработчик двухпальцевого скролла на тачпаде
  const handleTrackpadScroll = (e) => {
    // Проверяем, что скролл горизонтальный (deltaX) и не вертикальный (deltaY)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      tabsBox.scrollLeft += e.deltaX;
      handleIcons(tabsBox.scrollLeft);
    }
  };

  // Добавляем обработчики событий
  tabsBox.addEventListener("mousedown", startDrag);
  tabsBox.addEventListener("touchstart", startDrag, { passive: false });
  
  tabsBox.addEventListener("mousemove", dragging);
  tabsBox.addEventListener("touchmove", dragging, { passive: false });
  
  // Добавляем обработчик для трекпада
  tabsBox.addEventListener("wheel", handleTrackpadScroll, { passive: false });

  document.addEventListener("mouseup", dragStop);
  document.addEventListener("touchend", dragStop);

  // Отключаем стандартное поведение для кликов по табам на тач-устройствах
  tabsBox.addEventListener("touchstart", (e) => {
    if (e.target.closest('.nav-item')) {
      e.preventDefault();
    }
  }, { passive: false });

  // ===== 2. Логика фильтрации статей =====
  // ... (остальная часть вашего кода остается без изменений)

  // Инициализация стрелок при загрузке
  handleIcons(tabsBox.scrollLeft);
});