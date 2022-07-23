const settingsPageWrap = document.getElementById("settings-page-wrap");
const cityListWrap = document.getElementById("city-list-wrap");
const locationButtonswrapper = document.getElementById("location-buttons-wrap");
const currentLocationButton = document.querySelector(".current-location-btn");
const addLocationButton = document.querySelector(".add-location-btn");
const cityMatchList = document.querySelector(".city-match-list");
const apiInputValue = document.querySelector(".api-input");
const testApiButton = document.querySelector(".test-api-btn");
const hourlyTemptSect = document.getElementById("hourly-temp-section");
const togglesSection = document.getElementById("toggles-wrap");
const standardBtn = document.querySelector(".standard-btn");
const metricBtn = document.querySelector(".metric-btn");
const imperialBtn = document.querySelector(".imperial-btn");
const apiSuccessOrFailText = document.querySelector(".api-success-or-error-text");
// const questionPopUp = document.querySelector(".fa-question-circle");
const unitHelpText = document.querySelector(".unit-help-text");
const kmhBtn = document.querySelector(".kmh-btn");
const mphBtn = document.querySelector(".mph-btn");
const msBtn = document.querySelector(".ms-btn");
// const formErrorText = document.querySelector(".form-error-text");

// const owmCityJsonFile = require("/city.list.json")

if (localStorage.getItem("savedLocations") == null) {
  
  
}
  
if (localStorage.getItem("unit") == null) {
  
  localStorage.setItem("unit", "imperial");

}

if (localStorage.getItem("temp-unit") == null) {
  
  localStorage.setItem("temp-unit", "mph");
  
}

var owmCityJsonFile;
fetch("./current_city_list.json")
.then(response => {

  return response.json();

})
.then(data => {

  owmCityJsonFile = data;

});

var bodyBackgroundColor;
if (localStorage.getItem("savedLocations") == null) {

  
  bodyBackgroundColor = "linear-gradient(135deg, rgb(163, 163, 163) 10%, rgb(93, 104, 136) 100%)";

} else if (localStorage.getItem("savedLocations") !== null) {

  bodyBackgroundColor = localStorage.getItem("bgcolor", bodyBackgroundColor);

}


document.body.style.backgroundImage = bodyBackgroundColor;



// DUPLICATE VARIABLES FROM OTHER JS FILE
// const tempDiv = document.querySelector(".temp");

// OPENWEATHERMAP API KEY
//let apiKey = `6b2ce66a0708555cf5ca3fe99d0f1274`;

var apiKey;
if (localStorage.getItem("apiKey", apiKey) !== null) {
  
  apiKey = localStorage.getItem("apiKey", apiKey);
  apiInputValue.value = apiKey;
  
} else if (localStorage.getItem("apiKey", apiKey) == null) {
  
  apiKey = `6b2ce66a0708555cf5ca3fe99d0f1274`
  apiInputValue.value = apiKey;
  localStorage.setItem("apiKey", apiKey);

}

//http://api.openweathermap.org/data/2.5/forecast?id=5128581&appid=6b2ce66a0708555cf5ca3fe99d0f1274

apiInputValue.addEventListener("input", () => {

  apiKey = apiInputValue.value;
  localStorage.setItem("apiKey", apiKey);
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast?id=5128581&appid=${apiKey}`)
  .then(response => {
    
    return response.json();
    
  })
  .then(data => {
       
    if (data.cod == "200") {

    apiInputValue.style.border = "1px solid green";
    apiSuccessOrFailText.style.visibility = "visible";
    apiSuccessOrFailText.style.color = "green";
    apiSuccessOrFailText.innerHTML = "Success";
    
  } else if (data.cod == "401") {
    
    apiInputValue.style.border = "1px solid red";
    apiSuccessOrFailText.style.visibility = "visible";
    apiSuccessOrFailText.style.color = "red";
    apiSuccessOrFailText.innerHTML = "Invalid API Key";
    
  }
    
  })
  
});

if (localStorage.getItem("temp-unit") == "kmh") {

       kmhBtn.style.background = "rgba(0, 0, 0, 0.1)";
       
       
     } else if (localStorage.getItem("temp-unit") == "mph") {

        mphBtn.style.background = "rgba(0, 0, 0, 0.1)";
       
     } else if (localStorage.getItem("temp-unit") == "ms") {
       
        msBtn.style.background = "rgba(0, 0, 0, 0.1)";
      
    }


 if (localStorage.getItem("unit") == "metric") {
       
        metricBtn.style.background = "rgba(0, 0, 0, 0.1)";
      
    } else if (localStorage.getItem("unit") == "imperial") {
      
        imperialBtn.style.background = "rgba(0, 0, 0, 0.1)";
      
    }
     

metricBtn.addEventListener("click", () => {

  imperialBtn.style.background = "";
  metricBtn.style.background = "rgba(0, 0, 0, 0.1)";
  localStorage.setItem("unit", "metric");
  
});

imperialBtn.addEventListener("click", () => {
  
  metricBtn.style.background = "";
  imperialBtn.style.background = "rgba(0, 0, 0, 0.1)";
  localStorage.setItem("unit", "imperial");
  
});

kmhBtn.addEventListener("click", () => {
  
  mphBtn.style.background = "";
  msBtn.style.background = "";
  kmhBtn.style.background = "rgba(0, 0, 0, 0.1)";
  localStorage.setItem("temp-unit", "kmh");
  
})

mphBtn.addEventListener("click", () => {
  
  kmhBtn.style.background = "";
  msBtn.style.background = "";
  mphBtn.style.background = "rgba(0, 0, 0, 0.1)";
  localStorage.setItem("temp-unit", "mph");
  
})

msBtn.addEventListener("click", () => {
  
  kmhBtn.style.background = "";
  mphBtn.style.background = "";
  msBtn.style.background = "rgba(0, 0, 0, 0.1)";
  localStorage.setItem("temp-unit", "ms");
  
})

var cityId;

const addLocationPopUpBox = document.getElementById("add-location-pop-up");
const addLocationSubmitBtn = document.querySelector(".add-location-submit-btn");

const cityField = document.getElementById("city-name-value");
const latitudeField = document.getElementById("latitude-name-value");
const longitudeField = document.getElementById("longitude-name-value");

function filterCities() {

  searchManualBtn.style.visibility = "hidden";
  
  if (cityField.value.length > 0) {
    
    cityMatchList.style.display = "block";

     filteredOwmCityJsonFile = owmCityJsonFile.filter( (value) => {
     
     const regex = new RegExp(`^${cityField.value}`, "gi");
     
     return value.name.match(regex);
     
   })

  let mappedOwmCityJsonFile = filteredOwmCityJsonFile.map(value => {
    
   /* if (cityField.value.length > 0) {
      

    } */

       return `<section class="city-list-li">
       <div class="city-name-search">${value.name}</div>
       <div class="country-name-search">${value.country}</div>
       <small class="coords">${value.lon},${value.lat}</small>
       </section>`
  
     }).join(' ');

  /*   if (cityField.value.length === 0) {
       
       filteredOwmCityJsonFile = [];

     }*/
     
     cityMatchList.innerHTML = mappedOwmCityJsonFile;
   
  } else {
      
      cityMatchList.style.display = "none";
      filteredOwmCityJsonFile = [];
      searchManualBtn.style.visibility = "visible";
      
    };
    

} 


const locationManualEntry = document.querySelector(".location-manual-entry");
locationManualEntry.style.display = "none";
const searchManualBtn = document.querySelector(".add-location-add-btn");
const cancelBtn = document.querySelector(".add-location-cancel-btn");

addLocationButton.addEventListener("click", () => {

   addLocationPopUpBox.style.display = "block";

var filteredOwmCityJsonFile;
var cityFieldSearchLi = document.createElement("li");

cityField.addEventListener("input", filterCities);

cityMatchList.addEventListener("click", (e) => {

  const latlonArray = e.target.parentElement.lastElementChild.innerHTML.split(",");

  if (e.target.classList == "coords" || e.target.classList == "city-name-search" || e.target.classList == "country-name-search") {

    cityField.value = e.target.parentElement.firstElementChild.innerHTML;
    searchManualBtn.style.visibility = "visible";

  } else if (e.target.classList == "city-list-li") {

    cityField.value = e.target.firstElementChild.innerHTML;
    searchManualBtn.style.visibility = "visible";

  }

  cityMatchList.style.display = "none";
  longitudeField.value = latlonArray[0].replaceAll('"', '');
  latitudeField.value = latlonArray[1].replaceAll('"', '');

})

})

searchManualBtn.addEventListener("click", () => {

   if (locationManualEntry.style.display == "none") {
     
     cityField.removeEventListener("input", filterCities);
     locationManualEntry.style.display = "block";
     searchManualBtn.innerHTML = "AUTO";
     cityField.value = "";
     latitudeField.value = "";
     longitudeField.value = "";
     
   } else if (locationManualEntry.style.display == "block") {

      cityField.addEventListener("input", filterCities);
      locationManualEntry.style.display = "none";
      searchManualBtn.innerHTML = "MANUAL";
      cityField.value = "";
      latitudeField.value = "";
      longitudeField.value = "";
     
   }
   
  
  })

  cancelBtn.addEventListener("click", () => {

    cityField.value = "";
    latitudeField.value = "";
    longitudeField.value = "";
    addLocationPopUpBox.style.display = "none";


  })

addLocationSubmitBtn.addEventListener("click", () => {
  
  if (cityField.value !== "" && latitudeField.value !== "" && longitudeField.value !== "") {
    
    // document.querySelector(".form-error-text").style.visibility = "hidden";
  
  let userEnteredLatitude = document.getElementById("latitude-name-value").value.replaceAll('"', '');
  let userEnteredLongitude = document.getElementById("longitude-name-value").value.replaceAll('"', '');
  let userEnteredCity = document.getElementById("city-name-value").value.replaceAll('"', '');

  savedLocations.push({longitude: userEnteredLongitude, latitude: userEnteredLatitude, city: userEnteredCity});  
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

  currentCity = userEnteredCity;
  currentLong = userEnteredLongitude;
  currentLat = userEnteredLatitude;
  selectedCity = currentCity;
  lastLocationArray.push({currentLong: currentLong, currentLat: currentLat, selectedCity: selectedCity});
  localStorage.setItem("lastLocationArray", JSON.stringify(lastLocationArray));

  addLocationPopUpBox.style.display = "none";

   checkForLocalData();
   
   cityField.value = "";
   latitudeField.value = "";
   longitudeField.value = "";

  //  addLocationPopUpBox.style.display = "block";
   
  } else {
    
    // document.querySelector(".form-error-text").style.visibility = "visible";
    
  }
  
  
   
})



// ATTACHES EVENT LISTENER TO CURRENT LOCATION BUTTON
let lastLocationArray = [];
currentLocationButton.addEventListener("click", () => {

  // lastLocationArray = [];
  currentLocationButtonTxt.innerHTML = ` <div class="loader"></div>`;
  currentLocationButton.disabled = true;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position) => {

      console.log(position.coords.latitude, position.coords.longitude);


        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        
       let cityName = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;
  
       currentLocationButtonTxt.innerHTML = "Current Location";
       currentLocationButton.disabled = false;
  
       fetch(cityName)
       .then(response => {
  
         return response.json();
         
       })
       .then(data => {
         
         currentCity = data[0].name;
         currentLong = longitude;
         currentLat = latitude;
         selectedCity = currentCity;
         lastLocationArray.push({currentLong: currentLong, currentLat: currentLat, selectedCity: selectedCity});
         localStorage.setItem("lastLocationArray", JSON.stringify(lastLocationArray));     
         savedLocations.push({longitude: longitude, latitude: latitude, city: currentCity}); 
         localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
         checkForLocalData();
         
         
       });
  
        userLocation = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        
  


    });

  } else {

    console.log("Geolocation is not supported by this browser.");

  }


})

// REMOVE THIS AFTER LOADING ICON IS POSITIONED PROPERLY
// currentLocationButton.addEventListener("click", () => {

//   locationCheck();

// });

// function onDeviceReady() {
//     // Now safe to use device APIs
// }

const currentLocationButtonTxt = document.querySelector(".current-location-btn-text");

  // GLOBAL VARIABLES
var longitude;
var latitude;
var userLocation;
var currentCity;
var savedLocations = [];

// localStorage.removeItem("savedLocations")

function checkForLocalData() {
  
cityListWrap.innerHTML = "";

if (localStorage.getItem("savedLocations") == null) {

  savedLocations = [];
  alert(`The API key allows you to receive weather data from Openweather, this is a public key however and there is a limit for publicly accessible calls, it is strongly recommended that you sign up for your own key
  
Please also note that your location data is only sent to openweather so they can provide you with weather data for your area.`)

}

else if (localStorage.getItem("savedLocations") !== null) {

savedLocations = JSON.parse(localStorage.getItem("savedLocations"));

  for (s = 0; s < savedLocations.length; s++) {

      if (savedLocations[s].city) {
        
        let newCityLiDiv = document.createElement("div");
   //     newCityLiDiv.setAttribute("class", "new-city-li")
        // newCityLiDiv.style.display = "block";
        // newCityLiDiv.style.height = "0%"
        newCityLiDiv.innerHTML = 
        `
        <section class="single-city-section-wrapper">
        <li class="single-city-li"><p>${savedLocations[s].city}</p> <span class="city-x-icon" id=${s}>x</span></li>
        </section>
        `
        
        let singleCitySectionWrapper = document.querySelector(".single-city-section-wrapper");
        cityListWrap.appendChild(newCityLiDiv);

        document.getElementById(s).addEventListener("click", (e) => {
            
            newCityLiDiv.style.opacity = "0.5";
            newCityLiDiv.style.transform = "translateX(-120%)";
            newCityLiDiv.style.transition = "transform .7s";
            
            
            newCityLiDiv.addEventListener("transitionend", () => {
              
              newCityLiDiv.remove();
              
            })
          
            
            savedLocations.splice(e.target.id, 1);
            localStorage.setItem("savedLocations", JSON.stringify(savedLocations));

            
        });
             
      }
        
      }

  }

}

checkForLocalData();

