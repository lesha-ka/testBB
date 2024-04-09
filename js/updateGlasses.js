"use strict";

$(document).ready(function () {
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
  }); //    изменение темы

  var btcSocket = new WebSocket("wss://beribit.com/ws/depth/btcusdt"),
      ethSocket = new WebSocket("wss://beribit.com/ws/depth/ethusdt"),
      usdtSocket = new WebSocket("wss://beribit.com/ws/depth/usdtrub"),
      usdtGlass = $('#mainTable-usdt'),
      btcGlass = $('#mainTable-btc'),
      ethGlass = $('#mainTable-eth');
  var pUsdtPriceMob = document.getElementById("usdtrub_price_mob"),
      pUsdtPriceDesk = document.getElementById("usdtrub_price"),
      pBtcPriceMob = document.getElementById("btcusdt_price_mob"),
      pBtcPriceDesk = document.getElementById("btcusdt_price"),
      pEthPriceMob = document.getElementById("ethusdt_price_mob"),
      pEthPriceDesk = document.getElementById("ethusdt_price");
  var pUsdtProcMob = document.getElementById("usdtrub_proc_mob"),
      pUsdtProcDesk = document.getElementById("usdtrub_proc"),
      pBtcProcMob = document.getElementById("btcusdt_proc_mob"),
      pBtcProcDesk = document.getElementById("btcusdt_proc"),
      pEthProcMob = document.getElementById("ethusdt_proc_mob"),
      pEthProcDesk = document.getElementById("ethusdt_proc");
  var pUsdtLastInpPriceMob = parseFloat(document.getElementById("usdtrub_last").value),
      pBtcLastInpPriceMob = parseFloat(document.getElementById("btcusdt_last").value),
      pEthLastInpPriceMob = parseFloat(document.getElementById("ethusdt_last").value);
  var usdtFirstLoad = true,
      btcFirstLoad = true,
      ethFirstLoad = true;
  var LIMIT_GLASS = 100;

  var transformGlassData = function transformGlassData(data, maxDigits) {
    var asks = "",
        bids = "",
        shortAsksArray,
        shortBidsArray,
        scrollSize;

    if (data.Asks.length > LIMIT_GLASS) {
      shortAsksArray = data.Asks.splice(0, LIMIT_GLASS);
    } else {
      shortAsksArray = data.Asks;
    }

    shortAsksArray.forEach(function (ask) {
      var row = "\n                <div class=\"n-mainTables__item-body-item\">\n                  <div class=\"n-mainTables__item-body-price\">\n                    <p class=\"n-sell\">".concat(ask.ExchangeRate.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }), "</p>\n                  </div>\n                  <div class=\"n-mainTables__item-body-value\">\n                    <p>").concat(ask.Size.toLocaleString('ru-RU', {
        minimumFractionDigits: maxDigits,
        maximumFractionDigits: maxDigits
      }), "</p>\n                  </div>\n                  <div class=\"n-mainTables__item-body-all\">\n                    <p>").concat(ask.Price.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }), "</p>\n                  </div>\n                </div>\n            ");
      asks = row + asks;
    });

    if (data.Bids.length > LIMIT_GLASS) {
      shortBidsArray = data.Bids.splice(0, LIMIT_GLASS);
    } else {
      shortBidsArray = data.Bids;
    }

    shortBidsArray.forEach(function (bid) {
      var row = "\n                <div class=\"n-mainTables__item-body-item\">\n                  <div class=\"n-mainTables__item-body-price\">\n                    <p class=\"n-buy\">".concat(bid.ExchangeRate.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }), "</p>\n                  </div>\n                  <div class=\"n-mainTables__item-body-value\">\n                    <p>").concat(bid.Size.toLocaleString('ru-RU', {
        minimumFractionDigits: maxDigits,
        maximumFractionDigits: maxDigits
      }), "</p>\n                  </div>\n                  <div class=\"n-mainTables__item-body-all\">\n                    <p>").concat(bid.Price.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }), "</p>\n                  </div>\n                </div>\n            ");
      bids = bids + row;
    });
    scrollSize = scrollCalc(shortAsksArray.length, shortBidsArray.length);
    return {
      glassContent: asks + bids,
      scrollSize: scrollSize
    };
  };

  var scrollCalc = function scrollCalc(askL, bidL) {
    if (askL + bidL > 15) {
      if (askL === bidL) {
        return 'middle';
      } else if (askL === 0) {
        return 0;
      } else if (askL < 9) {
        return 0;
      } else if (bidL < 9) {
        return 'max';
      } else {
        return (askL - 7.5) * 22;
      }
    }

    return 0;
  };

  var scrollGlass = function scrollGlass(ref, scrollSize) {
    if (scrollSize === 'middle') {
      ref.scrollTop((ref.prop('scrollHeight') - 330) / 2);
    } else if (scrollSize === 'max') {
      ref.scrollTop(ref.prop('scrollHeight'));
    } else if (typeof scrollSize === "number") {
      ref.scrollTop(scrollSize);
    } else {
      console.error('Ошибка скролла');
    }
  };

  function updateDataGlasses(data, PriceMob, PriceDesk, ProcMob, ProcDesk, LastPrice, symbol) {
    if (data.Bids.length > 0) {
      var fBid = data.Bids[0].ExchangeRate.toFixed(2);
      PriceMob.textContent = fBid + symbol;
      PriceDesk.textContent = fBid + symbol;
      var Result = ((fBid - LastPrice) / LastPrice * 100).toFixed(2);
      ProcMob.textContent = Result + "%";
      ProcDesk.textContent = Result + "%";

      if (Result < 0) {
        ProcMob.classList.remove("green");
        ProcDesk.classList.remove("green");
        ProcMob.classList.add("red");
        ProcDesk.classList.add("red");
      } else {
        ProcMob.classList.remove("red");
        ProcDesk.classList.remove("red");
        ProcMob.classList.add("green");
        ProcDesk.classList.add("green");
      }
    }
  }

  usdtSocket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    var newData = transformGlassData(data, 2);
    usdtGlass.empty().append(newData.glassContent);
    updateDataGlasses(data, pUsdtPriceMob, pUsdtPriceDesk, pUsdtProcMob, pUsdtProcDesk, pUsdtLastInpPriceMob, " RUB");

    if (usdtFirstLoad && newData.scrollSize) {
      scrollGlass(usdtGlass, newData.scrollSize);
      usdtFirstLoad = false;
    }
  };

  btcSocket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    var newData = transformGlassData(data, 4);
    btcGlass.empty().append(newData.glassContent);
    updateDataGlasses(data, pBtcPriceMob, pBtcPriceDesk, pBtcProcMob, pBtcProcDesk, pBtcLastInpPriceMob, " USDT");

    if (btcFirstLoad && newData.scrollSize) {
      scrollGlass(btcGlass, newData.scrollSize);
      btcFirstLoad = false;
    }
  };

  ethSocket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    var newData = transformGlassData(data, 3);
    ethGlass.empty().append(newData.glassContent);
    updateDataGlasses(data, pEthPriceMob, pEthPriceDesk, pEthProcMob, pEthProcDesk, pEthLastInpPriceMob, " USDT");

    if (ethFirstLoad && newData.scrollSize) {
      scrollGlass(ethGlass, newData.scrollSize);
      ethFirstLoad = false;
    }
  };
});