;
(function () {
  var $formInput = document.querySelector('.form-input');
  var $formButton = document.querySelector('.form-button');
  var $formTips = document.querySelector('.form-tips');
  var $weatherTitle = document.querySelector('.weather-title');
  var $weather = document.querySelector('.weather');

  $formButton.addEventListener('click', function () {
    var value = $formInput.value;
    if (validCity(value)) {
      requestWeather(value);
    } else {
      $formTips.style.display = 'block';
    }
  });
  $formInput.addEventListener('focus', function () {
    $formTips.style.display = 'none';
  });

  function validCity(city) {
    return /^([a-zA-Z0-9\u4e00-\u9fa5\·]{2,10})$/.test(city);
  }

  function resultSuccess(res) {
    var realtime = res.result.realtime;
    var future = res.result.future;

    var nodeStr = `<li>
                      <h6 class="weather-date">实时</h6>
                      <p class="weather-temp">${realtime.temperature}℃</p>
                      <p class="weather-info">${realtime.info}</p>
                      <p class="weather-direct">${realtime.direct}</p>
                    </li>`;
    for (var i = 0, len = future.length; i < len; i++) {
      var weather = future[i];
      nodeStr += `<li>
                    <h6 class="weather-date">${weather.date}</h6>
                    <p class="weather-temp">${weather.temperature}</p>
                    <p class="weather-info">${weather.weather}</p>
                    <p class="weather-direct">${weather.direct}</p>
                  </li>`;
    }
    $weatherTitle.innerHTML = res.result.city;
    $weather.innerHTML = nodeStr;
  }

  function requestWeather(city) {
    ajax({
      type: 'get',
      url: 'http://localhost:7777',
      data: {
        city: city,
        key: '9f772a897685aaf813155e91c8c88d9b'
      },
      success: resultSuccess,
      error: function (error) {
        console.log('error', error);
      }
    });
  }
  
  // please code here ···
  function ajax (options) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if(request.readyState == 4){
      if((request.status >= 200 && request.status < 300)||request.status == 304){
        options.success(JSON.parse(request.responseText));
      } else {
        options.error();
      }
      }  
    }
    if (options.type === 'post') {
      request.open("POST", options.url, true);
      request.setRequestHeader('Content-Type', options.headers);
      request.send(options.data);
    } else if (options.type === 'get') {
      request.open("GET", options.url + '/?city=' + options.data.city + '&key=' + options.data.key, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send();
    }
  }
})();