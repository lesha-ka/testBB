"use strict";

$(document).ready(function () {
  function scrollChat() {
    var lastMessage = $('.js-p2pChat .n-p2p-deal__chat-block');
    $(lastMessage).slice(-1)[0].scrollIntoView({
      block: "end"
    });
  }

  function checkCards(message) {
    var chatList = $(".js-chatList");
    var cards = [];
    var expr = new RegExp(/(?:\d[ -]?){12,18}\d/);

    while (expr.test(message)) {
      var cardNumber = message.match(expr);
      cards.push(cardNumber);
      message = message.replace(expr, "");
    }

    var lastFive = cards.slice(-5);
    var lastFiveLength = lastFive.length;
    lastFive.forEach(function callback(currentValue, index, array) {
      currentValue = currentValue[0].replace(/\s/g, "").replace(/(.{4})/g, '$1 ');

      if (index + 1 < lastFiveLength) {
        var newMessageBlock = $("<li class='n-p2p-deal__chat-block paycard right'><div class=\"n-p2p-deal__chat-message buyer paycard js-chatCardCopy\">".concat(currentValue, "</div></li>"));
        chatList.append(newMessageBlock);
      } else {
        var _newMessageBlock = $("<li class='n-p2p-deal__chat-block paycard right'><div class=\"n-p2p-deal__chat-message buyer paycard last js-chatCardCopy\">".concat(currentValue, "</div></li>"));

        chatList.append(_newMessageBlock);
      }
    }); //checkMessage = checkMessage.replace(expr, "");
  }

  $(document).on('click', '.js-chatCardCopy', function () {
    var message = $(this);
    message.addClass('copied');
    var $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val(message.text()).select();
    document.execCommand("copy");
    $tmp.remove();
    setTimeout(function () {
      message.removeClass('copied');
    }, 4000);
  });
  $(document).on('click', '.js-chatSend', function () {
    if ($('.js-chatInput').val() !== '') {
      var chatList = $(".js-chatList");
      var currentdate = new Date();
      var name = "lesha-ka";
      var datetime = currentdate.getDate() + "." + (currentdate.getMonth() + 1) + "." + currentdate.getFullYear() + ", " + String(currentdate.getHours()).padStart(2, '0') + ":" + String(currentdate.getMinutes()).padStart(2, '0');
      var message = $('.js-chatInput').val();
      var newMessageBlock = $("<li class='n-p2p-deal__chat-block right'><div class='n-p2p-deal__chat-time'>".concat(datetime, "</div><div class='n-p2p-deal__chat-message buyer'><div class='n-p2p-deal__chat-name'>").concat(name, "</div><div class='n-p2p-deal__chat-text'>").concat(message, "</div></div></li>"));
      chatList.append(newMessageBlock);
      checkCards(message);
      scrollChat();
    }
  });
});