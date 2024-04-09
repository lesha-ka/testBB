"use strict";

document.addEventListener("DOMContentLoaded", function () {
  $('body').on('click', '.js-profileNotificationsClose', function () {
    var notification = $(this).parent('.js-profileNotifications');
    notification.addClass('hide');
    setTimeout(function () {
      notification.remove();
    }, 400);
  });

  function profileNotificationsTimer() {
    $($('.js-profileNotifications')).each(function () {
      var timer = new Array();
      var time = $(this).attr('data-time');
      var timeMs = +time + "000";
      var remainTime = timeMs;
      var thiz = jQuery(this);
      timer = window.setTimeout(function () {
        thiz.addClass('hide');
        setTimeout(function () {
          thiz.remove();
        }, 400);
      }, remainTime * 1);
      $(this).mouseover(function () {
        clearTimeout(timer);
      });
      $(this).mouseout(function () {
        timer = window.setTimeout(function () {
          thiz.addClass('hide');
          setTimeout(function () {
            thiz.remove();
          }, 400);
        }, remainTime * 1);
      });
    });
  }

  profileNotificationsTimer();
});