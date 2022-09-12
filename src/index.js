function formatCurrentTime(currentData) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[currentData.getDay()];
  let date = currentData.getDate();
  let month = months[currentData.getMonth()];
  let hours = currentData.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentData.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = currentData.getFullYear();
  let currentDateTime = `${day}, ${date} ${month} ${year} <br /> ${hours}:${minutes}`;
  let currentTimeLi = document.querySelector("#current-time");
  currentTimeLi.innerHTML = currentDateTime;
}

function changeSeasons(currentMonth) {
  let month = currentMonth.getMonth();
  let bodyBackground = document.querySelector("body");
  let appBackground = document.querySelector(".weather-app");
  if (month === 11 || month < 3) {
    bodyBackground.classList.add("winter") &&
      appBackground.classList.add("winter");
  } else if (month > 2 && month < 6) {
    bodyBackground.classList.add("spring");
  } else if (month > 5 && month < 8) {
    bodyBackground.classList.add("summer");
  } else if (month > 7 && month < 11) {
    bodyBackground.classList.add("autumn");
  }
}

function displayWeatherconditions(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature-data").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-details").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
}

function searchCity(city) {
  let apiKey = "738993d32099f81cb584e637be73ea30";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherconditions);
}

function handleSubmit(event) {
  event.preventDefault();
  if (document.querySelector("#search-form").value) {
    let city = document.querySelector("#search-form").value;
    searchCity(city);
  } else {
    alert("Enter a city, please!");
  }
}

function searchForCurrentlocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiKey = "738993d32099f81cb584e637be73ea30";
  let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherconditions);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchForCurrentlocation);
}

formatCurrentTime(new Date());
changeSeasons(new Date());
let submitForm = document.querySelector("#submit-form");
submitForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#search-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
