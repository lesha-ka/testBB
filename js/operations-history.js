"use strict";

document.addEventListener("DOMContentLoaded", function () {
  if ($("#table").length) {
    new SimpleBar(document.getElementById("table"), {
      autoHide: false
    });
  }

  if ($("#table2").length) {
    new SimpleBar(document.getElementById("table2"), {
      autoHide: false
    });
  }

  if ($("#table").length == 0) {
    document.querySelector(".main").classList.add("table_none");
  }

  document.addEventListener("DOMSubtreeModified", function () {
    var table = document.querySelectorAll(".table__value");

    if (table.length == 0) {
      document.querySelector(".main").classList.add("table_none");
    } else {
      document.querySelector(".main").classList.remove("table_none");
    }
  });
  document.querySelectorAll(".n-pages__item").forEach(function (item) {
    return item.addEventListener("click", function () {
      document.querySelectorAll(".n-pages__item").forEach(function (item) {
        return item.classList.remove("n-pages__item_active");
      });
      item.classList.add("n-pages__item_active");
    });
  });
  document.querySelectorAll(".n-menu__link").forEach(function (item) {
    return item.addEventListener("click", function () {
      var text = item.textContent;
      var item_class = item.classList[1];
      var btn = document.getElementById("menu-btn");
      btn.classList.remove("n-menu__orders", "n-menu__transaction", "n-menu__account", "n-menu__cryptocurrency", "n-menu__p2p", "n-menu__codes", "n-menu__turnover");
      btn.classList.add(item_class);
      btn.innerText = text;
      var parent = item.parentNode;
      document.querySelectorAll(".n-menu__item").forEach(function (child) {
        return child.classList.remove("n-menu__item_active");
      });
      parent.classList.add("n-menu__item_active");
      document.getElementById("n-menu").classList.remove("n-menu_active");
    });
  });
  document.querySelectorAll(".n-menu__btn").forEach(function (item) {
    return item.addEventListener("click", function () {
      var parent = item.parentNode;
      parent.classList.toggle("n-menu_active");
    });
  });
  document.querySelectorAll(".n-filter__triger").forEach(function (item) {
    return item.addEventListener("click", function () {
      var parent = item.parentNode;
      parent.classList.toggle("n-filter__item_active");
    });
  });
  document.querySelectorAll(".n-filter__open").forEach(function (item) {
    return item.addEventListener("click", function () {
      var parent = item.parentNode;
      parent.classList.toggle("n-filter_open");
    });
  });
  var parentElement = document.getElementById("n-filter");
  var ua = navigator.userAgent,
      event = ua.match(/iPad/i) || ua.match(/iPhone/) ? "touchstart" : "click";
  document.addEventListener(event, function (e) {
    var target = e.target;

    if (!parentElement.contains(target)) {
      parentElement.classList.remove("n-filter_open");
    }
  });
});
var a, b;

function foo(c) {
  if (a != c) {
    b = 0;
    a = c;
  }

  b ^= 1;
  c.checked = b;
}