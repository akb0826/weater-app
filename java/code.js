let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let weekday = weekdays[now.getDay()];
let date = `Last Updated: ${weekday} ${hour}:${minute}`;
let dateLocation = document.querySelector("#main-day-time");
dateLocation.innerHTML = date;

let citySearch = document.querySelector("#search-form");
let city = document.querySelector("#city-input");
let apiKey = "7473fbdcedf29ba4a4d8e68e3bd90672";
let button = document.querySelector("button");
let mainCity = document.querySelector("#main-city-day");
let mainTemp = document.querySelector("#main-day-temp");
let mainWeather = document.querySelector("#main-day-weather");
let windSpeed = document.querySelector("#wind-speed");

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function sayCity(event) {
  event.preventDefault();
  let cityDisplay = city.value.capitalize();
  if (city.value) {
    mainCity.innerHTML = cityDisplay;
  }
  let cityLink = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;
  axios.get(cityLink).then(sayTemp);
}
function sayTemp(response) {
  console.log(response.data);
  fahrenheitTemp = response.data.main.temp;
  let temperature = Math.round(fahrenheitTemp);
  let weather = response.data.weather[0].description;
  let mainIcon = document.querySelector("#main-day-icon");
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let cityCircleLink = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=7&appid=${apiKey}&units=imperial`;
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  mainTemp.innerHTML = `${temperature}°`;
  mainWeather.innerHTML = `${weather}`;
  windSpeed.innerHTML = `Wind Speed : ${Math.round(
    response.data.wind.speed
  )} mph`;
  mainIcon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  axios.get(cityCircleLink).then(nearCities);
  axios.get(apiLink).then(getForecast);
}
function nearCities(response) {
  let cityOne = document.querySelector("#city-one");
  let tempOne = document.querySelector("#temp-one");
  let cityTwo = document.querySelector("#city-two");
  let tempTwo = document.querySelector("#temp-two");
  let cityThree = document.querySelector("#city-three");
  let tempThree = document.querySelector("#temp-three");
  let cityFour = document.querySelector("#city-four");
  let tempFour = document.querySelector("#temp-four");
  let cityFive = document.querySelector("#city-five");
  let tempFive = document.querySelector("#temp-five");

  cityOne.innerHTML = response.data.list[2].name + " ";
  cityTwo.innerHTML = response.data.list[3].name + " ";
  cityThree.innerHTML = response.data.list[4].name + " ";
  cityFour.innerHTML = response.data.list[5].name + " ";
  cityFive.innerHTML = response.data.list[6].name + " ";

  tempOne.innerHTML = Math.round(response.data.list[2].main.temp) + "°F";
  tempTwo.innerHTML = Math.round(response.data.list[3].main.temp) + "°F";
  tempThree.innerHTML = Math.round(response.data.list[4].main.temp) + "°F";
  tempFour.innerHTML = Math.round(response.data.list[5].main.temp) + "°F";
  tempFive.innerHTML = Math.round(response.data.list[6].main.temp) + "°F";
}
function getForecast(response) {
  let forecast = response.data.daily;
  let forecastelement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">
          <div class="monday col-3">
            <h1 class="otherDaysName" id="day-one">${formatDay(
              forecast[1].dt
            )}</h1>
            <img src="img/${
              forecast[1].weather[0].icon
            }.png" class="weatherIcon" alt="${forecast[1].weather[0].main}" />
            <p class="otherDays">
              <span class="temp"> ${Math.round(forecast[1].temp.day)}°F </span>
              <br />
              <span class="weather"> ${
                forecast[1].weather[0].description
              } </span>
            </p>
          </div>
          <div class="tuesday col-3">
            <h1 class="otherDaysName" id="day-two">${formatDay(
              forecast[2].dt
            )}</h1>
            <img src="img/${
              forecast[2].weather[0].icon
            }.png" class="weatherIcon" alt="${forecast[2].weather[0].main}" />
            <p class="otherDays">
              <span class="temp"> ${Math.round(forecast[2].temp.day)}°F </span>
              <br />
              <span class="weather"> ${
                forecast[2].weather[0].description
              } </span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="wednesday col-3">
            <h1 class="otherDaysName" id="day-three">${formatDay(
              forecast[3].dt
            )}</h1>
            <img src="img/${
              forecast[3].weather[0].icon
            }.png" class="weatherIcon" alt="${forecast[3].weather[0].main}" />
            <p class="otherDays">
              <span class="temp"> ${Math.round(forecast[3].temp.day)}°F </span>
              <br />
              <span class="weather"> ${
                forecast[3].weather[0].description
              } </span>
            </p>
          </div>
          <div class="thursday col-3">
            <h1 class="otherDaysName" id="day-four">${formatDay(
              forecast[4].dt
            )}</h1>
            <img src="img/${
              forecast[4].weather[0].icon
            }.png" class="weatherIcon" alt="${forecast[4].weather[0].main}" />
            <p class="otherDays">
              <span class="temp"> ${Math.round(forecast[4].temp.day)}°F </span>
              <br />
              <span class="weather"> ${
                forecast[4].weather[0].description
              } </span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="friday col-3">
            <h1 class="otherDaysName" id="day-five">${formatDay(
              forecast[5].dt
            )}</h1>
            <img src="img/${
              forecast[5].weather[0].icon
            }.png" class="weatherIcon" alt="${forecast[5].weather[0].main}" />
            <p class="otherDays">
              <span class="temp"> ${Math.round(forecast[5].temp.day)}°F </span>
              <br />
              <span class="weather"> ${
                forecast[5].weather[0].description
              } </span>
            </p>
          </div>
          <div class="saturday col-3">
            <h1 class="otherDaysName" id="day-six">${formatDay(
              forecast[6].dt
            )}</h1>
            <img src="img/${
              forecast[6].weather[0].icon
            }.png" class="weatherIcon" alt="${forecast[6].weather[0].main}" />
            <p class="otherDays">
              <span class="temp"> ${Math.round(forecast[6].temp.day)}°F </span>
              <br />
              <span class="weather"> ${
                forecast[6].weather[0].description
              } </span>
            </p>
          </div>
        </div>`;
  forecastelement.innerHTML = forecastHTML;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function sayLocation(response) {
  fahrenheitTemp = response.data.main.temp;
  mainCity.innerHTML = response.data.name;
  let locationTemp = Math.round(fahrenheitTemp);
  let locationWeather = response.data.weather[0].description;
  let mainIcon = document.querySelector("#main-day-icon");
  mainIcon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  mainTemp.innerHTML = `${locationTemp}°`;
  mainWeather.innerHTML = `${locationWeather}`;
  windSpeed.innerHTML = `Wind Speed : ${Math.round(
    response.data.wind.speed
  )} mph`;
}
function handleLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(coordLink).then(sayLocation);
  let cityCircleLink = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=7&appid=${apiKey}&units=imperial`;
  axios.get(cityCircleLink).then(nearCities);
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiLink).then(getForecast);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(handleLocation);
}

button.addEventListener("click", getLocation);
citySearch.addEventListener("submit", sayCity);
