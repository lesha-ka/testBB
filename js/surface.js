"use strict";

window.addEventListener("load", surfaceCookiesCheck);

function surfaceCookiesCheck() {
  var cookieEnabled = Cookies.enabled,
      currentDate = new Date();
  Cookies.defaults = {
    path: "/",
    domain: window.location.hostname,
    expires: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() + 2, currentDate.getMinutes()),
    secure: true
  };

  if (cookieEnabled) {
    var permissionSurfaceCookies = Cookies("permissionSurfaceCookies");

    if (!permissionSurfaceCookies) {
      var surfaceCookieBlock = createSurfaceCookiesBlock();
      document.body.append(surfaceCookieBlock);
      setTimeout(function () {
        surfaceCookieBlock.style.cssText = "top: 58px; opacity: 1;";
      });
    }
  }
}

function hideSurfaceCookies(e) {
  var btn = e.target.closest("button.surface__button"),
      block = e.target.closest(".surface");

  if (btn) {
    block.style.cssText = "top: -100%; opacity: 0;";
    btn.setAttribute("disabled", "true");
    Cookies.set("permissionSurfaceCookies", "true");
  }
}

function createSurfaceCookiesBlock() {
  var surfaceBlock = document.createElement("div");
  surfaceBlock.classList.add("surface");
  surfaceBlock.style.cssText = "top: -100%; opacity: 0;";
  surfaceBlock.innerHTML =
  /*html*/
  "\n\t<div class=\"surface__text\">\n\t\t\u0423\u0432\u0430\u0436\u0430\u0435\u043C\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438, \u043E\u0444\u0438\u0441 \u0432 \u0433. \u041C\u043E\u0441\u043A\u0432\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 <b>\u043A\u0440\u0443\u0433\u043B\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u043E</b>. \u0412 \u043D\u043E\u0447\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0432\u0430\u043C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0432\u0441\u0435 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438.\n\t</div>\n\t<button type=\"button\" class=\"surface__button\">\u041E\u0442\u043B\u0438\u0447\u043D\u043E!</button>\n\t";
  surfaceBlock.onclick = hideSurfaceCookies;
  return surfaceBlock;
}