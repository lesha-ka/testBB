"use strict";

$(document).ready(function () {
  $(".input-slider").slider({
    range: "max",
    min: 0,
    max: 100,
    value: 0,
    slide: function slide(event, ui) {
      var _this = this;

      var value = +$(this).attr('data-value');
      $(this).siblings('input').val((value * ui.value / 100).toFixed(1));
      $(this).find('.ui-slider-handle .percent').remove();
      $(this).find('.ui-slider-handle').append("\n               <small class=\"percent\">".concat(ui.value, "%</small> \n            "));
      $(this).find('.input-slider_dot').map(function (index, dot) {
        if (index === 0) {
          return null;
        }

        var thisDot = $(_this).find(".input-slider_dot[data-dot=\"".concat(index, "\"]"));

        if (index * 25 > ui.value) {
          thisDot.removeClass('active');
        } else {
          thisDot.addClass('active');
        }
      });
    },
    create: function create() {
      $(this).find('.ui-slider-handle .percent').remove();
      $(this).find('.ui-slider-handle').append("\n               <small class=\"percent\">0%</small> \n            ");
    }
  });
  $('.plusBtn').on('click', function () {
    var calcInput = $(this).siblings('input'),
        calcInputVal = parseFloat(calcInput.val());
    !calcInputVal ? calcInputVal = 0 : null;
    calcInput.val((calcInputVal + 0.1).toFixed(1));
    $(this).siblings('.minus').removeClass('disabled');
  });
  $('.minusBtn').on('click', function () {
    var calcInput = $(this).siblings('input'),
        calcInputVal = parseFloat(calcInput.val());
    !calcInputVal ? calcInputVal = 0 : null;
    calcInput.val((calcInputVal - 0.1).toFixed(1));
  });
});