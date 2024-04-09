"use strict";

$('.js-p2pTextarea').on('input', function () {
  var symbolsCount = $(this).val().length;
  var textareaSymbols = $(this).siblings('.js-textareaCounter').find('.js-textareaSymbols');
  textareaSymbols.text(symbolsCount);
});
$(document).ready(function () {
  $('.js-p2pAddQtyCountAdd').click(function (e) {
    e.preventDefault();
    var inc_value = $(this).closest('.js-p2pAddQtyInput').find('.js-p2pAddProductQty').val();
    var value = parseInt(inc_value, 10);
    value = isNaN(value) ? 0 : value;

    if (value < 100) {
      value = value + 5;
      $(this).closest('.js-p2pAddQtyInput').find('.js-p2pAddProductQty').val(value);
    }
  });
  $('.js-p2pAddQtyCountMinus').click(function (e) {
    e.preventDefault();
    var dec_value = $(this).closest('.js-p2pAddQtyInput').find('.js-p2pAddProductQty').val();
    var value = parseInt(dec_value, 10);
    value = isNaN(value) ? 0 : value;

    if (value > 5) {
      value = value - 5;
      $(this).closest('.js-p2pAddQtyInput').find('.js-p2pAddProductQty').val(value);
    }
  }); //tabs

  $('.n-wallet-header__links a').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('active');
    $(this).parent().toggleClass('active');
    $(this).siblings().removeClass('active');
    var target = $(this).attr('href');
    $('.n-p2p-add-tab-content > div').not(target).hide();
    $(target).fadeIn(600);
  });
  $('.js-pairSearch').on('input', function () {
    var searchVal = $(this).val().toUpperCase();
    var pairName = $('.simplebar-content').find('.n-profile-table__label');

    if (searchVal != '') {
      $(pairName).each(function () {
        var pairNameText = $(this).html().toUpperCase();
        var pairNameRows = $(this).parent('.n-profile-table__checkbox');

        if (pairNameText.match(searchVal)) {
          pairNameRows.addClass('active');
        } else {
          pairNameRows.removeClass('active');
        }
      });
    } else {
      $('.n-profile-table__checkbox').addClass('active');
    }
  });
  $('.n-profile-table__checkbox').on('click', function () {
    if ($(this.querySelector('div')).hasClass('check')) {
      var check_text = this.querySelector('div.check');
      var check_type = this.querySelector('div.check');
      check_text = check_text.textContent;
      check_type = check_type.parentNode.parentNode.className;

      if (check_type == 'simplebar-content') {
        var elm = document.querySelectorAll('.n-p2p-add-popular .n-profile-table__checkbox > div:not(.check)');
        elm.forEach(function (i) {
          if (check_text == i.textContent) {
            i.classList.add('check');
          }
        });
      }

      if (check_type == 'n-p2p-add-popup__form') {
        var elm = document.querySelectorAll('.simplebar-content .n-profile-table__checkbox > div:not(.check)');
        elm.forEach(function (i) {
          if (check_text == i.textContent) {
            i.classList.add('check');
          }
        });
      }
    } else {
      return;
    }
  });
  $('.n-profile-table__checkbox').on('click', function () {
    var check_length = $('.n-p2p-add-all_ways .n-profile-table__checkbox > div.check').length;

    if (check_length > 3) {
      this.querySelector('div').classList.remove('check');
    }

    if (check_length == 3) {
      $('.n-p2p-add-all_ways .n-profile-table__checkbox').addClass('trs');
      $('.n-p2p-add-all_ways .n-profile-table__checkbox > div.check').parent().removeClass('trs');
    }

    if (check_length < 3) {
      $('.n-p2p-add-all_ways .n-profile-table__checkbox').removeClass('trs');
    }
  });
  $('.n-p2p-arbiter .n-p2p-deal__review-likes button:first-child').on('click', function () {
    // this.querySelector('img').src = "./img/p2p/p2p-arbiter/like-active.svg";
    $('.n-p2p-arbiter .n-p2p-deal__review-likes button').removeClass('active');
    $(this).addClass('active');
  });
  $('.n-p2p-arbiter .n-p2p-deal__review-likes button:last-child').on('click', function () {
    // this.querySelector('img').src = "./img/p2p/p2p-arbiter/dis_like-active.png";
    $(".n-p2p-arbiter .n-p2p-deal__review-likes button").removeClass("active");
    $(this).addClass("active");
  });
  $('.n-profile-table__checkbox').on('click', function () {
    if ($(this.querySelector('div')).hasClass('check')) {
      return;
    } else {
      var check_text = this.querySelector('div:not(.check)').textContent;
      var check_type = this.querySelector('div:not(.check)').parentNode.parentNode.className;

      if (check_type == 'simplebar-content') {
        var elm = document.querySelectorAll('.n-p2p-add-popular .n-profile-table__checkbox > div.check');
        elm.forEach(function (i) {
          if (check_text == i.textContent) {
            i.classList.remove('check');
          }
        });
      }

      if (check_type == 'n-p2p-add-popup__form') {
        var elm = document.querySelectorAll('.simplebar-content .n-profile-table__checkbox > div.check');
        elm.forEach(function (i) {
          if (check_text == i.textContent) {
            i.classList.remove('check');
          }
        });
      }
    }
  });
  $('.n-p2p-add-popup__inner .js-popupSave').on('click', function () {
    var check_b = document.querySelectorAll('.simplebar-content .n-profile-table__checkbox > div.check');

    if (check_b.length > 0) {
      $('.js-p2pAddWays').addClass('active');
      $('.n-p2p-add-payment-methods button').html('Редактировать');
      $('.n-p2p-add-payment-methods > p').hide();
    } else {
      $('.js-p2pAddWays').removeClass('active');
      $('.n-p2p-add-payment-methods button').html('Добавить <img src="img/p2p/p2p-ad/tr.svg" alt=""/>');
      $('.n-p2p-add-payment-methods > p').show();
    }

    $('.n-p2p-add-payment-methods .n-p2p-add-ways .js-p2pAddItem').remove();
    check_b.forEach(function (i) {
      $('.n-p2p-add-payment-methods .js-p2pAddWays').append('<div class="n-p2p-add-item js-p2pAddItem"><p>' + i.textContent + '</p></div>');
    });
  });
  $.ajax({
    url: 'json/ad-list.json',
    method: 'get',
    dataType: 'json',
    data: {},
    success: function success(data) {
      if (data.Result.Orders.length != 0) {} else {
        $('.js-p2pAdListBlocks').remove();
        $('.js-p2pAdList').append("<div class='n-p2p-no-data active'><h4>Данные отсутствуют.</h4></div>");
      }
    }
  });
});
var inputQuantity = [];
$(function () {
  $(".n-p2p-add-limits input").on("keyup", function (e) {
    var $field = $(this),
        val = this.value,
        $thisIndex = parseInt($field.data("idx"), 10);
    this.classList.remove('active');
    this.parentNode.parentNode.querySelector('.js-p2pAddLastLabel').classList.remove('active');

    if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid")) {
      this.value = inputQuantity[$thisIndex];
      this.classList.add('active');
      this.parentNode.parentNode.querySelector('.js-p2pAddLastLabel').classList.add('active');
      return;
    }

    if (val.length > Number($field.attr("maxlength"))) {
      val = val.slice(0, 5);
      $field.val(val);
    }

    inputQuantity[$thisIndex] = val;
  });
});