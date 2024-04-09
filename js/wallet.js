"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // после загрузки страницы 
  if ($('.js-removalAvailable').length) {
    var removalAvailableVal = $('.js-removalAvailable').val();
    removalAvailableVal = removalAvailableVal.replace(/\s/g, ''); //убираем пробелы

    removalAvailableVal = parseFloat(removalAvailableVal); // преобразуем в число

    removalAvailableVal = removalAvailableVal.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(",", ".");
    $('.js-removalAvailable').val(removalAvailableVal);
  }

  if ($('.js-currencyNumber').length) {
    $('.js-currencyNumber').each(function () {
      var currencyNumber = $(this).text();
      currencyNumber = currencyNumber.replace(/\s/g, ''); //убираем пробелы

      currencyNumber = parseFloat(currencyNumber); // преобразуем в число

      currencyNumber = currencyNumber.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).replace(",", ".");
      $(this).text(currencyNumber);
    });
  } //


  $(document).on("click", '.js-totalHide', function () {
    var totalCount = $('.js-totalCount');
    totalCount.toggleClass('hide');
  });
  $(document).on("click", '.js-walletFavorite', function () {
    $(this).toggleClass('check');
    var listFavorite = $('.js-listFavorite');

    if ($(this).hasClass('check')) {
      $(listFavorite).each(function () {
        if ($(this).hasClass('check')) {
          $(this).closest('li').removeClass('unfavorite');
        } else {
          $(this).closest('li').addClass('unfavorite');
        }
      });
    } else {
      $(listFavorite).closest('li').removeClass('unfavorite');
    }
  });
  $(document).on("click", '.js-walletBalance', function () {
    $(this).toggleClass('check');
    var listBalance = $('.js-listBalance');

    if ($(this).hasClass('check')) {
      $(listBalance).each(function () {
        var value = $(this).text();
        value = value.replace(/[^0-9\.\,]/g, '');

        if (value !== '0') {
          $(this).closest('li').removeClass('zero');
        } else {
          $(this).closest('li').addClass('zero');
        }
      });
    } else {
      $(listBalance).closest('li').removeClass('zero');
    }
  });
  $(document).on("click", '.js-listFavorite', function () {
    $(this).toggleClass('check');
    var walletFavorite = $('.js-walletFavorite');

    if (walletFavorite.hasClass('check') && !$(this).hasClass("check")) {
      $(this).closest('li').addClass('unfavorite');
    }
  });
  $(document).on("click", '.js-toolbarList', function () {
    var toolbarList = $('.js-toolbarList');
    var toolbarCards = $('.js-toolbarCards');
    var walletTable = $('.js-walletTable');
    walletTable.removeClass('cards');
    toolbarList.addClass('active');
    toolbarCards.removeClass('active');
  });
  $(document).on("click", '.js-toolbarCards', function () {
    var toolbarList = $('.js-toolbarList');
    var toolbarCards = $('.js-toolbarCards');
    var walletTable = $('.js-walletTable');
    walletTable.addClass('cards');
    toolbarList.removeClass('active');
    toolbarCards.addClass('active');
  });
  $(document).on("click", '.js-codesTab', function () {
    var codesTab = $('.js-codesTab');
    var codesContent = $('.js-codesContent');
    codesContent.removeClass('show');
    codesTab.removeClass('active');
    $(this).addClass('active');
    var dataTab = $(this).attr('data-tab');
    $(".js-codesContent[data-tab='" + dataTab + "']").addClass('show');
  });
  $(document).on("click", '.js-codeSubmit', function () {
    var codeSubmit = $(this);
    var form = codeSubmit.closest('.js-codesForm');
    var inputs = form.find('.js-codeInput');
    inputs.removeClass('error');
    var codeCreate = $('.js-codeCreate');
    var error = 0;
    $(inputs).each(function () {
      if ($(this).val() == "") {
        $(this).addClass('error');
        error++;
      }
    });

    if (error == 0) {
      codeCreate.fadeIn(300);
      setTimeout(function () {
        codeCreate.fadeOut(300);
      }, 3000);
    }
  });
  $(document).on("click", '.js-removalAll', function () {
    var removalSumm = $('.js-removalSumm');
    var removalTotal = $('.js-removalTotal');
    var removalAvailableVal = $('.js-removalAvailable').val(); // получаем макс. значение

    removalSumm.val(removalAvailableVal);
    removalAvailableVal = removalAvailableVal.replace(/\s/g, ''); //убираем пробелы

    removalAvailableVal = parseFloat(removalAvailableVal); // преобразуем в число

    var form = removalSumm.closest('.js-codesForm');
    var comission = form.find('.select-option-selected').attr('data-commission'); // получаем комиссию из аттрибута активного селекта

    if (comission == undefined || comission == 0) {
      comission = 1;
    } else {
      comission = 1 - comission / 100;
    }

    removalAvailableVal = removalAvailableVal * comission;
    removalAvailableVal = removalAvailableVal.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(",", ".");
    removalTotal.val(removalAvailableVal); // выводим значение с учетом комиссии 
  });

  if ($('.js-removalSumm').length) {
    var select = $('.js-selectSecond');
    var selectOption = select.find('.select-option');
    $(selectOption).on("click", function () {
      var comission = $(this).attr('data-commission');
      $('.js-commission').html(comission + "%");
      var removalTotal = $('.js-removalTotal');

      if (removalTotal.val() !== '') {
        var removalSumm = $('.js-removalSumm').val();

        var _removalTotal = $('.js-removalTotal');

        removalSumm = removalSumm.replace(/\s/g, ''); //убираем пробелы

        removalSumm = parseFloat(removalSumm); // преобразуем в число

        if (comission == undefined || comission == 0) {
          comission = 1;
        } else {
          comission = 1 - comission / 100;
        }

        removalSumm = removalSumm * comission;
        removalSumm = removalSumm.toLocaleString('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).replace(",", ".");

        _removalTotal.val(removalSumm); // выводим значение с учетом комиссии 

      }
    });
  }

  $(document).on("input", '.js-removalSumm', function () {
    var inputValue = $(this).val();
    inputValue = inputValue.replace(/[^0-9\.\,]/g, '');
    inputValue = inputValue.replace(',', '.');
    $(this).val(inputValue);
  });
  $(document).on("change", '.js-removalSumm', function () {
    var removalTotal = $('.js-removalTotal');
    var val = $(this).val();
    val = val.replace(/\s/g, ''); //убираем пробелы

    val = parseFloat(val); // преобразуем в число

    var inputValue = val.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(",", ".");
    $(this).val(inputValue);
    removalTotal.val(inputValue); // выводим значение с учетом комиссии 
  });
  $(document).on("input", '.js-inputNumber', function () {
    var inputValue = $(this).val();
    inputValue = inputValue.replace(/[^0-9\.\,]/g, '');
    inputValue = inputValue.replace(',', '.');
    $(this).val(inputValue);
  });
  $(document).on("change", '.js-inputNumber', function () {
    var inputValue = $(this).val();
    inputValue = inputValue.replace(/[^0-9\.\,]/g, '');
    inputValue = inputValue.replace(',', '.');
    inputValue = parseFloat(inputValue); // преобразуем в число

    inputValue = inputValue.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace(",", ".");
    $(this).val(inputValue);
  });
  $(document).on("click", '.js-refillCopy', function () {
    var refillCode = $('.js-refillCode').text();
    var $txt = $('<textarea />');
    $txt.val(refillCode).css({
      width: "1px",
      height: "1px"
    }).appendTo('body');
    $txt.select();

    if (document.execCommand('copy')) {
      $txt.remove();
    }

    $('.js-refillDefault').hide();
    $('.js-refillCoped').show();
    setTimeout(function () {
      $('.js-refillDefault').show();
      $('.js-refillCoped').hide();
    }, 3000);
  });
  $(document).on("click", '.js-addressPlus', function () {
    var addressMark = $('.js-addressMark');
    addressMark.toggleClass('show');
  });
  $(document).on("click", '.js-addressDel', function () {
    var addressMark = $('.js-addressMark');
    addressMark.toggleClass('show');
  });
  $(document).on("click", '.js-addressAdd', function () {
    var addressMark = $('.js-addressMark');
    addressMark.toggleClass('show');
  });

  if ($('.js-inputCard').length) {
    $('.js-inputCard').mask('9999 9999 9999 9999');
  }

  $(document).on("click", '.js-orderPass', function () {
    var fio = $('.js-selectFio button').text();
    $('.js-orderFio').text(fio);
  });
});