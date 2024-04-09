"use strict";

$(document).ready(function () {
  if ($('.js-apiEdit ').length) {
    var apiEdit = $('.js-apiEdit');
    $(apiEdit).each(function () {
      $(this).on("click", function () {
        var apiData = $(this).attr('data-setting');
        var apiSettings = $(".js-apiSetting[data-setting='".concat(apiData, "']"));
        var apiList = $('.js-apiList');
        apiList.hide();
        apiSettings.show();
      });
    });
    var apiBack = $('.js-apiBack');
    $(apiBack).each(function () {
      $(this).on("click", function () {
        var apiList = $('.js-apiList');
        var apiSettings = $('.js-apiSetting');
        apiList.show();
        apiSettings.hide();
      });
    });
    var apiSettingSave = $('.js-apiSettingSave');
    $(apiSettingSave).each(function () {
      $(this).on("click", function () {
        var apiList = $('.js-apiList');
        var apiSettings = $('.js-apiSetting');
        apiList.show();
        apiSettings.hide();
      });
    });
    var apiCopy = $('.js-apiCopy');
    $(apiCopy).each(function () {
      $(this).on("click", function () {
        var apiKey = $(this).siblings($('.js-apiKey')).text();
        var apiSuccess = $('.js-apiSuccess');
        var $txt = $('<textarea />');
        $txt.val(apiKey).css({
          width: "1px",
          height: "1px"
        }).appendTo('body');
        $txt.select();

        if (document.execCommand('copy')) {
          $txt.remove();
        }

        apiSuccess.fadeIn(300);
        setTimeout(function () {
          apiSuccess.fadeOut(300);
        }, 3000);
      });
    });
  }
});