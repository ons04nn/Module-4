document.addEventListener('DOMContentLoaded', function() {
  const copyButtons = document.querySelectorAll('.icon-back');
  
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  document.body.appendChild(notification);
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async function() {
      try {
        await navigator.clipboard.writeText(window.location.href);
        
        showNotification('Ссылка скопирована!');
        
      } catch (err) {
        console.error('Ошибка при копировании:', err);
        showNotification('Ошибка при копировании', true);
      }
    });
  });
  
  function showNotification(message, isError = false) {
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#ff4444' : '#4CAF50';
    notification.style.display = 'block';
    
    setTimeout(() => {
      notification.style.display = 'none';
    }, 2000);
  }
});