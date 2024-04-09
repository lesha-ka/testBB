"use strict";

$(document).ready(function () {
  var mailingToggle = $('.js-mailingToggle');
  var mailingInput = $('.js-mailingInput');
  var mailingOn = $('.js-mailingOn');
  var mailingOff = $('.js-mailingOff');
  var extendedList = $('.js-extendedList');
  var notification = $('.js-notification');

  if (mailingInput.val() == 1) {
    $(mailingToggle).addClass('toogleOn');
  }

  $(document).on("click", '.js-mailingToggle', function () {
    mailingToggle.toggleClass('toogleOn');

    if (mailingInput.val() == 1) {
      mailingInput.val(0);
      $(mailingToggle).removeClass('toogleOn');
      mailingOff.fadeIn(300);
      setTimeout(function () {
        mailingOff.fadeOut(300);
      }, 3000);
    } else {
      mailingInput.val(1);
      $(mailingToggle).addClass('toogleOn');
      mailingOn.fadeIn(300);
      setTimeout(function () {
        mailingOn.fadeOut(300);
      }, 3000);
    }
  });
  $(document).on("click", '.js-extended', function () {
    notification.hide();
    extendedList.show();
  });
  $(document).on("click", '.js-extendedBack', function () {
    notification.show();
    extendedList.hide();
  });

  function updateSettings() {
    var settingNotification = $('.js-settingNotification');
    $(settingNotification).each(function () {
      var settingData = $(this).data('notification');
      var notificationItems = $('.js-notificationItem');
      var notificationItem = $(".js-notificationItem[data-notification='".concat(settingData, "']"));
      var settingValue = $(this).siblings('.js-settingInput').val();

      if (settingValue == 1) {
        notificationItem.removeClass('uncheck');
      } else {
        notificationItem.addClass('uncheck');
      }

      if (settingData == 0 && settingValue == 1) {
        notificationItems.removeClass('uncheck');
      }
    });
  }

  $(document).on("click", '.js-popupSave', function () {
    updateSettings();
  });
  updateSettings();
});