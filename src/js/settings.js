// import citiesJsonFile from "./current_city_list.json";
// import citiesJsonFile from "./data.json";
import citiesJsonFile from "../js/cities_data";
console.log(citiesJsonFile);
// const citiesJsonFile = "../";

const cityListWrap = document.getElementById("city-list-wrap");
const currentLocationButton = document.querySelector(".current-location-btn");
const addLocationButton = document.querySelector(".add-location-btn");
const cityMatchList = document.querySelector(".city-match-list");
const apiInputValue = document.querySelector(".api-input");
const apiSuccessOrFailText = document.querySelector(
  ".api-success-or-error-text"
);
const addLocationPopUpBox = document.getElementById("add-location-pop-up");
const addLocationSubmitBtn = document.querySelector(".add-location-submit-btn");
const cityField = document.getElementById("city-name-value");
const latitudeField = document.getElementById("latitude-name-value");
const longitudeField = document.getElementById("longitude-name-value");
const locationManualEntry = document.querySelector(".location-manual-entry");

const searchManualBtn = document.querySelector(".add-location-add-btn");
const cancelBtn = document.querySelector(".add-location-cancel-btn");

if (localStorage.getItem("temp-unit") == null) {
  localStorage.setItem("temp-unit", "imperial-btn");
}

if (localStorage.getItem("speed-unit") == null) {
  localStorage.setItem("speed-unit", "mph-btn");
}

let owmCityJsonFile = citiesJsonFile;
// console.log(owmCityJsonFile);

fetch(citiesJsonFile)
  // fetch("./current_city_list.json")

  .then((response) => {
    // console.log(response.json());
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // owmCityJsonFile = data;
    console.log("hi");
    console.log(owmCityJsonFile);
  });

let bodyBackgroundColor;
if (localStorage.getItem("bgcolor") == null) {
  bodyBackgroundColor =
    "linear-gradient(135deg, rgb(163, 163, 163) 10%, rgb(93, 104, 136) 100%)";
  localStorage.setItem("bgcolor", bodyBackgroundColor);
} else if (localStorage.getItem("bgcolor") !== null) {
  bodyBackgroundColor = localStorage.getItem("bgcolor", bodyBackgroundColor);
}

document.body.style.backgroundImage = bodyBackgroundColor;

let apiKey;
if (localStorage.getItem("apiKey", apiKey) !== null) {
  apiKey = localStorage.getItem("apiKey", apiKey);
  apiInputValue.value = apiKey;
} else if (localStorage.getItem("apiKey", apiKey) == null) {
  apiKey = `6b2ce66a0708555cf5ca3fe99d0f1274`;
  apiInputValue.value = apiKey;
  localStorage.setItem("apiKey", apiKey);
}

function successOrErrorMsg(border, msg, msgColor) {
  apiSuccessOrFailText.style.visibility = "visible";
  apiInputValue.style.border = border;
  apiSuccessOrFailText.innerHTML = msg;
  apiSuccessOrFailText.style.color = msgColor;
}

apiInputValue.addEventListener("input", () => {
  apiKey = apiInputValue.value;
  localStorage.setItem("apiKey", apiKey);

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=5128581&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod == "200") {
        successOrErrorMsg("1px solid green", "Success", "green");
      } else if (data.cod == "401") {
        successOrErrorMsg("1px solid red", "Invalid API Key", "red");
      }
    });
});

const speedBtnsArray = document.querySelectorAll("#speed-btn");
const tempUnitsArray = document.querySelectorAll("#temp-btn");

function setSpeedAndTempBtns(array, storedValue) {
  array.forEach((unit) => {
    localStorage.getItem(storedValue) == unit.className
      ? (unit.style.background = "rgba(0, 0, 0, 0.1)")
      : null;
  });
}

setSpeedAndTempBtns(speedBtnsArray, "speed-unit");
setSpeedAndTempBtns(tempUnitsArray, "temp-unit");

function addMeasurementAndTempUnitEventListeners(arr, unitType) {
  arr.forEach((btn) => {
    btn.addEventListener("click", () => {
      arr.forEach((button) => {
        button.style.background = "";
      });
      btn.style.background = "rgba(0, 0, 0, 0.1)";
      localStorage.setItem(unitType, btn.className);
    });
  });
}

addMeasurementAndTempUnitEventListeners(speedBtnsArray, "speed-unit");
addMeasurementAndTempUnitEventListeners(tempUnitsArray, "temp-unit");

function filterCities() {
  searchManualBtn.style.visibility = "hidden";

  if (cityField.value.length > 0) {
    cityMatchList.style.display = "block";

    filteredOwmCityJsonFile = owmCityJsonFile.filter((value) => {
      const regex = new RegExp(`^${cityField.value}`, "gi");

      return value.name.match(regex);
    });

    let mappedOwmCityJsonFile = filteredOwmCityJsonFile
      .map((value) => {
        return `<section class="city-list-li">
       <div class="city-name-search">${value.name}</div>
       <div class="country-name-search">${value.country}</div>
       <small class="coords">${value.lon},${value.lat}</small>
       </section>`;
      })
      .join(" ");

    cityMatchList.innerHTML = mappedOwmCityJsonFile;
  } else {
    cityMatchList.style.display = "none";
    filteredOwmCityJsonFile = [];
    searchManualBtn.style.visibility = "visible";
  }
}

addLocationButton.addEventListener("click", () => {
  addLocationPopUpBox.style.display = "block";

  let filteredOwmCityJsonFile;
  let cityFieldSearchLi = document.createElement("li");

  cityField.addEventListener("input", filterCities);

  cityMatchList.addEventListener("click", (e) => {
    const latlonArray =
      e.target.parentElement.lastElementChild.innerHTML.split(",");

    if (
      e.target.classList == "coords" ||
      e.target.classList == "city-name-search" ||
      e.target.classList == "country-name-search"
    ) {
      cityField.value = e.target.parentElement.firstElementChild.innerHTML;
      searchManualBtn.style.visibility = "visible";
    } else if (e.target.classList == "city-list-li") {
      cityField.value = e.target.firstElementChild.innerHTML;
      searchManualBtn.style.visibility = "visible";
    }

    cityMatchList.style.display = "none";
    longitudeField.value = latlonArray[0].replaceAll('"', "");
    latitudeField.value = latlonArray[1].replaceAll('"', "");
  });
});

function clearManualSearchTextFields() {
  cityField.value = "";
  latitudeField.value = "";
  longitudeField.value = "";
}

function searchManualBtnFunc(display, innerHTML) {
  cityField.removeEventListener("input", filterCities);
  locationManualEntry.style.display = display;
  searchManualBtn.innerHTML = innerHTML;
  clearManualSearchTextFields();
}

searchManualBtn.addEventListener("click", () => {
  if (locationManualEntry.style.display == "none") {
    searchManualBtnFunc("block", "AUTO");
  } else if (locationManualEntry.style.display == "block") {
    searchManualBtnFunc("none", "MANUAL");
  }
});

cancelBtn.addEventListener("click", () => {
  clearManualSearchTextFields();
  addLocationPopUpBox.style.display = "none";
});

function checkForDuplicateCity(city) {
  for (let i = 0; i < savedLocations.length; i++) {
    if (savedLocations[i].city == city) {
      alert("Location already exists");
      return true;
    }
  }
}

addLocationSubmitBtn.addEventListener("click", () => {
  if (
    cityField.value !== "" &&
    latitudeField.value !== "" &&
    longitudeField.value !== ""
  ) {
    let userEnteredLatitude = document
      .getElementById("latitude-name-value")
      .value.replaceAll('"', "");
    let userEnteredLongitude = document
      .getElementById("longitude-name-value")
      .value.replaceAll('"', "");
    let userEnteredCity = document
      .getElementById("city-name-value")
      .value.replaceAll('"', "");

    if (checkForDuplicateCity(userEnteredCity)) {
      return;
    }

    savedLocations.push({
      longitude: userEnteredLongitude,
      latitude: userEnteredLatitude,
      city: userEnteredCity,
    });
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

    currentCity = userEnteredCity;
    currentLong = userEnteredLongitude;
    currentLat = userEnteredLatitude;
    selectedCity = currentCity;
    lastLocationArray.push({
      currentLong: currentLong,
      currentLat: currentLat,
      selectedCity: selectedCity,
    });
    localStorage.setItem(
      "lastLocationArray",
      JSON.stringify(lastLocationArray)
    );

    addLocationPopUpBox.style.display = "none";
    checkForLocalData();
    clearManualSearchTextFields();
  }
});

let lastLocationArray = [];
currentLocationButton.addEventListener("click", () => {
  currentLocationButtonTxt.innerHTML = ` <div class="loader"></div>`;
  currentLocationButton.disabled = true;

  const options = {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 0,
  };

  function positionSuccess(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    let cityName = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;

    currentLocationButtonTxt.innerHTML = "Current Location";

    fetch(cityName)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        currentCity = data[0].name;
        currentLong = longitude;
        currentLat = latitude;
        selectedCity = currentCity;
        lastLocationArray.push({
          currentLong: currentLong,
          currentLat: currentLat,
          selectedCity: selectedCity,
        });

        if (checkForDuplicateCity(selectedCity)) {
          return;
        }

        localStorage.setItem(
          "lastLocationArray",
          JSON.stringify(lastLocationArray)
        );
        savedLocations.push({
          longitude: longitude,
          latitude: latitude,
          city: currentCity,
        });
        localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
        checkForLocalData();
      });

    userLocation = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    currentLocationButton.disabled = false;
  }

  function positionError(error) {
    currentLocationButton.disabled = false;
    currentLocationButtonTxt.innerHTML = "Current Location";

    if (error.code === 1) {
      alert(
        "Unable to obtain location permission, please ensure location permission is turned on within your system settings"
      );
    } else if (error.code === 2) {
      alert("Unable to obtain position, please try adding location manually");
    } else if (error.code === 3) {
      alert("Request timed out");
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      positionSuccess,
      positionError,
      options
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

const currentLocationButtonTxt = document.querySelector(
  ".current-location-btn-text"
);

let longitude;
let latitude;
let userLocation;
let currentCity;
let savedLocations = [];

function checkForLocalData() {
  cityListWrap.innerHTML = "";

  if (localStorage.getItem("savedLocations") == null) {
    savedLocations = [];
    alert(`The API key allows you to receive weather data from Openweather, this is a public key however and there is a limit for publicly accessible calls, it is strongly recommended that you sign up for your own key
  
Please also note that your location data is only sent to openweather so they can provide you with weather data for your area.`);
  } else if (localStorage.getItem("savedLocations") !== null) {
    savedLocations = JSON.parse(localStorage.getItem("savedLocations"));

    for (let s = 0; s < savedLocations.length; s++) {
      if (savedLocations[s].city) {
        let newCityLiDiv = document.createElement("div");
        //     newCityLiDiv.setAttribute("class", "new-city-li")
        // newCityLiDiv.style.display = "block";
        // newCityLiDiv.style.height = "0%"
        newCityLiDiv.innerHTML = `
        <section class="single-city-section-wrapper">
        <li class="single-city-li"><p>${savedLocations[s].city}</p> <span class="city-x-icon" id=${s}>x</span></li>
        </section>
        `;

        let singleCitySectionWrapper = document.querySelector(
          ".single-city-section-wrapper"
        );
        cityListWrap.appendChild(newCityLiDiv);

        document.getElementById(s).addEventListener("click", (e) => {
          newCityLiDiv.style.opacity = "0.5";
          newCityLiDiv.style.transform = "translateX(-120%)";
          newCityLiDiv.style.transition = "transform .7s";

          newCityLiDiv.addEventListener("transitionend", () => {
            newCityLiDiv.remove();
          });

          savedLocations.splice(e.target.id, 1);
          localStorage.setItem(
            "savedLocations",
            JSON.stringify(savedLocations)
          );
        });
      }
    }
  }
}

checkForLocalData();
