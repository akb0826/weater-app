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
if (minute > 10) {
  let minute = `0${minute}`;
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
  let temperature = Math.round(response.data.main.temp);
  let weather = response.data.weather[0].description;
  mainTemp.innerHTML = `${temperature}°`;
  mainWeather.innerHTML = `${weather}`;
}
function sayLocation(response) {
  console.log(response);
  mainCity.innerHTML = response.data.name;
  let locationTemp = Math.round(response.data.main.temp);
  let locationWeather = response.data.weather[0].description;
  mainTemp.innerHTML = `${locationTemp}°`;
  mainWeather.innerHTML = `${locationWeather}`;
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
button.addEventListener("click", getLocation);
citySearch.addEventListener("submit", sayCity);
