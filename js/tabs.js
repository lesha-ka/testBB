"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

document.addEventListener("DOMContentLoaded", function () {
  var ItcTabs = /*#__PURE__*/function () {
    function ItcTabs(target, config) {
      _classCallCheck(this, ItcTabs);

      var defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs__btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs__pane");
      this._eventShow = new Event("tab.itc.change");

      this._init();

      this._events();
    }

    _createClass(ItcTabs, [{
      key: "_init",
      value: function _init() {
        var _this = this;

        this._elTabs.setAttribute("role", "tablist");

        this._elButtons.forEach(function (el, index) {
          el.dataset.index = index;
          el.setAttribute("role", "tab");

          _this._elPanes[index].setAttribute("role", "tabpanel");
        });
      }
    }, {
      key: "show",
      value: function show(elLinkTarget) {
        var elPaneTarget = this._elPanes[elLinkTarget.dataset.index];

        var elLinkActive = this._elTabs.querySelector(".tabs__btn_active");

        var elPaneShow = this._elTabs.querySelector(".tabs__pane_show");

        if (elLinkTarget === elLinkActive) {
          return;
        }

        elLinkActive ? elLinkActive.classList.remove("tabs__btn_active") : null;
        elPaneShow ? elPaneShow.classList.remove("tabs__pane_show") : null;
        elLinkTarget.classList.add("tabs__btn_active");
        elPaneTarget.classList.add("tabs__pane_show");

        this._elTabs.dispatchEvent(this._eventShow);

        elLinkTarget.focus();
      }
    }, {
      key: "showByIndex",
      value: function showByIndex(index) {
        var elLinkTarget = this._elButtons[index];
        elLinkTarget ? this.show(elLinkTarget) : null;
      }
    }, {
      key: "_events",
      value: function _events() {
        var _this2 = this;

        this._elTabs.addEventListener("click", function (e) {
          var target = e.target.closest(".tabs__btn");

          if (target) {
            e.preventDefault();

            _this2.show(target);
          }
        });
      }
    }]);

    return ItcTabs;
  }();

  if (document.querySelector(".js-teamTabs")) {
    new ItcTabs(".js-teamTabs");
  }
});