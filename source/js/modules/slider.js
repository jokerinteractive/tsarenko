'use strict';

(function () {
  function initializeSliders() {
    const slider = document.querySelector('.js-slider');

    if (slider) {
      let mySwiper = new Swiper ('.js-slider', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        loopedSlides: 4,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },

        watchSlidesProgress: true,
        watchSlidesVisibility: true,

        on: {
          sliderMove: function () {
            if (!this.isMoved) {
              hideSlides(this.el);
              this.isMoved = true;
            }
          },
          slideChangeTransitionEnd: function () {
            if (!this.counter) {
              this.counter = 0;
            }

            this.counter += 1;

            if (!this.el.classList.contains('js-slider-portfolio') && this.counter > 1 || this.el.classList.contains('js-slider-portfolio') && this.counter === 2) {
              this.allowSlidePrev = true;

              let hiddenSlides = [].map.call(this.el.querySelectorAll('.is-hidden'), function(it) {
                return it;
              });
              hiddenSlides.forEach(function(slide) {
                slide.classList.remove('is-hidden');
              });
            }
          }
        },
        allowSlidePrev: false
      });

      hideSlides(document);

      function hideSlides(el) {
        let hiddenSlides = [].map.call(el.querySelectorAll('.swiper-slide-prev'), function(it) {
          return it;
        });
        hiddenSlides.forEach(function(slide) {
          slide.classList.add('is-hidden');
          if (slide.previousElementSibling) {
            slide.previousElementSibling.classList.add('is-hidden');
          }
        });
      }
    }
  }

  initializeSliders();

  window.initializeSliders = initializeSliders;
})();
