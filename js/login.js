"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var loginSlider = new Swiper(".js-loginSlider", {
    direction: "horizontal",
    slidesPerView: "1",
    loop: true,
    spaceBetween: 0,
    draggable: true,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    }
  }),
      mobileDevice = mobileCheck();

  if (document.forms.length) {
    document.forms.forEach(function (form) {
      if (mobileDevice) {
        form.addEventListener("input", mobileSpaceBan);
      } else {
        form.addEventListener("keypress", spaceBan);
      }

      form.addEventListener("paste", pasteSpaceBan);
    });
  }

  function ValidMail(e) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
        myMail = e.trim(),
        valid = re.test(myMail);
    return valid;
  }

  $(document).on("click", ".js-codeSend", function () {
    $(this).addClass("active");
    $(this).text("Отправлен");
  });
  $(document).on("submit", ".js-submittedForm", function () {
    var errors = 0,
        inputMail = $(this).find(".js-inputMail");

    if (inputMail.length) {
      var inputMailVal = $(this).find(".js-inputMail").val();

      if (ValidMail(inputMailVal) == false) {
        inputMail.addClass("error");
        errors++;
      } else {
        inputMail.removeClass("error");
      }
    }

    var inputPass = $(this).find(".js-inputPass");

    if (inputPass.length) {
      var inputPassVal = $(this).find(".js-inputPass").val();

      if (inputPassVal.length < 6 || !inputPassVal.match(/[A-z]/) || !inputPassVal.match(/[A-Z]/) || !inputPassVal.match(/[0-9]/) || !inputPassVal.match(/[!@#$%\^&*(){}[\]<>?/|\-=+_]/)) {
        inputPass.addClass("error");
        errors++;
      } else {
        inputPass.removeClass("error");
      }
    }

    var inputRepeat = $(this).find(".js-inputRepeat");

    if (inputRepeat.length) {
      var _inputPassVal = $(this).find(".js-inputPass").val(),
          inputRepeatVal = $(this).find(".js-inputRepeat").val();

      if (inputRepeatVal != _inputPassVal) {
        inputRepeat.addClass("error");
        errors++;
      } else {
        inputRepeat.removeClass("error");
      }
    }

    var inputEmpty = $(this).find(".js-inputEmpty");

    if (inputEmpty.length) {
      var inputEmptytVal = $(this).find(".js-inputEmpty").val();

      if (inputEmptytVal == "") {
        inputEmpty.addClass("error");
        errors++;
      } else {
        inputEmpty.removeClass("error");
      }
    }

    var requiredCheck = $(this).find(".js-requiredCheck");

    if (requiredCheck.length) {
      $(requiredCheck).each(function () {
        var requiredCheckVal = $(this).val();

        if (requiredCheckVal == 0) {
          $(this).parent().find(".js-settingLabel").addClass("error");
        }
      });
    }

    if (errors > 0) {
      event.preventDefault();
    }
  });
  $(document).on("submit", ".js-resetForm", function () {
    var errors = 0,
        inputMail = $(this).find(".js-inputMail");

    if (inputMail.length) {
      var inputMailVal = $(this).find(".js-inputMail").val();

      if (ValidMail(inputMailVal) == false) {
        inputMail.addClass("error");
        errors++;
      } else {
        inputMail.removeClass("error");
      }
    }

    if (errors > 0) {
      event.preventDefault();
    } else {
      $(this).hide();
      $(".js-result").addClass("active");
    }
  });
});

function mobileCheck() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
  if (/IEMobile/i.test(userAgent)) return "Windows Mobile";
  if (/BlackBerry/i.test(userAgent)) return "BlackBerry";
  if (/Opera Mini/i.test(userAgent)) return "Phone";
  return null;
}

function spaceBan(e) {
  e.stopPropagation();

  if (e.target.closest(".js-inputMail") && e.code == "Space") {
    e.preventDefault();
  }
}

function mobileSpaceBan(e) {
  e.stopPropagation();
  var input = e.target.closest(".js-inputMail");

  if (input && e.data == " ") {
    input.value = input.value.replace(/\s/gi, "");
  }
}

function pasteSpaceBan(e) {
  e.stopPropagation();
  var input = e.target.closest(".js-inputMail");

  if (input) {
    setTimeout(function () {
      input.value = input.value.replace(/\s/gi, "");
    });
  }
}