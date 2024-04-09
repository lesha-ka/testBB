"use strict";

$(document).ready(function () {
  $('.openRialtoDetail').on('click', function () {
    var thisItem = $(this).closest('.rialtoTables__table-item');
    thisItem.removeClass('active');
    thisItem.siblings('.rialtoTables__table-detail').addClass('active');
  });
  $('.closeBtn').on('click', function () {
    var thisDetail = $(this).closest('.rialtoTables__table-detail');
    thisDetail.removeClass('active');
    thisDetail.siblings('.rialtoTables__table-item').addClass('active');
  });
  var tab = $('.tab');
  tab.on('click', function (event) {
    $('.tab-body').removeClass('active');
    $('.tab-body[data-tab=' + $(this).attr('data-tab') + ']').toggleClass('active', 500);
    tab.removeClass('active');
    $(this).toggleClass('active', 500);
  });

  var select = function select() {
    var selectHeader = $('.select__header'),
        selectDoubleItem = $('.select.double .select__item'),
        selectItem = $('.select:not(.double) .select__item'),
        firstSelectResult;
    selectHeader.on('click', selectToggle);
    selectDoubleItem.on('click', selectChooseDouble);
    selectItem.on('click', selectChoose);

    function selectToggle() {
      this.parentElement.classList.toggle('is-active');
    }

    function selectChooseDouble() {
      var textFirst = $(this).find('.firstItem').text(),
          textSecond = $(this).find('.secondItem').text(),
          selectDouble = $(this).closest('.select'),
          currentTextFirst = selectDouble.find('.select__current .firstItem'),
          currentTextSecond = selectDouble.find('.select__current .secondItem');
      currentTextFirst.text(textFirst);
      currentTextSecond.text(textSecond);
      selectDouble.removeClass('is-active');
      firstSelectResult = $(this).attr('data-firstSelect');

      if (firstSelectResult !== undefined) {
        $('.section-reception').addClass('open');
      }
    }

    function selectChoose() {
      var text = this.innerText,
          select = this.closest('.select'),
          currentText = select.querySelector('.select__current');
      currentText.innerText = text;
      select.classList.remove('is-active');
      firstSelectResult = $(this).attr('data-firstSelect');

      if (firstSelectResult !== undefined) {
        $('.section-reception').addClass('open');
      }
    }
  };

  select();
  $('.checkBox').on('mouseup', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      if ($(this).hasClass('checkBoxRequest') && $('.checkBoxRequest.active').length === 3) {
        return;
      }

      $(this).toggleClass('active');
    }
  });
  $('.plus').on('click', function () {
    var calcInput = $(this).siblings('.calcInput'),
        calcInputVal = parseFloat(calcInput.val().replace(/[%]/g, ''));
    calcInput.val((calcInputVal + 0.01).toFixed(2) + '%');
    $(this).siblings('.minus').removeClass('disabled');
  });
  $('.minus').on('click', function () {
    var calcInput = $(this).siblings('.calcInput'),
        calcInputVal = parseFloat(calcInput.val().replace(/[%]/g, ''));

    if (calcInputVal <= 0.01) {
      calcInput.val(0);
      $(this).addClass('disabled');
    } else {
      calcInput.val((calcInputVal - 0.01).toFixed(2) + '%');
      $(this).removeClass('disabled');
    }
  });
  $('.textareaNeedCount').on('input', function (e) {
    $(this).val($(this).val().slice(0, 1000));
    var thisTextLength = $(this).val().length;

    if (thisTextLength === 1000) {
      e.preventDefault();
    }

    $(this).siblings('.textareaCounter').find('span').text(thisTextLength);
  });
  var fastSwapStopChange = true,
      fastSwapFirst,
      fastSwapSecond;
  $('.fastSwap_swap').on('click', function () {
    fastSwapFirst = $('.select__current.first').text(), fastSwapSecond = $('.select__current.second').text();
    $('.select__current.first').text(fastSwapSecond);
    $('.select__current.second').text(fastSwapFirst);
    swapSelects(fsr, fsrs);
  });
  var fsr = 'RUB',
      fsrs = 'USDT';
  $('.fastSwap__form-item .select__item').on('click', function () {
    if ($(this).hasClass('first')) {
      $('.fastSwap__form-item .select__item.second').removeClass('hide');
      $('.fastSwap__form-item .select__item.second[data-fast-item=' + $(this).attr('data-fast-item') + ']').addClass('hide');
    } else {
      $('.fastSwap__form-item .select__item.first').removeClass('hide');
      $('.fastSwap__form-item .select__item.first[data-fast-item=' + $(this).attr('data-fast-item') + ']').addClass('hide');
    }

    fsr = $('.fastSwap__form-item.firstSelect .select__current').text();
    fsrs = $('.fastSwap__form-item.secondSelect .select__current').text();
    changeSelects(fsr, fsrs);
  });

  function swapSelects(first, second) {
    $('.fastSwap__form-item option').attr('selected', false);
    $('.fastSwap__form-item.firstSelect option[value=' + second + ']').attr('selected', true);
    $('.fastSwap__form-item.secondSelect option[value=' + first + ']').attr('selected', true);
    fsr = second;
    fsrs = first;
  }

  function changeSelects(first, second) {
    $('.fastSwap__form-item option').attr('selected', false);
    $('.fastSwap__form-item.firstSelect option[value=' + first + ']').attr('selected', true);
    $('.fastSwap__form-item.secondSelect option[value=' + second + ']').attr('selected', true);
  }

  $('.fastSwap__form').on('submit', function (e) {
    if ($('.fastSwap__checkbox-wrapper input').prop('checked') && fastSwapStopChange) {
      e.preventDefault();
      $('.fastSwap__agree-popup').addClass('active');
      fastSwapStopChange = true;
    }
  });
  $('.fastSwap__agree-popup_btn').on('click', function () {
    fastSwapStopChange = false;
    $('.fastSwap__form').trigger('submit');
  });
});