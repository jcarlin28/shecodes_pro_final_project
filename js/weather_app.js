function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

navigator.geolocation.getCurrentPosition(handlePosition);

let now = new Date();

let day = now.getDay();
let hours = now.getHours();

let timeDate = document.querySelector("#date-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let newDay = days[now.getDay()];
let newHours = String(now.getHours()).padStart(2, "0");
let newMinutes = String(now.getMinutes()).padStart(2, "0");

timeDate.innerHTML = `${newDay} / ${newHours}:${newMinutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° | </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  let locationElement = document.querySelector("h1");
  locationElement.innerHTML = `${city.value}`;
  let apiKey = "a58082645e26b8521bb6d6708f954f02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid${apiKey}`).then(showTemp);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", search);

function showTemp(response) {
  let currentLocation = response.data.name;
  let tempElement = document.querySelector("#currentTemp");
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentPrecip = response.data.clouds.all;
  let currentStatus = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;

  realTemperature = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let precipElement = document.querySelector("#precipitation");
  let weatherStatusElement = document.querySelector("#weatherStatus");
  let weatherIconElement = document.querySelector("#weatherIcon");
  let timeDateElement = document.querySelector("#date-time");
  tempElement.innerHTML = `${realTemperature}`;
  humidityElement.innerHTML = `${currentHumidity}`;
  windSpeedElement.innerHTML = `${currentWind}`;
  precipElement.innerHTML = `${currentPrecip}`;
  weatherStatusElement.innerHTML = `${currentStatus}`;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  console.log(response.data);
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let realTemperature = null;

function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = Math.round((realTemperature * 9) / 5 + 32);
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = `${farenheitTemp}`;
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheitTemp);

function showCelciusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#currentTemp");
  tempElement.innerHTML = Math.round(`${realTemperature}`);
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);
