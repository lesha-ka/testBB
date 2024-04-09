"use strict";

//Анимированные счетчики
var usersCounter = new CountUp('users-counter', 2000);
var volumeCounter = new CountUp('volume-counter', 65.4, {
  decimalPlaces: 1
});
var requestCounter = new CountUp('request-counter', 20, {
  separator: ' '
});
var $counters = $('.n-counters');
var countersDone = false;

function onScrollCounters() {
  var scroll = $(window).scrollTop() + $(window).height();
  var offset = $counters.offset().top;

  if (countersDone) {
    if (scroll < offset || $(window).scrollTop() > $counters.offset().top + $counters.height()) {
      countersDone = false;
      usersCounter.reset();
      volumeCounter.reset();
      requestCounter.reset();
    }
  } else {
    if (scroll > offset) {
      countersDone = true;
      usersCounter.start();
      volumeCounter.start();
      requestCounter.start();
    }
  }
}

onScrollCounters();
$(window).scroll(function () {
  onScrollCounters();
});