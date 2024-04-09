"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

window.addEventListener("load", activatePlayer);
var tabs = document.querySelector("main.n-info");
var activeTab = tabs.querySelector("article.active");
tabs.addEventListener("tabswitching", tabswitcher);

function activatePlayer() {
  if (Playerjs) {
    var jsplayer = new Playerjs({
      replace: "video"
    });
  }
}

function tabswitcher(e) {
  e.stopPropagation();

  var elements = activeTab.querySelectorAll(".video-holder > div"),
      videos = _toConsumableArray(elements).filter(function (it) {
    return it.id.length;
  });

  videos.forEach(function (it) {
    if (it.id && window["".concat(it.id)].api("started")) {
      window["".concat(it.id)].api("pause");
    }
  });
  activeTab = tabs.querySelector("article[data-article=\"".concat(e.detail, "\"]"));
}