"use strict";

$(document).ready(function () {
  //Валидация
  var recoveryForm = $(".recovery form");
  recoveryForm.on('submit', function (e) {
    e.preventDefault();

    if ($(this).valid()) {
      $('.recovery__wrapper.after').removeClass('active');
      $('.recovery__wrapper.before').addClass('active');
    }
  });
  recoveryForm.validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      recoveryPass: {
        required: true,
        minlength: 8
      },
      recoveryPassRepeat: {
        required: true,
        equalTo: ".newPassInput"
      }
    },
    messages: {
      email: {
        required: "Введите e-mail",
        email: "Адрес должен быть вида name@domain.com"
      },
      recoveryPass: {
        required: "Введите пароль",
        minlength: "Пароль должен содержать минимум 8 символов"
      },
      recoveryPassRepeat: {
        required: "Повторите пароль",
        equalTo: "Пароли не совпадают"
      }
    },
    focusInvalid: true
  });
});