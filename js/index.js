"use strict";

$(document).on("click", ".js-biddingToggle", function () {
  $(this).toggleClass("active");
});
$(document).on("click", ".js-copyText", function () {
  var text = $(this);
  text.addClass("copied");
  var $tmp = $("<input>");
  $("body").append($tmp);
  $tmp.val(text.text()).select();
  document.execCommand("copy");
  $tmp.remove();
  setTimeout(function () {
    text.removeClass("copied");
  }, 4000);
});
$(document).on("click", ".js-biddingToggleItem", function () {
  var tabName = $(this).next().text(),
      biddingToggle = $(".js-biddingToggle");
  biddingToggle.removeClass("active");
  biddingToggle.text(tabName);
});
$(document).ready(function () {
  var burgerBody = $(".n-burger-body"),
      burgerBtn = $(".n-burger-btn");
  $(".n-burger-btn").on("click", function () {
    if ($(this).hasClass("open")) {
      $(".n-burger-btn").removeClass("open");
      $(".n-burger-body").removeClass("open");
      wrapperUnfixPosition();
    } else {
      $(".n-burger-btn").addClass("open");
      $(".n-burger-body").addClass("open");
      wrapperFixPosition();
    }
  });
  $(document).mouseup(function (e) {
    if (!burgerBody.is(e.target) && burgerBody.has(e.target).length === 0 && !burgerBtn.is(e.target) && burgerBtn.has(e.target).length === 0) {
      burgerBtn.removeClass("open");
      burgerBody.removeClass("open");
      wrapperUnfixPosition();
    }
  }); // ! уведомления

  var notificationBody = $(".js-notificationBody"),
      notificationBtn = $(".js-notificationBtn");
  notificationBtn.on("click", function () {
    notificationBody.toggleClass("open");
  });
  $(document).mouseup(function (e) {
    if (!notificationBody.is(e.target) && notificationBody.has(e.target).length === 0 && !notificationBtn.is(e.target) && notificationBtn.has(e.target).length === 0) {
      notificationBody.removeClass("open");
    }
  }); // ! Табы

  var tab = $(".tab");
  tab.on("click", function (event) {
    $(".tab-body").removeClass("active");
    $(".tab-body[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
    tab.removeClass("active");
    $(this).toggleClass("active", 500);
  });
  var innerTab = $(".innerTab");
  innerTab.on("click", function (event) {
    $(".inner-tab-body").removeClass("active");
    $(".inner-tab-body[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
    innerTab.removeClass("active");
    $(".innerTab[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
  });
  var thTab = $(".thTab");
  thTab.on("click", function (event) {
    $(".th-tab-body").removeClass("active");
    $(".th-tab-body[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
    thTab.removeClass("active");
    $(".thTab[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
  });
  var fTab = $(".fTab");
  fTab.on("click", function (event) {
    $(".f-tab-body").removeClass("active");
    $(".f-tab-body[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
    fTab.removeClass("active");
    $(".fTab[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
  });
  var bTab = $(".bTab");
  bTab.on("click", function (event) {
    $(".b-tab-body").removeClass("active");
    $(".b-tab-body[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
    bTab.removeClass("active");
    $(".bTab[data-tab=" + $(this).attr("data-tab") + "]").toggleClass("active", 500);
  }); // ! универсальные попапы

  var tabFamily = $(".tabFamily");
  tabFamily.on("click", function (event) {
    $(".tabFamily-body[data-tab-family=" + $(this).attr("data-tab-family") + "]").removeClass("active");
    $(".tabFamily-body[data-tab=" + $(this).attr("data-tab") + "][data-tab-family=" + $(this).attr("data-tab-family") + "]").toggleClass("active", 500);
    $(".tabFamily[data-tab-family=" + $(this).attr("data-tab-family") + "]").removeClass("active");
    $(this).toggleClass("active", 500);
  }); // ! Попапы начало

  var popupBtn = $(".popupBtn");
  popupBtn.on("click", function (e) {
    e.preventDefault();
    $(".popupBody").removeClass("active");
    $(".popupBody[data-popup=" + $(this).attr("data-popup") + "]").toggleClass("active", 500);
  });
  $(".closePopup").on("click", function () {
    $(".popupBody").removeClass("active");
  });
  $(".popupBody").on("click", function (e) {
    if ($(this).has(e.target).length === 0) {
      $(".popupBody").removeClass("active");
    }
  }); // ? Попапы конец
  // ! Кросбраузерность числовых инпутов начало

  $(".onlyNumbers").on("input", function () {
    $(this).val($(this).val().replace(/[^\d,]/g, ""));
  }); // ? Кросбраузерность числовых инпутов конец
  // ! копирование

  function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(this).siblings(el).text()).select();
    $tmp.remove();
  }

  $(".payMethod-copy-btn").on("click", function () {
    var $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val($(this).siblings(".payMethod__item-center-qr-copy_code").text()).select();
    document.execCommand("copy");
    $tmp.remove();
  });
  var apper = $(".termsUpper");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > $(this).height() && apper.length > 0) {
      apper.addClass("active");
    } else {
      apper.removeClass("active");
    }
  });
  $(".cookies_success").on("click", function () {
    $(".cookies").removeClass("active");
  }); // ! копировать урл по кнопке

  var copyUrlBtn = $(".urlCopy");

  if (copyUrlBtn) {
    copyUrlBtn.on("click", function () {
      var tempInput = document.createElement("textarea");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-9999px";
      tempInput.setAttribute("readonly", "");
      tempInput.value = window.location.href;
      copyUrlBtn.parent().append(tempInput);
      tempInput.select();
      tempInput.setSelectionRange(0, 99999);
      document.execCommand("copy");
      tempInput.parentNode.removeChild(tempInput);
    });
  } // ! Загрузчик


  $(function () {
    document.body.classList.add("loaded");
  }); // ! Добавление актуального 1vh в цсс

  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", "".concat(vh, "px")); // ! Список адрессов, их добавление

  var addressBtns = $(".toggle-btns-wrapper .popupBtn");

  if (addressBtns.length > 0) {
    var addressListItems = $(".address-list__item"),
        addressListItemsBtn = addressListItems.find("button"),
        addAddressPopup = $(".add-address-popup"),
        addAddressForm = addAddressPopup.find("form"),
        addressPopups = $(".address-popup"),
        addressBtnWrapper = $(".toggle-btns-wrapper"),
        _addressBtns = addressBtnWrapper.find(".popupBtn"),
        addressInput = addressBtnWrapper.closest(".with-btns-wrapper").find("input");

    addAddressForm.on("submit", function (event) {
      event.preventDefault();
      addAddressForm.parent().removeClass("active");
      alert("Внимание! Имитация загрузки. Отправка на сервер заблокирована");
    });

    _addressBtns.on("click", function () {
      addressPopups.css({
        left: $(this).offset().left - 15,
        top: $(this).offset().top + 36
      });
    });

    addressListItems.on("click", function () {
      addressInput.val($(this).find(".address-list__item-address p").text());
      addressPopups.removeClass("active");
    });
    addressListItemsBtn.on("click", function (event) {
      event.stopPropagation();

      try {
        alert("Внимание! Имитация удаления. На сервере не происходит удаления");
        $(this).closest(".address-list__item").remove();
      } catch (error) {
        throw new Error(error);
      }
    });
    $(document).on("click", function (event) {
      if (!addressPopups.is(event.target) && addressPopups.has(event.target).length === 0 && !_addressBtns.is(event.target) && _addressBtns.has(event.target).length === 0) {
        addressPopups.removeClass("active");
      }
    });
  } // ! Универсальный закрыватель


  var uniCross = $(".uniCross");

  if (uniCross.length > 0) {
    uniCross.on("click", function () {
      $(this).closest(".slideAnimation").slideToggle(300);
    });
  } // ! Открытие сабменю на мобльном


  var submenuWrappers = $(".submenu-wrapper:not(.mobileOpen)");

  if (submenuWrappers.length > 0) {
    submenuWrappers.on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("opened");
    });
  } // ! изменение темы


  $(".n-header__theme-toggler").on("click", function () {
    $("body").toggleClass("light");
    $("body").toggleClass("dark");
  }); // ! аккардион в футере

  $(".n-footer__col_title.accordion").on("click", function () {
    $(this).toggleClass("open");
  });
  var settingLabel = $(".js-settingLabel");
  $(settingLabel).each(function () {
    var settingInput = $(this).siblings(".js-settingInput");
    $(settingInput).each(function () {
      var settingLabel = $(this).siblings(".js-settingLabel");

      if (settingInput.val() == 1) {
        settingLabel.addClass("check");
      } else {
        settingLabel.removeClass("check");
      }
    });
    $(this).on("click", function () {
      var settingInput = $(this).siblings(".js-settingInput");

      if (settingInput.val() == 0) {
        settingInput.val(1);
        $(this).addClass("check");
      } else {
        settingInput.val(0);
        $(this).removeClass("check");
      }
    });
  });
  $("body").on("click", ".js-passwordShow", function () {
    var form = $(this).closest("form");
    $(".js-passwordShow").toggleClass("close");
    var hiddenInput = form.find(".js-passwordShow").siblings("input");
    $(hiddenInput).each(function () {
      var inputType = $(this).attr("type");

      if (inputType == "password") {
        $(this).attr("type", "text");
      } else {
        $(this).attr("type", "password");
      }
    });
  });
});