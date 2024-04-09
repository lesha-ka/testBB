"use strict";

$(document).ready(function () {
  var arrowL = '<button type="button" class="slick-prev"><img src="./img/main/mainSliderArrow.svg" alt="arrow"></button>',
      arrowR = '<button type="button" class="slick-next"><img src="./img/main/mainSliderArrow.svg" alt="arrow"></button>';
  $('.advantages__slider').slick({
    arrows: true,
    dots: true,
    prevArrow: arrowL,
    nextArrow: arrowR,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    variableWidth: true,
    responsive: [{
      breakpoint: 623,
      settings: {
        arrows: true,
        dots: false,
        autoplaySpeed: 3000,
        variableWidth: false,
        slidesToShow: 1
      }
    }]
  });
});