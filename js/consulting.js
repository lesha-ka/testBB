"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var loginSlider = new Swiper(".js-consultingSlider", {
    direction: "horizontal",
    slidesPerView: "3",
    loop: true,
    spaceBetween: 24,
    draggable: true,
    autoplay: {
      delay: 3000
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  var disableSliderForSmallScreens = function disableSliderForSmallScreens() {
    var mediaQuery = window.matchMedia("(max-width: 900px)");

    if (mediaQuery.matches) {
      loginSlider.destroy();
    }
  };

  disableSliderForSmallScreens();
  window.addEventListener('resize', disableSliderForSmallScreens);
  $('.js-inputPhone').mask('+7 (999) 999-99-99');
  var form = document.querySelector('.js-form');
  var inputs = form.querySelectorAll('.js-input');
  form.addEventListener('submit', function (e) {
    var valid = true;
    inputs.forEach(function (input) {
      if (input.value === '') {
        input.parentElement.classList.add('error');
        valid = false;
      } else {
        input.parentElement.classList.remove('error');
      }
    });

    if (!valid) {
      e.preventDefault();
    }
  });
  $(".body").css('background', '#142546');
});