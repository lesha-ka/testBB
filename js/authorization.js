"use strict";

$(document).ready(function () {
  //Валидация
  $("form").validate({
    rules: {
      authEmail: {
        required: true,
        email: true
      },
      authPassword: {
        required: true,
        minlength: 8
      }
    },
    messages: {
      authEmail: {
        required: "Введите e-mail",
        email: "Адрес должен быть вида name@domain.com"
      },
      authPassword: {
        required: "Введите пароль",
        minlength: "Пароль не может быть меньше 8 символов"
      }
    },
    focusInvalid: true
  });
});