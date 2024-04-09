"use strict";

function drawColumnsWeek() {
  var p2pStatsDate = $('.js-p2pStatsDate');
  var p2pStatsWeek = $('.js-p2pStatsWeek');
  var counterColumn = 0; // Нумерование колонок за неделю и добавление атрибутов с соответствующим числом

  $.each(p2pStatsDate, function (index) {
    var columnWeek = p2pStatsWeek.find('.js-statsColumn')[counterColumn];
    counterColumn++;
    var correction = index - p2pStatsDate.length + 1;
    var date = new Date(new Date().setDate(new Date().getDate() - -correction)).toISOString().substring(0, 10);
    var mount = date.split('-')[1];
    var day = date.split('-')[2];
    $(this).text(day + '.' + mount);
    $(columnWeek).attr('data-date', day + '.' + mount);
  });
}

function drawColumnsMonth() {
  var p2pStatsDateFirst = $('.js-p2pStatsDateFirst');
  var p2pStatsDateMiddle = $('.js-p2pStatsDateMiddle');
  var p2pStatsDateLast = $('.js-p2pStatsDateLast');
  var p2pMonthColumn = $('.js-p2pStatsMonth .js-statsColumn');
  var dateCurrent = new Date(new Date().setDate(new Date().getDate())).toISOString().substring(0, 10);
  var dateMiddle = new Date(new Date().setDate(new Date().getDate() - 15)).toISOString().substring(0, 10);
  var dateFirst = new Date(new Date().setDate(new Date().getDate() - 29)).toISOString().substring(0, 10);
  $(p2pStatsDateLast).text(dateCurrent.split('-')[2] + '.' + dateCurrent.split('-')[1]);
  $(p2pStatsDateMiddle).text(dateMiddle.split('-')[2] + '.' + dateMiddle.split('-')[1]);
  $(p2pStatsDateFirst).text(dateFirst.split('-')[2] + '.' + dateFirst.split('-')[1]);
  $.each(p2pMonthColumn, function (index) {
    var statsCount = $(this).find('.js-statsCount');
    var correction = index - 29;
    var date = new Date(new Date().setDate(new Date().getDate() - -correction)).toISOString().substring(0, 10);
    var mount = date.split('-')[1];
    var day = date.split('-')[2];
    $(this).attr('data-date', day + '.' + mount);
  });
}

function graphColumn() {
  setTimeout(function () {
    var maxNumber = 0;
    $('.js-statsChart.active .js-statsCount').each(function () {
      var statNumber = $(this).html();
      statNumber = +statNumber;

      if (statNumber > +maxNumber) {
        maxNumber = statNumber;
      }
    });
    $('.js-statsChart.active .js-statsCount').each(function () {
      var statNumber = $(this).html();
      statNumber = +statNumber;
      var statsColumn = $(this).parent();
      var percent = statNumber / maxNumber * 100;
      statsColumn.css('height', percent + "%");
    });
  }, 10);
}

function drawLetters() {
  var userName = $('.js-userName');
  $.each(userName, function () {
    var userNameText = $(this).text();
    var userAvatar = $(this).siblings('.js-userAvatar');
    userAvatar.text(userNameText.substring(0, 2));
  });
}

$(document).ready(function () {
  drawColumnsWeek();
  drawColumnsMonth();
  drawLetters();
  $.ajax({
    url: 'json/statistics.json',
    method: 'get',
    dataType: 'json',
    data: {},
    success: function success(data) {
      $('.js-p2pUserName').text(data.Result.ResponseUserData.Login);
      drawLetters();

      if (data.Result.ResponseUserData.KYCStatus == true) {
        $('.js-p2pUserKYC').addClass('check');
      }

      if (data.Result.ResponseUserData.TelegramStatus == true) {
        $('.js-p2pUserSMS').addClass('check');
      }

      if (data.Result.ResponseUserData.EmailStatus == true) {
        $('.js-p2pUserEmail').addClass('check');
      }

      var verifications = $('.js-p2pVerifications').children();
      $.each(verifications, function () {
        if (!$(this).hasClass('check')) {
          $('.js-userAvatar').removeClass('verified');
          $('.js-p2pVerificationStatus').removeClass('verified');
          $('.js-p2pVerificationStatus').text('Неверифицирован');
        }
      }); // Обновление статистики пользователя

      $('.js-p2pReviewLikes').text(data.Result.ReviewsCount.Likes);
      $('.js-p2pReviewDislikes').text(data.Result.ReviewsCount.Dislikes);
      $('.js-p2pVolumeOrders').text(data.Result.SummaryVolumeOrders.All + ' RUB');
      $('.js-p2pOrdersCount').text(data.Result.OrderDetailsStatistic.OrderDetailsCount); // Обновление счётчиков

      var currentTime = new Date().toISOString();
      var date = currentTime.split('T')[0];
      var day = date.split('-')[2];
      var month = date.split('-')[1];
      var lastDeals = data.Result.OrderDetailsStatistic.StatisticsLast30Day;
      var countToday = 0;
      var countMonth = 0;
      $.each(lastDeals, function (key, value) {
        var dealTime = key;
        var dealDate = dealTime.split('T')[0];
        var dealDay = dealDate.split('-')[2];
        var dealMonth = dealDate.split('-')[1];
        var dealDayMonth = dealDay + '.' + dealMonth; // Обновление счётчика В месяц

        if (dealMonth == month) {
          countMonth = countMonth + 1; // Обновление счётчика Сегодня

          if (dealDay == day) {
            countToday = countToday + 1;
          }
        } // добавление количества сделок в таблицу за неделю


        var requiredColumn = $(".js-p2pStatsWeek").find("[data-date='".concat(dealDayMonth, "']"));
        var columnCount = requiredColumn.find('.js-statsCount').text();
        columnCount = +columnCount;
        columnCount++;
        requiredColumn.find('.js-statsCount').text(columnCount); // добавление количества сделок в таблицу за месяц

        var requiredColumnMonth = $(".js-p2pStatsMonth").find("[data-date='".concat(dealDayMonth, "']"));
        var columnCountMonth = requiredColumnMonth.find('.js-statsCount').text();
        columnCountMonth = +columnCount;
        columnCountMonth++;
        requiredColumnMonth.find('.js-statsCount').text(columnCountMonth);
        graphColumn();
      });
      $('.js-p2pOrdersToday').text(countToday);
      $('.js-p2pOrdersMonth').text(countMonth); // Отрисовка таблиц сделок

      if (!jQuery.isEmptyObject(data.Result.OrderDetailsStatistic.LastSales)) {
        var p2pLastSales = $('.js-p2pLastSales');
        var p2pEmptyText = p2pLastSales.find('.js-p2pEmptyText');
        var p2pRecentTable = p2pLastSales.find('.js-p2pRecentTable');
        p2pEmptyText.remove();
        p2pLastSales.removeClass('empty');
        var LastSales = data.Result.OrderDetailsStatistic.LastSales;
        $.each(LastSales, function (key, value) {
          var name = this.Name;
          var amount = this.Amount;
          var date = key;
          var dealDate = date.split('T')[0];
          var dealDay = dealDate.split('-')[2];
          var dealMonth = dealDate.split('-')[1];
          var dealYear = dealDate.split('-')[0];
          date = dealDay + '.' + dealMonth + '.' + dealYear;
          $(p2pRecentTable).append($("<li class=\"n-p2p-main__recent-row\"><div class=\"n-p2p-main__recent-avatar js-userAvatar\"></div><div class=\"n-p2p-main__recent-name js-userName\">".concat(name, "</div><div class=\"n-p2p-main__recent-date\">").concat(date, "</div><div class=\"n-p2p-main__recent-summ\">").concat(amount + ' RUB', "</div></li>")));
        });
        drawLetters();
      }

      if (!jQuery.isEmptyObject(data.Result.OrderDetailsStatistic.LastPurchases)) {
        var p2pLastBuy = $('.js-p2pLastBuy');

        var _p2pEmptyText = p2pLastBuy.find('.js-p2pEmptyText');

        var _p2pRecentTable = p2pLastBuy.find('.js-p2pRecentTable');

        _p2pEmptyText.remove();

        p2pLastBuy.removeClass('empty');
        var LastPurchases = data.Result.OrderDetailsStatistic.LastPurchases;
        $.each(LastPurchases, function (key, value) {
          var name = this.Name;
          var amount = this.Amount;
          var date = key;
          var dealDate = date.split('T')[0];
          var dealDay = dealDate.split('-')[2];
          var dealMonth = dealDate.split('-')[1];
          var dealYear = dealDate.split('-')[0];
          date = dealDay + '.' + dealMonth + '.' + dealYear;
          $(_p2pRecentTable).append($("<li class=\"n-p2p-main__recent-row\"><div class=\"n-p2p-main__recent-avatar js-userAvatar\"></div><div class=\"n-p2p-main__recent-name js-userName\">".concat(name, "</div><div class=\"n-p2p-main__recent-date\">").concat(date, "</div><div class=\"n-p2p-main__recent-summ\">").concat(amount + ' RUB', "</div></li>")));
        });
        drawLetters();
      }
    }
  });
});
$(".js-statsTab").click(function () {
  drawColumnsWeek();
  drawColumnsMonth();
  graphColumn();
});