"use strict";

$(document).ready(function () {
  $('.js-referralSlider').slick({
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 0,
    variableWidth: false
  });
  var codeCopy = $('.js-codeCopy');
  $(codeCopy).each(function () {
    $(this).on("click", function () {
      var apiKey = $(this).siblings('.js-codeText').text();
      var $txt = $('<textarea />');
      $txt.val(apiKey).css({
        width: "1px",
        height: "1px"
      }).appendTo('body');
      $txt.select();

      if (document.execCommand('copy')) {
        $txt.remove();
      }
    });
  });
  var referralRules = $('.js-referralRules');
  var referral = $('.js-referral');
  $(document).on("click", '.js-extended', function () {
    referral.hide();
    referralRules.show();
  });
  $(document).on("click", '.js-extendedBack', function () {
    referral.show();
    referralRules.hide();
  });
  var referralList = $('.js-referralList');
  $(document).on("click", '.js-referralMore', function () {
    referral.hide();
    referralList.show();
  });
  $(document).on("click", '.js-extendedBack', function () {
    referral.show();
    referralList.hide();
  });
  var referralQr = $('.js-referralQr');
  $(referralQr).hover(function () {
    $('.slick-next').hide();
  }, function () {
    $('.slick-next').show();
  });
});