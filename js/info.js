"use strict";

$(document).ready(function () {
  function infoSearch() {
    // вставка нового искомого значения
    var searchTerm = $(".js-infoSearch").val(); // удаление любого старого подсвеченного значения

    $("body").removeHighlight(); // отключить подсвечивание, если переменная поиска пуста

    if (searchTerm) {
      // подсветить, если введено новое слово или значение
      $(".js-infoArticle").highlight(searchTerm);
    }
  }

  $(document).on("click", ".js-infoTab", function () {
    var event = new CustomEvent("tabswitching", {
      bubbles: true,
      cancelable: true,
      detail: this.dataset.article
    });
    var dataArticle = $(this).attr("data-article"),
        text = $(this).text();
    $(".js-infoTabTitle").text(text);
    $(".js-infoTab").removeClass("active");
    $(this).addClass("active");
    $(".js-infoArticle").removeClass("active");
    $(".js-infoTabs").removeClass("active");
    $(".js-infoArticle[data-article=" + dataArticle + "]").addClass("active");
    infoSearch();
    this.dispatchEvent(event);
  });
  $(document).on("input", ".js-infoSearch", function () {
    infoSearch(dataArticle);
  });
  $(document).on("click", ".js-infoTabs", function () {
    $(".js-infoTabs").toggleClass("active");
  });
  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    if ($(".js-infoTabs").hasClass("active")) {
      var div = $(".js-infoMenuTabs"); // тут указываем ID элемента

      if (!div.is(e.target) && // если клик был не по нашему блоку
      div.has(e.target).length === 0) {
        setTimeout(function () {
          $(".js-infoTabs").removeClass("active");
        }, 50);
      }
    }
  });
});