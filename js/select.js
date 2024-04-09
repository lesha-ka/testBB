"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

$(document).ready(function () {
  if (document.querySelector('.select')) {
    var CLASS_NAME_SELECT = 'select';
    var CLASS_NAME_ACTIVE = 'select-show';
    var CLASS_NAME_SELECTED = 'select-option-selected';
    var SELECTOR_ACTIVE = '.select-show';
    var SELECTOR_DATA = '[data-select]';
    var SELECTOR_DATA_TOGGLE = '[data-select="toggle"]';
    var SELECTOR_OPTION_SELECTED = '.select-option-selected';

    var CustomSelect = /*#__PURE__*/function () {
      function CustomSelect(target, params) {
        _classCallCheck(this, CustomSelect);

        this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
        this._params = params || {};
        this._onClickFn = this._onClick.bind(this);

        if (this._params['options']) {
          this._elRoot.classList.add(CLASS_NAME_SELECT);

          this._elRoot.innerHTML = CustomSelect.template(this._params);
        }

        this._elToggle = this._elRoot.querySelector(SELECTOR_DATA_TOGGLE);

        this._elRoot.addEventListener('click', this._onClickFn);
      }

      _createClass(CustomSelect, [{
        key: "_onClick",
        value: function _onClick(e) {
          var target = e.target;
          var type = target.closest(SELECTOR_DATA).dataset.select;

          switch (type) {
            case 'toggle':
              this.toggle();
              break;

            case 'option':
              this._changeValue(target);

              break;
          }
        }
      }, {
        key: "_update",
        value: function _update(option) {
          option = option.closest('.select-option');

          var selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);

          if (selected) {
            selected.classList.remove(CLASS_NAME_SELECTED);
          }

          option.classList.add(CLASS_NAME_SELECTED);
          this._elToggle.innerHTML = option.innerHTML;
          this._elToggle.value = option.dataset['value'];
          this._elToggle.dataset.index = option.dataset['index'];

          this._elRoot.dispatchEvent(new CustomEvent('select.change'));

          this._params.onSelected ? this._params.onSelected(this, option) : null;
          return option.dataset['value'];
        }
      }, {
        key: "_reset",
        value: function _reset() {
          var selected = this._elRoot.querySelector(SELECTOR_OPTION_SELECTED);

          if (selected) {
            selected.classList.remove(CLASS_NAME_SELECTED);
          }

          this._elToggle.textContent = 'Выберите из списка';
          this._elToggle.value = '';
          this._elToggle.dataset.index = -1;

          this._elRoot.dispatchEvent(new CustomEvent('select.change'));

          this._params.onSelected ? this._params.onSelected(this, null) : null;
          return '';
        }
      }, {
        key: "_changeValue",
        value: function _changeValue(option) {
          if (option.classList.contains(CLASS_NAME_SELECTED)) {
            return;
          }

          this._update(option);

          this.hide();
        }
      }, {
        key: "show",
        value: function show() {
          document.querySelectorAll(SELECTOR_ACTIVE).forEach(function (select) {
            select.classList.remove(CLASS_NAME_ACTIVE);
          });

          this._elRoot.classList.add(CLASS_NAME_ACTIVE);
        }
      }, {
        key: "hide",
        value: function hide() {
          this._elRoot.classList.remove(CLASS_NAME_ACTIVE);
        }
      }, {
        key: "toggle",
        value: function toggle() {
          if (this._elRoot.classList.contains(CLASS_NAME_ACTIVE)) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: "dispose",
        value: function dispose() {
          this._elRoot.removeEventListener('click', this._onClickFn);
        }
      }, {
        key: "value",
        get: function get() {
          return this._elToggle.value;
        },
        set: function set(value) {
          var _this = this;

          var isExists = false;

          this._elRoot.querySelectorAll('.select-option').forEach(function (option) {
            if (option.dataset['value'] === value) {
              isExists = true;
              return _this._update(option);
            }
          });

          if (!isExists) {
            return this._reset();
          }
        }
      }, {
        key: "selectedIndex",
        get: function get() {
          return this._elToggle.dataset['index'];
        },
        set: function set(index) {
          var option = this._elRoot.querySelector(".select-option[data-index=\"".concat(index, "\"]"));

          if (option) {
            return this._update(option);
          }

          return this._reset();
        }
      }]);

      return CustomSelect;
    }();

    CustomSelect.template = function (params) {
      var name = params['name'];
      var options = params['options'];
      var targetValue = params['targetValue'];
      var items = [];
      var selectedIndex = -1;
      var selectedValue = '';
      var selectedContent = 'Выберите из списка';
      options.forEach(function (option, index) {
        var selectedClass = '';

        if (option[0] === targetValue) {
          selectedClass = ' select-option-selected';
          selectedIndex = index;
          selectedValue = option[0];
          selectedContent = option[1];
        }

        items.push("<li class=\"select-option".concat(selectedClass, "\" data-select=\"option\" data-value=\"").concat(option[0], "\" data-index=\"").concat(index, "\">").concat(option[1], "</li>"));
      });
      return "<button type=\"button\" class=\"select-toggle\" name=\"".concat(name, "\" value=\"").concat(selectedValue, "\" data-select=\"toggle\" data-index=\"").concat(selectedIndex, "\">").concat(selectedContent, "</button>\n        <div class=\"select-dropdown\">\n            <ul class=\"select-options\">").concat(items.join(''), "</ul>\n        </div>");
    };

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.select')) {
        document.querySelectorAll(SELECTOR_ACTIVE).forEach(function (select) {
          select.classList.remove(CLASS_NAME_ACTIVE);
        });
      }
    });

    if ($('.js-selectLang').length) {
      var select1 = new CustomSelect('.js-selectLang');
    }

    if ($('.js-selectLangBurger').length) {
      var select2 = new CustomSelect('.js-selectLangBurger');
      var langClose = document.querySelector('.js-langClose');
      langClose.addEventListener('click', function (e) {
        document.querySelector('.js-selectLangBurger').classList.remove('select-show');
      });
    }

    if ($('.js-selectFirst').length) {
      var select3 = new CustomSelect('.js-selectFirst');
    }

    if ($('.js-selectSecond').length) {
      var select4 = new CustomSelect('.js-selectSecond');
    }

    if ($('.js-selectThird').length) {
      var select5 = new CustomSelect('.js-selectThird');
    }

    if ($('.js-selectBank').length) {
      var _select = new CustomSelect('.js-selectBank');
    }

    if ($('.js-selectJurisdiction').length) {
      var _select2 = new CustomSelect('.js-selectJurisdiction');
    }

    $('.select-toggle').click(function () {
      $('.n-burger-body').animate({
        scrollTop: 0
      }, 600);
    });

    if ($('.js-selectAddress').length) {
      var _select3 = new CustomSelect('.js-selectAddress');

      var options = $('.js-selectAddress').find('.select-option');
      $(document).on("click", options, function () {
        var addressInput = $('.js-addressInput');
        addressInput.val(_select3.value);
      });
    }
  }
});