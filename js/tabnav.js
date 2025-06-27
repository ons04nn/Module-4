document.addEventListener('DOMContentLoaded', function() {

    const tabsBox = document.querySelector(".navbar"),
    allTabs = tabsBox.querySelectorAll(".nav-item"),
    arrowIcons = document.querySelectorAll(".icon i");

    let isDragging = false;

    const handleIcons = (scrollVal) => {
        let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
        arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
        arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
    }

    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
            let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
            handleIcons(scrollWidth);
        });
    });

    allTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabsBox.querySelector(".active").classList.remove("active");
            tab.classList.add("active");
        });
    });

    const dragging = (e) => {
        if(!isDragging) return;
        tabsBox.classList.add("dragging");
        tabsBox.scrollLeft -= e.movementX;
        handleIcons(tabsBox.scrollLeft)
    }

    const dragStop = () => {
        isDragging = false;
        tabsBox.classList.remove("dragging");
    }

    tabsBox.addEventListener("mousedown", () => isDragging = true);
    tabsBox.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
  });

  


document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const blocksGrid = document.querySelector('.blocks-grid');
  const originalBlocks = blocksGrid.innerHTML; 
  
  const articlesData = JSON.parse(document.getElementById('articles-data').textContent);
  delete articlesData['все статьи'];


  function createBlock(article) {
    let blockHtml = '';
    
    if (article.type === 'large') {
      blockHtml = `
        <div class="block block_large">
          <img src="${article.image}" alt="${article.title}" class="block-image">
          <div class="block-content">
            <div class="block-meta">
              <span class="block-tag">${article.tag}</span>
              <time class="block-date" datetime="${article.date}">${formatDate(article.date)}</time>
            </div>
            <a href="${article.link}"><h4 class="block-title">${article.title}</h4></a>
          </div>
        </div>
      `;
    }
    
    return blockHtml;
  }


  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  }


  navItems.forEach(item => {
    item.addEventListener('click', function() {
      const tag = this.textContent.trim();
      

      if (tag === 'все статьи') {
        navItems.forEach(navItem => navItem.classList.remove('active'));
        this.classList.add('active');
        blocksGrid.innerHTML = originalBlocks; 
        return;
      }
      
      
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
      
      if (articlesData[tag]) {
        blocksGrid.innerHTML = '';
        articlesData[tag].forEach(article => {
          blocksGrid.innerHTML += createBlock(article);
        });
        
        blocksGrid.innerHTML += `
        <div class="container padding-tops">
          <a href="./all_articles.html?tag=${encodeURIComponent(tag)}" class="btn white-btn-trs">
            Все статьи по теме "${tag}"
          </a>
        </div>
      `;
      }
    });
  });
});



