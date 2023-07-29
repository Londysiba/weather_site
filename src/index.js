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
function weatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
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
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = dateFormat(currentTime);

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", submit);

search("Durban");