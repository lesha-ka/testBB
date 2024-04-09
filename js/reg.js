"use strict";

$(document).ready(function () {
  $('.checkBox').on('mouseup', function () {
    $(this).toggleClass('active');
  }); // маска

  $("input[type='tel']").mask("+7 (999) 999-99-99", {
    placeholder: "_"
  }); //Валидация

  $("form").validate({
    rules: {
      regLogin: {
        required: true
      },
      regEmail: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      },
      repeatPassword: {
        required: true,
        equalTo: "#password"
      },
      regPolicyAgree: {
        required: true
      }
    },
    messages: {
      regLogin: {
        required: "Введите логин"
      },
      regEmail: {
        required: "Введите e-mail",
        email: "Адрес должен быть вида name@domain.com"
      },
      password: {
        required: "Введите пароль",
        minlength: "Пароль не может быть меньше 8 символов"
      },
      repeatPassword: "Пароли не совпадают",
      regPolicyAgree: "Обязательное поле"
    },
    focusInvalid: true
  });
});