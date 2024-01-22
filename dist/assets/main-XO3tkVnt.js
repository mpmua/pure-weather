import "./global-cJUBQubs.js";
document.getElementById("page-wrap");
const refreshIconWrapper = document.querySelector(
  ".pull-down-icon-wrapper-hidden"
);
const menuIcon = document.querySelector(".menu-icon");
const sideMenu = document.querySelector(".side-menu-hidden");
document.getElementById("city-and-temp");
const cityDiv = document.querySelector(".city");
const tempDiv = document.querySelector(".temp");
const currentForecastDiv = document.querySelector(".current-forecast");
document.querySelector(".current-forecast-icon");
const minMaxCurrentDayTemp = document.querySelector(
  ".min-max-current-day-temp"
);
const weatherAlertDiv = document.querySelector(".weather-alert");
const dailyTempSection = document.querySelector(".daily-temp-section");
const hourlyTempSection = document.getElementById("hourly-temp-section");
const locationsUl = document.querySelector(".location-ul");
const arrowIcon = document.querySelector(".fa-chevron-down");
const moreWeatherInfoWrap = document.querySelector(".more-weather-info");
document.querySelector(".alert-sender-name");
document.querySelector(".alert-event-name");
document.querySelector(".alert-description");
const sideMenuItemsWrap = document.querySelector(".side-menu-items-wrap");
let bodyBackgroundColor;
if (localStorage.getItem("unit") || localStorage.getItem("temp-unit") === "ms" || localStorage.getItem("temp-unit") === "kmh" || localStorage.getItem("temp-unit") === "mph") {
  alert("Please re-select temperature and windspeed units from settings page");
  window.location.replace("settings.html");
}
let pStart = { x: 0, y: 0 };
let pStop = { x: 0, y: 0 };
function swipeStart(e) {
  if (typeof e["targetTouches"] !== "undefined") {
    let touch = e.targetTouches[0];
    pStart.x = touch.screenX;
    pStart.y = touch.screenY;
  } else {
    pStart.x = e.screenX;
    pStart.y = e.screenY;
  }
}
function swipeEnd(e) {
  if (typeof e["changedTouches"] !== "undefined") {
    let touch = e.changedTouches[0];
    pStop.x = touch.screenX;
    pStop.y = touch.screenY;
  } else {
    pStop.x = e.screenX;
    pStop.y = e.screenY;
  }
  swipeCheck();
}
function swipeCheck() {
  let changeY = pStart.y - pStop.y;
  let changeX = pStart.x - pStop.x;
  if (isPullDown(changeY, changeX)) {
    refreshIconWrapper.classList.add("pull-down-icon-wrapper-visible");
    fetchCityData();
    setTimeout(() => {
      refreshIconWrapper.classList.remove("pull-down-icon-wrapper-visible");
    }, 2e3);
  }
}
function isPullDown(dY, dX) {
  return dY < 0 && (Math.abs(dX) <= 100 && Math.abs(dY) >= 250 || Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60);
}
document.addEventListener(
  "touchstart",
  function(e) {
    swipeStart(e);
  },
  false
);
document.addEventListener(
  "touchend",
  function(e) {
    swipeEnd(e);
  },
  false
);
let colorObjects = {
  rain: "linear-gradient(135deg, #486da3 10%, #30739f 100%)",
  thunderstorm: "linear-gradient( 135deg, #317d87 10%, #122415 100%)",
  drizzle: "linear-gradient( 135deg, #707ebb 10%, #1D6FA3 100%)",
  haze: "linear-gradient( 135deg, #bb6032 10%, #EA5455 100%)",
  snow: "linear-gradient( 135deg, #391d85 10%, #af65a8 100%)",
  atmosphere: "linear-gradient( 135deg, #2c35d9 10%, #e50404 100%)",
  clear: "linear-gradient(135deg, rgb(0, 138, 255) 10%, rgb(10 128 185) 100%)",
  clouds: "linear-gradient(135deg, rgb(163, 163, 163) 10%, rgb(93, 104, 136) 100%)"
};
function rotateArrow(rotate, transform, classToRemove, classToAdd) {
  arrowIcon.style.transform = rotate;
  arrowIcon.style.transition = transform;
  moreWeatherInfoWrap.classList.remove(classToRemove);
  moreWeatherInfoWrap.classList.add(classToAdd);
}
arrowIcon.addEventListener("click", () => {
  if (moreWeatherInfoWrap.classList == "more-weather-info") {
    rotateArrow(
      "rotate(180deg)",
      "transform 500ms",
      "more-weather-info",
      "more-weather-info-visible"
    );
    savedLocations = [];
    savedLocations.push({
      longitude: 9.189982,
      latitude: 45.464203,
      city: "Milan"
    });
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  } else if (moreWeatherInfoWrap.classList == "more-weather-info-visible") {
    rotateArrow(
      "rotate(0deg)",
      "transform 500ms",
      "more-weather-info-visible",
      "more-weather-info"
    );
  }
});
var apiKey = localStorage.getItem("apiKey", apiKey);
let currentLong;
let currentLat;
let locallyStoredCities;
let selectedLocation;
let selectedTempUnit;
let selectedWindSpeedUnit;
let selectedCity;
let dict = {
  "01d": "wi-day-sunny",
  "02d": "wi-day-cloudy",
  "03d": "wi-cloud",
  "04d": "wi-cloudy",
  "09d": "wi-showers",
  "10d": "wi-day-rain-mix",
  "11d": "wi-thunderstorm",
  "13d": "wi-snow",
  "50d": "wi-fog",
  "01n": "wi-night-clear",
  "02n": "wi-night-alt-cloudy",
  "03n": "wi-night-alt-cloudy-high",
  "04n": "wi-cloudy",
  "09n": "wi-night-alt-sprinkle",
  "10n": "wi-night-alt-showers",
  "11n": "wi-night-alt-thunderstorm",
  "13n": "wi-night-alt-snow",
  "50n": "wi-night-fog"
};
function fetchCityData() {
  fetch(selectedLocation).then((response) => {
    return response.json();
  }).then((data) => {
    if (data.alerts) {
      weatherAlertDiv.style.display = "block";
      weatherAlertDiv.innerHTML = "";
      weatherAlertDiv.innerHTML = `<h1><span><i class="fas fa-exclamation-triangle"></i></span>Weather Alert</h1>
          <div class="alert-type-div">
          
          <p>Alert Type: </p>
         
          </div>
          
          <div class="read-more-text-wrapper">
           <p class="read-more-text">Read More</p>
           <i class="fas fa-chevron-right"></i>
          </div>
           
          `;
      let readMoreText = document.querySelector(".read-more-text");
      let readMoreTextWrapper = document.querySelector(
        ".read-more-text-wrapper"
      );
      for (let y = 0; y < data.alerts.length; y++) {
        const alertTypeText = document.createElement("div");
        const alertTypeDiv = document.querySelector(".alert-type-div");
        alertTypeDiv.setAttribute("class", "alert-type-div");
        alertTypeText.innerHTML = `<p>${data.alerts[y].event}</p>`;
        alertTypeText.setAttribute("class", "alert-type-text");
        alertTypeDiv.appendChild(alertTypeText);
        let weatherAlertTextWrap = document.createElement("div");
        weatherAlertTextWrap.setAttribute(
          "class",
          "weather-alert-text-wrap-hidden"
        );
        readMoreTextWrapper.addEventListener("click", () => {
          if (weatherAlertTextWrap.classList == "weather-alert-text-wrap-hidden") {
            weatherAlertTextWrap.classList = "weather-alert-text-wrap-visible";
            readMoreText.innerText = "Read Less";
            weatherAlertDiv.style.borderRadius = "0";
            weatherAlertDiv.style.transition = "borderRadius 500ms";
          } else if (weatherAlertTextWrap.classList == "weather-alert-text-wrap-visible") {
            weatherAlertTextWrap.classList = "weather-alert-text-wrap-hidden";
            readMoreText.innerText = "Read More";
            weatherAlertDiv.style.borderRadius = "0.5rem";
            weatherAlertDiv.style.transition = "borderRadius 500ms";
          }
        });
        weatherAlertTextWrap.innerHTML = `         
          <p class="alert-sender-name"><strong>Issued By:</strong> ${data.alerts[y].sender_name}</p>
          <p class="alert-event-name"><strong>Alert Type:</strong> ${data.alerts[y].event}</p><br>
          <p class="alert-description"><strong>Description:</strong> ${data.alerts[y].description}</p>
          <br>`;
        weatherAlertDiv.appendChild(weatherAlertTextWrap);
      }
    } else {
      weatherAlertDiv.innerHTML = "";
      weatherAlertDiv.style.display = "none";
    }
    let weatherIconCurrent = data.current.weather[0].icon;
    let dataCurrentTemp = data.current.temp;
    let dataDailyTempMaxMain = data.daily[0].temp.max;
    let dataDailyTempMinMain = data.daily[0].temp.min;
    let feelsLikeTemp = data.current.feels_like;
    let dewPoint = data.current.dew_point;
    if (localStorage.getItem("temp-unit") == "metric-btn") {
      dataCurrentTemp = (data.current.temp - 32) / 1.8;
      dataDailyTempMaxMain = (data.daily[0].temp.max - 32) / 1.8;
      dataDailyTempMinMain = (data.daily[0].temp.min - 32) / 1.8;
      feelsLikeTemp = (data.current.feels_like - 32) / 1.8;
      dewPoint = (data.current.dew_point - 32) / 1.8;
    }
    cityDiv.innerHTML = selectedCity;
    let dataCurrentWeatherMain = data.current.weather[0].main;
    if (dataCurrentWeatherMain == "Thunderstorm") {
      dataCurrentWeatherMain = "Thunder";
    }
    tempDiv.innerHTML = `${Math.round(
      dataCurrentTemp
    )}<span class="temp-unit-current-temp"><i class="far fa-circle"></i></span>`;
    currentForecastDiv.innerHTML = `${dataCurrentWeatherMain} <i class="wi ${dict[weatherIconCurrent]}"></i>`;
    minMaxCurrentDayTemp.innerHTML = minMaxCurrentDayTemp.innerHTML = `<div class="current-max-min-temp-wrapper">
          <div class="current-max-temp">${Math.round(
      dataDailyTempMaxMain
    )}<span class="temp-unit-current-max-temp-unit"><i class="far fa-circle"></i></span><span>${selectedTempUnit}</span></div>
          <div class="current-min-temp">${Math.round(
      dataDailyTempMinMain
    )}<span class="temp-unit-current-min-temp-unit"><i class="far fa-circle"></i></span><span>${selectedTempUnit}</span>
       </div>`;
    if (data.current.temp > 99)
      ;
    let dataCurrenWindSpeed = data.current.wind_speed;
    selectedWindSpeedUnit = `MPH`;
    if (localStorage.getItem("speed-unit") == "kmh-btn") {
      selectedWindSpeedUnit = `KMH`;
      dataCurrenWindSpeed = data.current.wind_speed * 1.609344;
    } else if (localStorage.getItem("speed-unit") == "ms-btn") {
      selectedWindSpeedUnit = `M/S`;
      dataCurrenWindSpeed = data.current.wind_speed / 2.237;
    }
    document.querySelector(".feels-like-stat").innerHTML = Math.round(feelsLikeTemp) + ` ${selectedTempUnit}`;
    document.querySelector(".wind-stat").innerHTML = Math.round(dataCurrenWindSpeed) + ` ${selectedWindSpeedUnit}`;
    document.querySelector(".humidity-stat").innerHTML = Math.round(data.current.humidity) + "%";
    document.querySelector(".pressure-stat").innerHTML = Math.round(data.current.pressure) + " hPa";
    document.querySelector(".uv-stat").innerHTML = Math.round(
      data.current.uvi
    );
    document.querySelector(".dew-point-stat").innerHTML = Math.round(dewPoint) + ` ${selectedTempUnit}`;
    if (data.current.weather[0].main == "Rain") {
      bodyBackgroundColor = colorObjects.rain;
    } else if (data.current.weather[0].main == "Thunderstorm") {
      bodyBackgroundColor = colorObjects.thunderstorm;
    } else if (data.current.weather[0].main == "Drizzle") {
      bodyBackgroundColor = colorObjects.drizzle;
    } else if (data.current.weather[0].main == "Haze") {
      bodyBackgroundColor = colorObjects.haze;
    } else if (data.current.weather[0].main == "Snow") {
      bodyBackgroundColor = colorObjects.snow;
    } else if (data.current.weather[0].main == "Atmosphere") {
      bodyBackgroundColor = colorObjects.atmosphere;
    } else if (data.current.weather[0].main == "Clear") {
      bodyBackgroundColor = colorObjects.clear;
    } else if (data.current.weather[0].main == "Clouds") {
      bodyBackgroundColor = colorObjects.clouds;
    } else {
      bodyBackgroundColor = "linear-gradient( 135deg, #c065c7 10%, #1904E5 100%)";
    }
    document.body.style.backgroundImage = bodyBackgroundColor;
    localStorage.setItem("bgcolor", bodyBackgroundColor);
    hourlyTempSection.innerHTML = "";
    for (let h = 0; h < 24; h++) {
      let hourlyTemp = data.hourly[h].temp;
      if (localStorage.getItem("temp-unit") == "metric-btn") {
        hourlyTemp = (data.hourly[h].temp - 32) / 1.8;
      }
      let hourlyTempDiv = document.createElement("div");
      hourlyTempDiv.setAttribute("class", "hourly-divs");
      let hourObj = new Date(data.hourly[h].dt * 1e3);
      let hours = hourObj.getUTCHours();
      let formattedTime = hours.toString().padStart(2, "0") + ":00";
      if (h === 0) {
        formattedTime = "Now";
      }
      let weatherIconHourly = data.hourly[h].weather[0].icon;
      let hourlyPopValue = Math.round(data.hourly[h].pop * 100);
      let hourlyPop;
      if (hourlyPopValue > 0) {
        hourlyPop = Math.round(data.hourly[h].pop * 100) + "%";
      } else if (hourlyPopValue == 0) {
        hourlyPop = "";
      }
      hourlyTempDiv.innerHTML = `
        <div class="single-hour-time">${formattedTime}</div>
        <div class="single-hour-icon"><i class="wi ${dict[weatherIconHourly]}"></i></div>
        <div class="single-hourly-temp"><div class="single-hour-temp-number">${Math.round(
        hourlyTemp
      )}</div><span class="single-hour-circle-icon">&#3664;</span></div>
        <div class="single-hour-pop">${hourlyPop}</div>`;
      hourlyTempSection.appendChild(hourlyTempDiv);
    }
    dailyTempSection.innerHTML = "";
    for (let d = 0; d < 8; d++) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      let dayName = new Date(data.daily[d].dt * 1e3).getDay();
      let singleDayName = days[dayName];
      if (d == 0) {
        singleDayName = "Today";
      }
      let dataDailyTempMax = data.daily[d].temp.max;
      let dataDailyTempMin = data.daily[d].temp.min;
      if (localStorage.getItem("temp-unit") == "metric-btn") {
        dataDailyTempMax = (data.daily[d].temp.max - 32) / 1.8;
        dataDailyTempMin = (data.daily[d].temp.min - 32) / 1.8;
      }
      let dailyWeatherDescription = data.daily[d].weather[0].description;
      let dailyWeatherDescriptionSplit = dailyWeatherDescription.split(" ");
      for (let t = 0; t < dailyWeatherDescriptionSplit.length; t++) {
        dailyWeatherDescriptionSplit[t].charAt(0).toUpperCase() + dailyWeatherDescriptionSplit[t].slice(1);
      }
      let dailyPopValue = Math.round(data.daily[d].pop * 100);
      let dailyPop;
      if (dailyPopValue > 0) {
        dailyPop = Math.round(data.daily[d].pop * 100) + "%";
      } else if (dailyPopValue == 0) {
        dailyPop = "";
      }
      let weatherIconDaily = data.daily[d].weather[0].icon;
      dailyTempSection.innerHTML += `
          
            <tr>
              <td class="daily-temp-day-text">${singleDayName}</td>
              <td class="daily-weather-icon" colspan="1"><i class="wi  ${dict[weatherIconDaily]}"></i></td>
              <td class="daily-pop-text">${dailyPop}</span</td>
              <td class="daily-max-text">${Math.round(
        dataDailyTempMax
      )}<span class="daily-circle-icon">&#3664;</span></td>
              <td class="daily-min-text">${Math.round(
        dataDailyTempMin
      )}<span class="daily-circle-icon" style="opacity: 0.6">&#3664;</span></td>
            </tr>
      
          `;
    }
  }).catch((err) => {
    console.log("Error: " + err);
  });
}
function determineTempUnit() {
  selectedLocation = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLong}&units=imperial&appid=${apiKey}`;
  if (localStorage.getItem("temp-unit") == "metric-btn") {
    selectedTempUnit = `C`;
  } else if (localStorage.getItem("temp-unit") == "imperial-btn") {
    selectedTempUnit = `F`;
    selectedWindSpeedUnit = `mph`;
  }
}
let lastLocationArray;
if (localStorage.getItem("savedLocations") !== null) {
  locallyStoredCities = JSON.parse(localStorage.getItem("savedLocations"));
  lastLocationArray = [];
  for (let c = 0; c < locallyStoredCities.length; c++) {
    let sideMenuCityLi = document.createElement("div");
    sideMenuCityLi.setAttribute("class", "side-menu-location-li");
    sideMenuCityLi.setAttribute("id", c);
    sideMenuCityLi.innerHTML = locallyStoredCities[c].city;
    locationsUl.appendChild(sideMenuCityLi);
    setTimeout(function() {
      if (sideMenuCityLi.innerHTML == cityDiv.innerHTML) {
        sideMenuCityLi.style.background = "rgba(0, 0, 0, 0.5)";
      }
    }, 500);
    let clicked;
    document.getElementById(c).addEventListener("click", (e) => {
      clicked = e.target.id;
      for (let w = 0; w < locallyStoredCities.length; w++) {
        document.getElementById(w).style.backgroundColor = "";
      }
      localStorage.setItem("cityLiColor", "rgba(0, 0, 0, 0.5)");
      currentLong = locallyStoredCities[clicked].longitude;
      currentLat = locallyStoredCities[clicked].latitude;
      selectedCity = locallyStoredCities[clicked].city;
      for (let l = 0; l < lastLocationArray.length; l++) {
        lastLocationArray.splice(l);
      }
      lastLocationArray.push({
        currentLong,
        currentLat,
        selectedCity,
        lastClicked: clicked
      });
      document.getElementById(clicked).style.background = "rgba(0, 0, 0, 0.5)";
      localStorage.setItem(
        "lastLocationArray",
        JSON.stringify(lastLocationArray)
      );
      determineTempUnit();
      fetchCityData();
    });
  }
} else if (localStorage.getItem("savedLocations") == null || localStorage.getItem("speed-unit") == null) {
  bodyBackgroundColor = "linear-gradient(135deg, rgb(163, 163, 163) 10%, rgb(93, 104, 136) 100%)";
  localStorage.setItem("bgcolor", bodyBackgroundColor);
  window.location.replace("settings.html");
}
if (localStorage.getItem("lastLocationArray") !== null) {
  lastLocationArray = JSON.parse(localStorage.getItem("lastLocationArray"));
  currentLong = lastLocationArray[0].currentLong;
  currentLat = lastLocationArray[0].currentLat;
  selectedCity = lastLocationArray[0].selectedCity;
  lastLocationArray[0].lastClicked;
  if (lastLocationArray.lastClicked !== null)
    ;
  else if (lastLocationArray.lastClicked == null) {
    document.getElementById(0).style.background = "rgba(0, 0, 0, 0.5)";
  }
  determineTempUnit();
  fetchCityData();
}
menuIcon.addEventListener("click", () => {
  if (sideMenu.className == "side-menu-hidden") {
    sideMenu.classList = "side-menu-visible";
    sideMenuItemsWrap.style.display = "block";
  } else {
    sideMenu.classList = "side-menu-hidden";
  }
});
