"use strict";

$(document).on("input", '.js-fioInput', function () {
  var input = $(this);
  var fioMore = $('.js-fioMore');

  if (input.val() != '') {
    fioMore.addClass('show');
  } else {
    fioMore.removeClass('show');
  }
});
$(document).on("change", '.js-fioInput', function () {
  var input = $(this);
  var fioMore = $('.js-fioMore');

  if (input.val() != '') {
    fioMore.addClass('show');
  } else {
    fioMore.removeClass('show');
  }
});
$(document).on("click", '.js-fioMore', function () {
  var fioMore = $(this);
  var fioList = $('.js-fioList');
  fioMore.toggleClass('active');
  fioList.toggleClass('show');
});
$(document).on("click", '.js-delFio', function () {
  var fioText = $(this).siblings('.js-fioText').text();
  var input = $('.js-fioInput');

  if (fioText == input.val()) {
    if ($(this).parent().siblings().length == 0) {
      var fioMore = $('.js-fioMore');
      var fioList = $('.js-fioList');
      fioMore.removeClass('active');
      fioMore.removeClass('show');
      fioList.removeClass('show');
    }

    input.val('');
    $(this).parent().remove();
    return false;
  } else {
    if ($(this).parent().siblings().length == 0) {
      var _fioMore = $('.js-fioMore');

      var _fioList = $('.js-fioList');

      _fioMore.removeClass('active');

      _fioMore.removeClass('show');

      _fioList.removeClass('show');
    }

    $(this).parent().remove();
    return false;
  }
});
$(document).on("click", '.js-fioItem', function () {
  var input = $('.js-fioInput');
  var fioItem = $(this);
  var fioMore = $('.js-fioMore');
  var fioList = $('.js-fioList');
  var fioText = fioItem.find('.js-fioText').text();
  input.val(fioText);
  fioMore.removeClass('active');
  fioList.removeClass('show');
});