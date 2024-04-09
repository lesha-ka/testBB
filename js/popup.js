"use strict";

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".js-popupOpen")) {
    var popupOpeners = document.querySelectorAll(".js-popupOpen");
    popupOpeners.forEach(function (elem) {
      function showPopup() {
        var popups = document.querySelectorAll(".js-popup");
        popups.forEach(function (elem) {
          elem.classList.add("js-hide");
        });
        var popupId = elem.getAttribute("data-popup");
        var popup = document.querySelector("#" + popupId);
        popup.classList.remove("js-hide");
        popup.classList.add("js-show");
        popup.onclick = noButtonClose;
        wrapperFixPosition();
      }

      elem.addEventListener("click", showPopup);
    });
  }

  if (document.querySelector(".js-popupClose")) {
    var popupClose = document.querySelectorAll(".js-popupClose");
    popupClose.forEach(function (elem) {
      function closePopup() {
        elem.closest(".js-popup").classList.remove("js-show");
        elem.closest(".js-popup").classList.add("js-hide");
        wrapperUnfixPosition();
      }

      elem.addEventListener("click", closePopup);
    });
  }

  if (document.querySelector(".js-popupNext")) {
    var popupNext = document.querySelectorAll(".js-popupNext");
    popupNext.forEach(function (elem) {
      var form = elem.closest("form");
      var inputCheck = form.querySelectorAll(".js-inputCheck");

      function nextPopup() {
        var error = 0;
        inputCheck.forEach(function (elem) {
          error++;

          if (elem.classList.contains('js-inputEmpty')) {
            if (elem.value.length == "") {
              elem.classList.add("error");
            } else {
              error--;
              elem.classList.remove("error");
            }
          }

          if (elem.classList.contains('js-inputNickname')) {
            var inputValue = elem.value;

            if (inputValue.length < 4 || inputValue.length > 20 || inputValue.match(/[!@#$%\^&*(){}[\]<>?/|\-]/) || inputValue.charAt() == '.' || inputValue.charAt() == '_') {
              elem.classList.add("error");
            } else {
              error--;
              elem.classList.remove("error");
            }
          }
        });

        if (error == 0) {
          var popups = document.querySelectorAll(".js-popup");
          popups.forEach(function (elem) {
            elem.classList.add("js-hide");
          });
          var popupId = elem.getAttribute("data-popup");
          var popup = document.querySelector("#" + popupId);
          popup.classList.remove("js-hide");
          popup.classList.add("js-show");
        }
      }

      elem.addEventListener("click", nextPopup);
    });
  }

  if (document.querySelector(".js-popupConfirm")) {
    var popupConfirm = document.querySelectorAll(".js-popupConfirm");
    popupConfirm.forEach(function (elem) {
      var form = elem.closest(".js-form");
      var popupConfirm = form.querySelector(".js-popupConfirm");
      var inputCheck = form.querySelectorAll(".js-inputCheck");

      function checkInputs() {
        var error = 0;
        inputCheck.forEach(function (elem) {
          error++;

          if (elem.classList.contains('js-inputEmpty')) {
            if (elem.value.length == "") {
              elem.classList.add("error");
            } else {
              error--;
              elem.classList.remove("error");
            }
          }

          if (elem.classList.contains('js-inputNickname')) {
            var inputValue = elem.value;

            if (inputValue.length < 4 || inputValue.length > 20 || inputValue.match(/[!@#$%\^&*(){}[\]<>?/|\-]/) || inputValue.charAt() == '.' || inputValue.charAt() == '_') {
              elem.classList.add("error");
            } else {
              error--;
              elem.classList.remove("error");
            }
          }

          if (elem.classList.contains('js-inputPass')) {
            var inputPassVal = elem.value;

            if (inputPassVal.length < 6 || !inputPassVal.match(/[A-z]/) || !inputPassVal.match(/[A-Z]/) || !inputPassVal.match(/[0-9]/) || !inputPassVal.match(/[!@#$%\^&*(){}[\]<>?/|\-_]/)) {
              elem.classList.add("error");
            } else {
              error--;
              elem.classList.remove("error");
            }
          }

          if (elem.classList.contains('js-inputRepeat')) {
            var _form = elem.closest("form");

            var inputRepeat = _form.querySelector('.js-inputRepeat');

            var inputPass = _form.querySelector('.js-inputPass');

            var _inputPassVal = inputPass.value;
            var inputRepeatVal = inputRepeat.value;

            if (inputRepeatVal != _inputPassVal) {
              elem.classList.add("error");
              error++;
            } else {
              elem.classList.remove("error");
            }
          }

          ;
        });
      }

      popupConfirm.addEventListener("click", checkInputs);
    });
  }

  document.addEventListener("keydown", function (e) {
    var popups = document.querySelectorAll(".js-popup");

    if (e.keyCode == 27) {
      popups.forEach(function (elem) {
        elem.classList.remove("js-show");
        elem.classList.add("js-hide");
        wrapperUnfixPosition();
      });
    }
  });

  if (document.querySelector(".js-inputPhone")) {
    $(".js-inputPhone").mask("+7 (999) 999-9999");
  }
});
var IsFixed = false;

function wrapperFixPosition() {
  IsFixed = true;
  var fixBlocks = document.querySelectorAll(".js-fixBlock");
  var paddingOffset = window.innerWidth - document.querySelector("body").offsetWidth + "px";
  setTimeout(function () {
    if (!document.querySelector("body").hasAttribute("wrapper-body-scroll-fix")) {
      var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      fixBlocks.forEach(function (el) {
        el.style.paddingRight = paddingOffset;
      });
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").setAttribute("wrapper-body-scroll-fix", scrollPosition);
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = "-" + scrollPosition + "px";
      document.querySelector("body").style.left = "0";
      document.querySelector("body").style.width = "calc(100% - ".concat(paddingOffset, ")");
    }
  }, 15);
}

function wrapperUnfixPosition() {
  var IsFixed = false;
  var fixBlocks = document.querySelectorAll(".js-fixBlock");

  if (document.querySelector("body").hasAttribute("wrapper-body-scroll-fix")) {
    var scrollPosition = document.querySelector("body").getAttribute("wrapper-body-scroll-fix");
    document.querySelector("body").removeAttribute("wrapper-body-scroll-fix");
    document.querySelector("body").style.overflow = "";
    document.querySelector("body").style.position = "";
    document.querySelector("body").style.top = "";
    document.querySelector("body").style.left = "";
    document.querySelector("body").style.width = "";
    window.scrollTo({
      top: scrollPosition,
      left: 0,
      behavior: "instant"
    });
    fixBlocks.forEach(function (el) {
      el.style.paddingRight = "0px";
    });
    document.querySelector("body").style.paddingRight = "0px";
  }
}

function noButtonClose(e) {
  var target = e.target,
      closebutton = this.querySelector(":scope .js-popupClose");

  if (!target.closest(".js-show .n-popup__content")) {
    closebutton.click();
  }
}