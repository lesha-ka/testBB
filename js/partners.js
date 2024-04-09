"use strict";

$(document).ready(function () {
  var partnersList = document.querySelector(".js-partnersList");
  $.ajax({
    url: 'json/partners.json',
    method: 'get',
    dataType: 'json',
    data: {},
    success: function success(data) {
      // Создаем контейнер для результата
      var resultContainer = document.createElement('div');
      resultContainer.classList.add('partners-map__result-container');

      var _loop = function _loop(city) {
        var cityResult = document.createElement('div');
        cityResult.classList.add('partners-map__result');
        var cityElement = document.createElement('div');
        cityElement.classList.add('partners-map__city');
        cityElement.textContent = city;
        var partnersList = document.createElement('ul');
        partnersList.classList.add('partners-map__list');
        data.partners[city].forEach(function (partner) {
          // Создаем элемент для партнера
          var partnerElement = document.createElement('li');
          partnerElement.classList.add('partners-map__item', 'js-partnerBlock');
          partnerElement.setAttribute('data-latitude', partner.coordinates.latitude);
          partnerElement.setAttribute('data-longitude', partner.coordinates.longitude);
          var partnerName = document.createElement('div');
          partnerName.classList.add('partners-map__name');
          partnerName.textContent = partner.name;
          var partnerLink = document.createElement('a');
          partnerLink.classList.add('partners-map__contact');
          partnerLink.href = partner.link;
          partnerLink.textContent = partner['link-text'];
          partnerLink.setAttribute('target', '_blank');
          partnerElement.appendChild(partnerName);
          partnerElement.appendChild(partnerLink);
          partnersList.appendChild(partnerElement);
        });
        cityResult.appendChild(cityElement);
        cityResult.appendChild(partnersList);
        resultContainer.appendChild(cityResult);
      };

      for (var city in data.partners) {
        _loop(city);
      }

      partnersList.appendChild(resultContainer);
    }
  });
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [47.222078, 39.720358],
      zoom: 12,
      controls: []
    }, {
      searchControlProvider: 'yandex#search'
    });
    myMap.behaviors.disable('scrollZoom');
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "large",
        position: {
          right: 20,
          top: 100
        }
      }
    });
    myMap.controls.add(zoomControl);
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('js-partnerBlock')) {
        var latitude = e.target.getAttribute('data-latitude');
        var longitude = e.target.getAttribute('data-longitude');
        myMap.setCenter([latitude, longitude]);
      }
    });
  });
  document.querySelector('.partners-map__input').addEventListener('input', function () {
    var inputValue = this.value.toLowerCase();
    document.querySelectorAll('.partners-map__result').forEach(function (result) {
      var cityText = result.querySelector('.partners-map__city').textContent.toLowerCase();

      if (cityText.includes(inputValue)) {
        result.style.display = 'block';
      } else {
        result.style.display = 'none';
      }
    });
  });
});