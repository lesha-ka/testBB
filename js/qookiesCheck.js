"use strict";

window.addEventListener("load", qookiesCheck);

function qookiesCheck() {
  var cookieEnabled = Cookies.enabled,
      currentDate = new Date();
  Cookies.defaults = {
    path: "/",
    domain: window.location.hostname,
    expires: new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()),
    secure: true
  };

  if (cookieEnabled) {
    var permissionQuukies = Cookies("permissionCookies");

    if (!permissionQuukies) {
      var qookieBlock = createQookiesBlock();
      document.body.append(qookieBlock);
      setTimeout(function () {
        qookieBlock.style.cssText = "bottom: 5%; opacity: 1;";
      });
    }
  }
}

function hideQookies(e) {
  var btn = e.target.closest("button.qookies__button"),
      block = e.target.closest(".qookies");

  if (btn) {
    block.style.cssText = "bottom: -100%; opacity: 0;";
    btn.setAttribute("disabled", "true");
    Cookies.set("permissionCookies", "true");
  }
}

function createQookiesBlock() {
  var qookieBlock = document.createElement("div");
  qookieBlock.classList.add("qookies");
  qookieBlock.style.cssText = "bottom: -100%; opacity: 0;";
  qookieBlock.innerHTML =
  /*html*/
  "\n\t<div class=\"qookies__text\">\n\t\t\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u043E\u0442 \u0441\u0430\u0439\u0442, \u0432\u044B \u0434\u0430\u0435\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \n\t\t<a href=\"https://beribit.com/home/cookies\">cookies</a>\n\t</div>\n\t<button type=\"button\" class=\"qookies__button\">OK</button>\n\t";
  qookieBlock.onclick = hideQookies;
  return qookieBlock;
}