"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Вкладка STATISTICS отрисовка заполнения фона
function statisticBg() {
  var statItem = $('.js-statItem');
  $(statItem).each(function () {
    var statVolume = $(this).find('.js-statVolume');
    var volumeSumm = 0;
    $(statVolume).each(function () {
      var volume = $(this).html();
      volume = volume.replace(',', '.');
      volume = volume.replace(/\s+/g, '');
      volume = +volume;
      volumeSumm = volumeSumm + volume;
    });
    var statRow = $(this).find('.js-statRow');
    $(statRow).each(function () {
      var statRowValue = $(this).find('.js-statVolume').html();
      statRowValue = statRowValue.replace(',', '.');
      statRowValue = statRowValue.replace(/\s+/g, '');
      statRowValue = +statRowValue;
      var prevRow = $(this).prevAll('.js-statRow');
      var prevSumm = 0;
      $(prevRow).each(function () {
        var statVolume = $(this).find('.js-statVolume');
        var volume = $(statVolume).html();
        volume = volume.replace(',', '.');
        volume = volume.replace(/\s+/g, '');
        volume = +volume;
        prevSumm = prevSumm + volume;
      });
      var percent = (statRowValue + prevSumm) / volumeSumm * 100;
      percent = percent + "%";
      $(this).css(_defineProperty({}, 'background-size', percent + '100%'));
    });
  });
} // Вкладка RATE изменение поля курс


$('.js-biddingPlus').on('click', function () {
  // кнопка плюс
  var biddingPercent = $(this).siblings('.js-biddingPercent'); // определяем input

  var biddingPercentVal = biddingPercent.val(); // определеляем значение input

  biddingPercentVal = biddingPercentVal.replace(/[%]/g, ''); // убираем знак %

  biddingPercentVal = +biddingPercentVal + 0.1; // увеличиваем число

  biddingPercentVal = biddingPercentVal.toFixed(1); // округляем число до 1 знака после запятой

  biddingPercent.val(biddingPercentVal + "%"); // добавляем к числу знак %
});
$('.js-biddingMinus').on('click', function () {
  // кнопка минус
  var biddingPercent = $(this).siblings('.js-biddingPercent');
  var biddingPercentVal = biddingPercent.val();
  biddingPercentVal = biddingPercentVal.replace(/[%]/g, '');
  biddingPercentVal = +biddingPercentVal - 0.1;
  biddingPercentVal = biddingPercentVal.toFixed(1);
  biddingPercent.val(biddingPercentVal + "%");
});
$('.js-inputText').on('input', function () {
  //убирать все символы кроме цифр
  var inputValue = $(this).val();
  inputValue = inputValue.replace(/[^0-9\.\,]/g, '');
  inputValue = inputValue.replace(',', '.');
  $(this).val(inputValue);
});
$('.js-biddingPercent').on('input', function () {
  var biddingPercentVal = $(this).val();
  biddingPercentVal = biddingPercentVal.replace(/\-{2,}/, '-').replace(/[^\d\.\,-]|\b-/, '');
  biddingPercentVal = biddingPercentVal.replace(',', '.');
  $(this).val(biddingPercentVal);
});
$('.js-biddingPercent').on('change', function () {
  //после ввода значения прибавлять знак %
  var biddingPercentVal = $(this).val();
  biddingPercentVal = biddingPercentVal.replace(/[^0-9\.\,\-]/g, '');
  $(this).val(biddingPercentVal + "%");
}); // Раздел PAIR фильтрация

function marketPair() {
  // сортировка внутри блока Пар(.n-market__pair)
  var allBlock = $('.n-market__pair-content[data-tab="pair-all"]'); // определяем общий блок 

  var favoriteBlock = $('.n-market__pair-content[data-tab="pair-favorite"]');
  var favoriteBlockBody = favoriteBlock.find('.js-pairBody');
  var UsdtBlock = $('.n-market__pair-content[data-tab="pair-USDT"]');
  var UsdtBlockBody = UsdtBlock.find('.js-pairBody');
  var RubBlock = $('.n-market__pair-content[data-tab="pair-RUB"]');
  var RubBlockBody = RubBlock.find('.js-pairBody'); // сортировка в категорию Избранное

  var pairChecked = allBlock.find('.js-pairCheck:checked'); // все отмеченные чекбоксы

  var pairCheckedRows = pairChecked.parent('.js-pairRow'); // блок в котором хранится checked

  var clone = $(pairCheckedRows).clone(true); // копируем ряды checked

  favoriteBlockBody.append(clone); // вставляем в раздел Избранное
  // сортировка по имени пары

  var pairName = allBlock.find('.js-pairName');
  $(pairName).each(function () {
    var pairNameText = $(this).html();
    var pairNameRows = $(this).parent('.js-pairRow');

    if (pairNameText.match('RUB')) {
      var _clone = pairNameRows.clone(true);

      RubBlockBody.append(_clone);
    } else if (pairNameText.match('USDT')) {
      var _clone2 = pairNameRows.clone(true);

      UsdtBlockBody.append(_clone2);
    }
  });
}
/* добавление в избранное и удаление оттуда */


$('.js-marketPair').on('click', '.js-pairLabel', function () {
  var labelFor = $(this).attr('for'); // при клике на label узнаем его атрибут

  var input = $("input[name=\"".concat(labelFor, "\"]")); // определение инпута с таким же атрибутом

  input.trigger('click'); // программный клик по всем нужным инпутам

  var favoriteBlock = $('.n-market__pair-content[data-tab="pair-favorite"]');
  var favoriteBlockBody = favoriteBlock.find('.js-pairBody');
  favoriteBlockBody.html('');
  var allBlock = $('.n-market__pair-content[data-tab="pair-all"]'); // определяем общий блок 

  var pairChecked = allBlock.find('.js-pairCheck:checked'); // все отмеченные чекбоксы

  var pairCheckedRows = pairChecked.parent('.js-pairRow'); // блок в котором хранится checked

  var clone = $(pairCheckedRows).clone(true); // копируем ряды checked

  favoriteBlockBody.append(clone); // вставляем в раздел Избранное
});
/* Раздел PAIR - поиск*/

$('.js-pairSearch').on('input', function () {
  var searchVal = $(this).val().toUpperCase();
  var pairName = $('.js-marketPair').find('.js-pairName');

  if (searchVal != '') {
    $(pairName).each(function () {
      var pairNameText = $(this).html();
      var pairNameRows = $(this).parent('.js-pairRow');

      if (pairNameText.match(searchVal)) {
        pairNameRows.addClass('active');
      } else {
        pairNameRows.removeClass('active');
      }
    });
  } else {
    $('.js-pairRow').addClass('active');
  }
});
$(document).on('click', '.js-openPair', function () {
  $('.js-marketPair').addClass('active');
  $('.js-marketPairBlur').addClass('active');
});
$(document).on('click', '.js-marketPairClose', function () {
  $('.js-marketPair').removeClass('active');
  $('.js-marketPairBlur').removeClass('active');
});

if ($('.js-marketPair').length) {
  $(document).mouseup(function (e) {
    var div = $(".js-marketPair"); // тут указываем ID элемента

    if (!div.is(e.target) && div.has(e.target).length === 0) {
      $('.js-marketPair').removeClass('active');
      $('.js-marketPairBlur').removeClass('active');
    }
  });
}

$(document).on('click', '.js-operPopupClose', function () {
  var operPopup = $(this).closest('.js-operPopup');
  operPopup.remove();
});

function popupTimer() {
  $($('.js-operPopup')).each(function () {
    var timer = new Array();
    var operPopupTimer = $(this).find('.js-operPopupTimer');
    var lineWidth = operPopupTimer.css('width');
    lineWidth = lineWidth.replace(/[a-zа-яё]/gi, '');
    var linePercent = lineWidth / 255;
    var time = $(this).attr('data-time');
    var timeMs = +time + "000";
    var remainTime = timeMs * linePercent;
    var thiz = jQuery(this);
    $(operPopupTimer).addClass('empty');
    operPopupTimer.css({
      "transition": "all " + time + "s" + " linear"
    });
    timer = window.setTimeout(function () {
      thiz.remove();
    }, remainTime * 1);
    $(this).mouseover(function () {
      $(operPopupTimer).removeClass('empty');
      var lineWidth = operPopupTimer.css('width');
      lineWidth = lineWidth.replace(/[a-zа-яё]/gi, '');
      operPopupTimer.css({
        "transition": "initial"
      });
      operPopupTimer.css({
        "width": lineWidth
      });
      clearTimeout(timer);
    });
    $(this).mouseout(function () {
      var lineWidth = operPopupTimer.css('width');
      lineWidth = lineWidth.replace(/[a-zа-яё]/gi, '');
      var linePercent = lineWidth / 255;
      var remainTime = time * linePercent;
      operPopupTimer.css({
        "transition": "all " + remainTime + "s" + " linear"
      });
      $(operPopupTimer).addClass('empty');
      timer = window.setTimeout(function () {
        thiz.remove();
      }, remainTime * 1000);
    });
  });
}

$(document).ready(function () {
  marketPair();
  statisticBg();
  popupTimer();
});