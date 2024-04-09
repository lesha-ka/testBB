"use strict";

function scrollChat() {
  var lastMessage = $('.js-p2pChat .n-p2p-deal__chat-block');
  $(lastMessage).slice(-1)[0].scrollIntoView({
    block: "end",
    behavior: "smooth"
  });
}

$(document).ready(function () {
  function updateHintTimer() {
    var dealTimer = $('.js-dealTimer');
    $(dealTimer).each(function () {
      var time = $(this).text();
      var hintTime = $(this).parent().find('p span');
      hintTime.text(time);
    });
  }

  updateHintTimer();
});
$(document).on('click', '.js-zoomImg', function () {
  var imgSrc = $(this).attr('src');
  $('body').prepend('<div class="img__zoom"><div class="img__zoom-wrapper"><div class="img__zoom-close js-zoomImgClose"></div><img src="' + imgSrc + '" class ="img__zoom-block" alt=""></div></div>');
  wrapperFixPosition();
});
$(document).on('click', '.js-p2pDealTab', function () {
  changeDealtab($(this));
});

function changeDealtab(thisObj) {
  $('.js-p2pDealTab').removeClass('active');
  thisObj.addClass('active');
}

document.querySelector('body').addEventListener('click', function (event) {
  if (event.target.classList.contains('js-zoomImgClose') === true) {
    $('div.img__zoom').remove();
    wrapperUnfixPosition();
  }
});
document.querySelector('body').addEventListener('click', function (event) {
  if (event.target.classList.contains('img__zoom') === true && document.querySelector('.img__zoom-wrapper')) {
    $('div.img__zoom').remove();
    wrapperUnfixPosition();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.keyCode == 27 && document.querySelector('.img__zoom')) {
    $('div.img__zoom').remove();
    wrapperUnfixPosition();
  }
});