document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');
  const allBlocks = document.querySelectorAll('.block');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navItems.forEach(navItem => navItem.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.textContent.trim().toLowerCase();
      
      allBlocks.forEach(block => {
        const tagElement = block.querySelector('.block-tag');
        const shouldShow = filter === 'все статьи' || 
                         (tagElement && tagElement.textContent.trim().toLowerCase().includes(filter));
        
        if (shouldShow) {
          block.classList.remove('hidden');
        } else {
          block.classList.add('hidden');
        }
      });
      
      setTimeout(() => {
        if (typeof window.gridRefresh === 'function') {
          window.gridRefresh();
        }
      }, 300);
    });
  });
  
  document.querySelector('.nav-item.active').click();
});