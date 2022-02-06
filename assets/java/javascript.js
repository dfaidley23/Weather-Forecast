const userSearchEL = document.querySelector("#user-form");
const fiveDayForecastContainer = document.querySelector("#forecast");
const fiveDayForecastEl = document.querySelector("#fiveDay");
const citySearchInput = document.querySelector("#city");
const submitBtn = document.querySelector(".button");
const searchedHistoryButtons = document.querySelector(".buttonContainer");
const localBtn = document.querySelector(".data-button");
const savedCityValueButtons = document.querySelector("#citySave");
const currentWeather = document.querySelector("#currentWeather");
const apiId = "&appid=c8852909017cf9892c89ceed06febd85";
const citySearchDisplay = document.querySelector(".city");
const currentDate = document.querySelector(".date");
const cityTempDisplay = document.querySelector("#temp");
const cityWindDispay = document.querySelector("#wind");
const cityHumidityDisplay = document.querySelector("#humidity");
const cityUVindexDisplay = document.querySelector("#uvi");
const cities = [];

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput.value},840${apiId}&units=Imperial`)
    .then((response) => response.json())

    .then((data) => {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      localBtn.innerText = citySearchInput.value;
      currentDate.innerText = moment.unix(data.dt).format("MM-DD-YYYY");
      citySearchDisplay.innerText = citySearchInput.value;
      cityTempDisplay.innerText = data.main.temp;
      cityWindDispay.innerText = data.wind.speed;
      cityHumidityDisplay.innerText = data.main.humidity;
      savedCityValueButtons.classList.remove("is-hidden");
      currentWeather.classList.remove("is-hidden");
      fiveDayForecastContainer.classList.remove("is-hidden");

      let Localstorage = localStorage;
      cities.push(citySearchInput.value);
      localStorage.setItem("cities", JSON.stringify(cities));
      const citiesArray = JSON.parse(Localstorage.getItem("cities"));

      searchedHistoryButtons.innerHTML = citiesArray
        .map((city) => {
          localBtn.innerText = city;
          return `<dd class="btn"><button class="button data-button is-capitalized m-2"
          type="submit">${city}</button>
      </dd>`;
        })
        .join("");

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&appid=c8852909017cf9892c89ceed06febd85&units=imperial`)
        .then((response) => response.json())

        .then((data) => {
          let uviValue = data.current.uvi;
          cityUVindexDisplay.innerText = uviValue;
          const forecastArray = data.daily;
          const fiveDayForecast = forecastArray.slice(1, 6);

          fiveDay.innerHTML = fiveDayForecast
            .map((weatherData) => {
              let icon = weatherData.weather[0].icon;
              let date = moment.unix(weatherData.dt).format("MM-DD-YYYY");
              return `<div class="card is-mobile column p-2 m-3">
              <div
                  class="level-item has-text-centered is-flex is-flex-direction-row is-justify-content-center is-align-content-center">
                <div>
                  <div class="card-title has-text-centered" id="date">${date}</div>
                    <br>
                    <div class="card-title has-text-centered" id="img"><img src="https://openweathermap.org/img/w/${icon}.png"/></div>
                    <br>
                    <p class="heading is-size-7"> Temp <i class="fas fa-temperature-high"></i>
                    </p>
                    <p class="title" id="t">${weatherData.temp.day}</p>
                </div>
            </div>
              <br>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading is-size-7">Wind<i class="fas fa-wind"></i></p>
                <p class="title" id="w">${weatherData.wind_speed}</p>
              </div>
            </div>
              <br>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading is-size-7">Humidity<i class="fas fa-cloud-rain"></i></p>
                <p class="title" id="h">${weatherData.humidity}</p>
              </div>
            </div>
          </div>`;
            })
            .join("");
        });
    });
});

searchedHistoryButtons.addEventListener("click", (e) => {
  e.preventDefault();

  let savedCity = "";

  if (e.target.tagName === "BUTTON") {
    console.log();
    savedCity = e.target.innerText;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${savedCity},840${apiId}&units=Imperial`)
    .then((response) => response.json())

    .then((data) => {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      currentDate.innerText = moment.unix(data.dt).format("MM-DD-YYYY");
      citySearchDisplay.innerText = savedCity;
      cityTempDisplay.innerText = data.main.temp;
      cityWindDispay.innerText = data.wind.speed;
      cityHumidityDisplay.innerText = data.main.humidity;
      savedCityValueButtons.classList.remove("is-hidden");
      currentWeather.classList.remove("is-hidden");
      fiveDayForecastContainer.classList.remove("is-hidden");

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&appid=c8852909017cf9892c89ceed06febd85&units=imperial`)
        .then((response) => response.json())

        .then((data) => {
          let uviValue = data.current.uvi;
          cityUVindexDisplay.innerText = uviValue;
          const forecastArray = data.daily;
          const fiveDayForecast = forecastArray.slice(1, 6);

          fiveDay.innerHTML = fiveDayForecast
            .map((weatherData) => {
              let icon = weatherData.weather[0].icon;
              let date = moment.unix(weatherData.dt).format("MM-DD-YYYY");
              return `<div class="card is-mobile column p-2 m-3">
              <div
                  class="level-item has-text-centered is-flex is-flex-direction-row is-justify-content-center is-align-content-center">
                <div>
                  <div class="card-title has-text-centered" id="date">${date}</div>
                    <br>
                    <div class="card-title has-text-centered" id="img"><img src="https://openweathermap.org/img/w/${icon}.png"/></div>
                    <br>
                    <p class="heading is-size-7"> Temp <i class="fas fa-temperature-high"></i>
                    </p>
                    <p class="title" id="t">${weatherData.temp.day}</p>
                </div>
            </div>
              <br>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading is-size-7">Wind<i class="fas fa-wind"></i></p>
                <p class="title" id="w">${weatherData.wind_speed}</p>
              </div>
            </div>
              <br>
            <div class="level-item has-text-centered">
              <div>
                <p class="heading is-size-7">Humidity<i class="fas fa-cloud-rain"></i></p>
                <p class="title" id="h">${weatherData.humidity}</p>
              </div>
            </div>
          </div>`;
            })
            .join("");
        });
    });
});