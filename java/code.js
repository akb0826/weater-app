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
let dayOne = document.querySelector("#day-one");
dayOne.innerHTML = "Loading...";
let dayTwo = document.querySelector("#day-two");
dayTwo.innerHTML = "Loading...";
let dayThree = document.querySelector("#day-three");
dayThree.innerHTML = "Loading...";
let dayFour = document.querySelector("#day-four");
dayFour.innerHTML = "Loading...";
let dayFive = document.querySelector("#day-five");
dayFive.innerHTML = "Loading...";
let daySix = document.querySelector("#day-six");
daySix.innerHTML = "Loading...";

let citySearch = document.querySelector("#search-form");
let city = document.querySelector("#city-input");
let apiKey = "7473fbdcedf29ba4a4d8e68e3bd90672";
let button = document.querySelector("button");
let mainCity = document.querySelector("#main-city-day");
let mainTemp = document.querySelector("#main-day-temp");
let mainWeather = document.querySelector("#main-day-weather");

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
  fahrenheitTemp = response.data.main.temp;
  let temperature = Math.round(fahrenheitTemp);
  let weather = response.data.weather[0].description;
  let mainIcon = document.querySelector("#main-day-icon");
  let lat = Math.round(response.data.coord.lat);
  let lon = Math.round(response.data.coord.lon);
  let cityCircleLink = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=imperial`;

  mainTemp.innerHTML = `${temperature}°`;
  mainWeather.innerHTML = `${weather}`;
  mainIcon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  celciusButton.classList.remove("active");
  axios.get(cityCircleLink).then(nearCities);
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

  cityOne.innerHTML = response.data.list[0].name + " ";
  cityTwo.innerHTML = response.data.list[1].name + " ";
  cityThree.innerHTML = response.data.list[2].name + " ";
  cityFour.innerHTML = response.data.list[3].name + " ";
  cityFive.innerHTML = response.data.list[4].name + " ";

  tempOne.innerHTML = Math.round(response.data.list[0].main.temp) + "°F";
  tempTwo.innerHTML = Math.round(response.data.list[1].main.temp) + "°F";
  tempThree.innerHTML = Math.round(response.data.list[2].main.temp) + "°F";
  tempFour.innerHTML = Math.round(response.data.list[3].main.temp) + "°F";
  tempFive.innerHTML = Math.round(response.data.list[4].main.temp) + "°F";
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
  celciusButton.classList.remove("active");
}
function handleLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let coordLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(coordLink).then(sayLocation);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(handleLocation);
}
function sayCelciusTemp(event) {
  event.preventDefault();
  let celciusTemp = (fahrenheitTemp - 32) * (5 / 9);
  let temperatureElement = document.querySelector("#main-day-temp");
  if (fahrenheitTemp == null) {
    temperatureElement.innerHTML = "...";
  } else {
    temperatureElement.innerHTML = Math.round(celciusTemp) + "°";
    fahrenheitButton.classList.remove("active");
    celciusButton.classList.add("active");
  }
}
function sayFahrenheitTemp(event) {
  let temperatureElement = document.querySelector("#main-day-temp");
  if (fahrenheitTemp == null) {
    temperatureElement.innerHTML = "...";
  } else {
    temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°";
    celciusButton.classList.remove("active");
    fahrenheitButton.classList.add("active");
  }
}
button.addEventListener("click", getLocation);
citySearch.addEventListener("submit", sayCity);

let fahrenheitTemp = null;

let celciusButton = document.querySelector("#main-day-temp-c");
celciusButton.addEventListener("click", sayCelciusTemp);
let fahrenheitButton = document.querySelector("#main-day-temp-f");
fahrenheitButton.addEventListener("click", sayFahrenheitTemp);
