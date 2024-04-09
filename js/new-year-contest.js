"use strict";

window.addEventListener("load", contestCookiesCheck);

function contestCookiesCheck() {
  var cookieEnabled = Cookies.enabled,
      currentDate = new Date();
  Cookies.defaults = {
    path: "/",
    domain: window.location.hostname,
    expires: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + 2, currentDate.getMinutes()),
    secure: true
  };

  if (cookieEnabled) {
    var permissionСontestCookies = Cookies("permissionСontestCookies");

    if (!permissionСontestCookies) {
      var contestCookieBlock = createСontestCookiesBlock();
      document.body.append(contestCookieBlock);
      setTimeout(function () {
        contestCookieBlock.style.cssText = "top: 50%; opacity: 1;";
      });
    }
  }
}

function hideContestCookies(e) {
  var btn = e.target.closest("button.contest__button"),
      block = e.target.closest(".contest");

  if (btn) {
    block.style.cssText = "top: -100%; opacity: 0;";
    btn.setAttribute("disabled", "true");
    Cookies.set("permissionСontestCookies", "true");
  }
}

function createСontestCookiesBlock() {
  var contestBlock = document.createElement("div");
  contestBlock.classList.add("contest");
  contestBlock.style.cssText = "top: -100%; opacity: 0;";
  contestBlock.innerHTML =
  /*html*/
  "\n\t<div class=\"contest__inner\">\n\t\t<h4 class=\"contest__title\">\u041D\u041E\u0412\u041E\u0413\u041E\u0414\u041D\u0418\u0419 \u041A\u041E\u041D\u041A\u0423\u0420\u0421!</h4>\n\t\t<p class=\"contest__text\">\u0423\u0447\u0430\u0441\u0442\u0432\u0443\u0439 \u0432 \u043D\u043E\u0432\u043E\u0433\u043E\u0434\u043D\u0435\u043C \u043A\u043E\u043D\u043A\u0443\u0440\u0441\u0435 \u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u0439 \u0446\u0435\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u0437\u044B</p>\n\t\t<span class=\"contest__label\">*\u0432 \u0440\u043E\u0437\u044B\u0433\u0440\u044B\u0448\u0435 \u043C\u043E\u0433\u0443\u0442 \u0443\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0432\u0435\u0440\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438</span>\n\t\t<button type=\"button\" class=\"contest__button\"></button>\n\t</div>\n\t<div class=\"contest__footer\">\n\t\t<a class=\"contest__link\" href=\"https://t.me/BeribitAnnouncements/136\" target=\"_blank\"> \u0423\u0437\u043D\u0430\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435</a>\n\t</div>\n\t";
  contestBlock.onclick = hideContestCookies;
  return contestBlock;
}