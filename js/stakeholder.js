document.addEventListener('DOMContentLoaded', () => {
  // Sabhi shutter containers ko dhoondho
  const shutterContainers = document.querySelectorAll('.scg-shutter-container');

  shutterContainers.forEach(container => {
    container.addEventListener('click', function() {
      // Toggle class se sutter khulega aur band hoga
      this.classList.toggle('active');
      
      // Arrow ghumane ka logic (optional - agar aapne Learn More ▼ lagaya hai)
      const arrowText = this.querySelector('p[style*="text-align: right"]');
      if(arrowText) {
        if(this.classList.contains('active')) {
          arrowText.innerHTML = "Show Less ▲";
        } else {
          arrowText.innerHTML = "Learn More ▼";
        }
      }
    });
  });
});