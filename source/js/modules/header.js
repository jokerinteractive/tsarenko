'use strict';

(function () {
  const header = document.querySelector('.js-header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 0) {
        header.classList.add('is-scrolled');
      } else if (window.pageYOffset === 0) {
        header.classList.remove('is-scrolled');
      }
    });
  }
})();
