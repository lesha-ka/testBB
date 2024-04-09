"use strict";

$(document).ready(function () {
  $('.js-p2pChange').on('click', function () {
    $(this).toggleClass('active');
  });
  $('.js-p2pLink').on('click', function () {
    $('.js-p2pLink').removeClass('active');
    $(this).addClass('active');
    var name = $(this).html();
    $('.js-p2pChange').html(name);
    $('.js-p2pChange').removeClass('active');
  });

  if ($('.js-p2pChange').length) {
    var name = $('.js-p2pLink.active').html();
    $('.js-p2pChange').html(name);
  }
});