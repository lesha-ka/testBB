"use strict";

$(document).ready(function () {
  $(".js-p2pBank").hover(function () {
    var bankName = $(this).text();
    $(this).append($("<div class='n-p2p-table__bank'>".concat(bankName, "</div>")));
  }, function () {
    $(this).find(".n-p2p-table__bank").last().remove();
  });
  $(document).on('click', ".js-p2pBuyBtn", function () {
    $('.js-p2pRow').removeClass('active');
    $(this).closest('.js-p2pRow').toggleClass('active');
  });
  $(document).on('click', ".js-p2pRowClose", function () {
    $('.js-p2pRow').removeClass('active');
  });
  $(document).on('click', ".js-tradeBtn", function () {
    $(this).closest('.js-tradeSelect').toggleClass('active');
    jQuery(function ($) {
      $(document).mouseup(function (e) {
        var p2pSelectInner = $(".js-tradeSelect");

        if (!p2pSelectInner.is(e.target) && p2pSelectInner.has(e.target).length === 0) {
          p2pSelectInner.closest('.js-tradeSelect').removeClass('active');
        }
      });
    });
  });

  function updateTradeSelect() {
    var selectedBanks = [];

    if (selectedBanks = []) {
      $('.js-tradeBtn').text('Все способы');
    }

    var tradeSelectText = $('.js-tradeSelectText');
    $(tradeSelectText).each(function () {
      var settingInput = $(this).siblings('.js-settingInput');
      var settingInputVal = settingInput.val();

      if (settingInputVal == 1) {
        selectedBanks.push("".concat($(this).text()));
        var banksLength = selectedBanks.length;
        $('.js-tradeBtn').text('Выбрано: ' + banksLength);
      }
    });
  }

  $(document).on("click", '.js-tradeSelectText', function () {
    updateTradeSelect();
  });
  updateTradeSelect();
  $(document).on("keyup", '.js-checkboxSearch', function () {
    var searchVal = $(this).val().toUpperCase();
    var tradeSelectText = $('.js-tradeSelectCheckbox').find('.js-tradeSelectText');

    if (searchVal != '') {
      $(tradeSelectText).each(function () {
        var tradeSelectTextText = $(this).html().toUpperCase();
        var tradeSelectTextRows = $(this).parent('.js-tradeSelectCheckbox');

        if (tradeSelectTextText.match(searchVal)) {
          tradeSelectTextRows.show();
        } else {
          tradeSelectTextRows.hide();
        }
      });
    } else {
      $('.js-tradeSelectCheckbox').show();
    }
  });
});