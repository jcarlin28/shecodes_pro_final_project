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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `<div class="col-2">
            <div class="dailyForecast" id="forecast">Sunday
              <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  class="dailyIcon"
                  alt=""
                  width="42"
                /> 
                <div class="daily-forecast-temp">
          <span class="forecast-temp-max">18° | </span>
          <span class="forecast-temp-min">10°</span>
        </div>
      </div> 
          </div>
        </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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
