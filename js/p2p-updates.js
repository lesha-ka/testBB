"use strict";

$(document).ready(function () {
  if ($('.js-loadProgress').length) {
    var loadPercent = $('.js-loadPercent').html();
    var loadProgress = $('.js-loadProgress');
    loadProgress.attr('value', loadPercent);
  }
});