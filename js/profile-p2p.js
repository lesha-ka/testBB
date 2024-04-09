"use strict";

$(document).ready(function () {
  $('.js-paymentsSlider').slick({
    vertical: false,
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: 1,
    speed: 1000,
    variableWidth: false
  });
  $(document).on('click', '.js-settingSubmit', function () {
    var settingSuccess = $('.js-settingSuccess');
    settingSuccess.fadeIn(300);
    setTimeout(function () {
      settingSuccess.fadeOut(300);
    }, 3000);
  }); // Отрисовка заполнения полосок отзывов

  function feedbackLine() {
    var statTotal = $('.js-statTotal').html();
    var statCount = $('.js-statCount').html();
    var statPlaceholder = $('.js-statPlaceholder');
    var statPlaceholderRed = $('.js-statPlaceholderRed');
    var redCount = statPlaceholderRed.closest('div').next().html();
    var redPercent = redCount / statTotal * 100;
    redPercent = redPercent.toFixed();
    statPlaceholderRed.css({
      "width": redPercent + "%"
    });
    var count = statPlaceholder.closest('div').next().html();
    var countPercent = count / statTotal * 100;
    countPercent = countPercent.toFixed();
    statPlaceholder.css({
      "width": countPercent + "%"
    });
  }

  feedbackLine();

  if (document.querySelector('.js-textWrap')) {
    var textWrap = document.querySelectorAll('.js-textWrap');
    textWrap.forEach(function (elem) {
      var textMaxHeight = getComputedStyle(elem).maxHeight;
      textMaxHeight = parseInt(textMaxHeight, 10);
      var textHeight = elem.scrollHeight;
      var btnMore = elem.nextElementSibling;

      if (textHeight > textMaxHeight) {
        btnMore.classList.add('show');
      }

      function showMoreText() {
        if (btnMore.classList.contains('js-lessText')) {
          elem.classList.remove('open');
          btnMore.innerHTML = 'Читать далее';
          btnMore.classList.remove('js-lessText');
        } else {
          elem.classList.add('open');
          btnMore.innerHTML = 'Скрыть';
          btnMore.classList.add('js-lessText');
        }
      }

      btnMore.addEventListener("click", showMoreText);
    });
  }

  $('.js-inputCard').mask('9999-9999-9999-9999');
});