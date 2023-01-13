// Feature 1

function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let h2 = document.querySelector("h2");
h2.innerHTML = formatDate();

// Feature 2

function showLocalTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  console.log(`${temperature}°C`);
  let tempcel = document.querySelector("#degrees");
  tempcel.innerHTML = `${temperature}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
}

function cityForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  console.log(cityInput.value);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let city = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocalTemperature);
}

let form = document.querySelector("#location-submit");
form.addEventListener("submit", cityForm, showLocalTemperature);

// current location button

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  console.log(`${temperature}°C`);
  let localTemp = document.querySelector("#degrees");
  localTemp.innerHTML = `${temperature}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Current Location`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${response.data.wind.speed}`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey2 = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey2}&units=metric`;
  // let apiUrl3 = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey2}&units=metric`;
  axios.get(`${apiUrl2}&appid=${apiKey2}`).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
