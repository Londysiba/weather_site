function dateFormat(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayNum = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayNum];

  return `${day} ${hours}:${minutes}`;
}

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-condition").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#icon").setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + 
      `
      <div class="col-2">
      <div class="forecast-date">${dayFormat(forecastDay.dt)}</div>
      <img
      src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="42"
      />
      <div class="forecast-temp">
      <span class="forecast-temp-max" data-celsius="${forecastDay.temp.max}"> ${Math.round(forecastDay.temp.max)}° </span>
      <span class="forecast-temp-min" data-celsius="${forecastDay.temp.min}"> ${Math.round(forecastDay.temp.min)}° </span>
      </div>
      </div>
      `;
      }
     });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }

function getForecast(coordinates) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
            
  axios.get(apiUrl).then(showForecast);
}

function search(city) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-text").value;
  search(city);
}

function getLocation(position) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(weatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);

  let forecastTempElements = document.querySelectorAll(".forecast-temp-max, .forecast-temp-min");
  forecastTempElements.forEach((element) => {
    let celsiusValue = element.dataset.celsius;
    let fahrenheitValue = (celsiusValue * 9) / 5 + 32;
    element.innerHTML = `${Math.round(fahrenheitValue)}°`;
  });
}

function convertToCelsius(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let forecastTempElements = document.querySelectorAll(".forecast-temp-max, .forecast-temp-min");
  forecastTempElements.forEach((element) => {
    let celsiusValue = element.dataset.celsius;
    element.innerHTML = `${Math.round(celsiusValue)}°`;
  });
}

let celsiusTemperature = null;

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = dateFormat(currentTime);

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", submit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Durban");