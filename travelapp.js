let slider = document.querySelector("[data-slide-container]");
let mainCityTitle = document.querySelector("[data-city-title]");
let mainCityCountry = document.querySelector("[data-country-title]");
let descriptionBox = document.querySelector("[data-description-box]");
let temperature = document.querySelector("[data-degrees]");
let weatherDecription = document.querySelector("[data-weather-description]");

slider.addEventListener("click", cardClick);

let travelData = [];
let targetCity = "";
let latitude = 0;
let longitude = 0;

document.addEventListener("DOMContentLoaded", setLocalStorage());
document.addEventListener("DOMContentLoaded", createCards());
document.addEventListener("DOMContentLoaded", InitializeMapBox());

function setLocalStorage() {
  fetch("travel-data.json")
    .then((response) => {
      return response.json();
    })
    .then((travels) => {
      let travelArray = [];
      travelData = JSON.stringify(travels);
      travelArray = localStorage.getItem("travels");
      console.log("ITEMS!", travelArray);
      if (travelArray === null) {
        localStorage.setItem("travels", travelData);
      }
    });
}

function createCards() {
  let localStorageData = JSON.parse(localStorage.getItem("travels"));
  console.log("PARSED DATA", localStorageData);
  localStorageData.forEach((travel) => {
    slider.appendChild(
      h(
        "div",
        { class: "column" },
        h(
          "div",
          {
            class: "card mr-1",
            id: "holiday-card",
            "data-details-city": travel.city,
          },
          h(
            "div",
            { class: "card-image" },
            h(
              "figure",
              { class: "image is-3by1" },
              h("img", { src: `${travel.image}`, alt: "Placeholder image" })
            )
          ),
          h(
            "div",
            { class: "media-content mx-3 my-2" },
            h("p", { class: "title is-6" }, `${travel.city}`),
            h("p", { class: "subtitle is-6 mb-2" }, `${travel.arrivaldate}`)
          )
        )
      )
    );
  });
}

function cardClick(event) {
  let localStorageData = JSON.parse(localStorage.getItem("travels"));

  let TargetCard = event.target.closest("#holiday-card");
  targetCity = TargetCard.dataset.detailsCity;

  const key = "4b5a6cc68d431d230fdfdbf233ea71bd";
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${targetCity}&limit=1&appid=${key}`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      console.log("CONVERT BEFORE:", data);
      latitude = data[0].lat;
      longitude = data[0].lon;
      console.log("LATITUDE BEFORE", latitude);
      console.log("LONGITUDE BEFORE", longitude);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
      )
        .then(function (resp) {
          return resp.json();
        }) // Convert data to json
        .then(function (data) {
          console.log("WEATHER AFTER:", data);
          console.log("LATITUDE AFTER", latitude);
          console.log("LONGITUDE AFTER", longitude);
          console.log("CITY AFTER", data.name);
          console.log("DEGREES AFTER", data.main.temp);

          temperature.innerText = `${Math.round(data.main.temp)}°C`;
          weatherDecription.innerText = data.weather[0].description;

          mapboxgl.accessToken =
            "pk.eyJ1Ijoic2ViYXN0aWFubGllYmVudHJhdXQiLCJhIjoiY2xjOWFwcDV3MXJucjNwbW94dWpyc2NseCJ9.NDXNXtth44dPU-KUL-33hg";
          const map = new mapboxgl.Map({
            container: "map", // container ID
            style: "mapbox://styles/mapbox/streets-v12", // style URL
            center: [`${longitude}`, `${latitude}`], // starting position [lng, lat]
            zoom: 12, // starting zoom
          });
        });
    });

  if (TargetCard.dataset.detailsCity !== undefined) {
    console.log("HURRA");
    for (let key in localStorageData) {
      if (localStorageData[key].city === targetCity) {
        console.log("ITS THE SAME!");
        mainCityTitle.innerText = localStorageData[key].city;
        cityName = localStorageData[key].city;
        mainCityCountry.innerText = localStorageData[key].country;
        let displayText = localStorageData[key].description;
        if (displayText.length > 40)
          displayText = `${displayText.substring(0, 410)}...`;
        descriptionBox.innerText = displayText;
        let imgUrl = localStorageData[key].image;
        document.querySelector(
          "[data-background-image]"
        ).style.backgroundImage = `linear-gradient(
          to bottom,
          rgba(245, 246, 252, 0),
          rgba(0, 0, 0, 0.534)
        ), url(${imgUrl})`;
        console.log("IMG URL:", imgUrl);
      }
    }
  }
}

function InitializeMapBox() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2ViYXN0aWFubGllYmVudHJhdXQiLCJhIjoiY2xjOWFwcDV3MXJucjNwbW94dWpyc2NseCJ9.NDXNXtth44dPU-KUL-33hg";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [9.993682, 53.551086], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}

// THE H FUNCTION

function h(tagName, attributes = {}, ...children) {
  const tag = document.createElement(tagName);
  Object.keys(attributes).forEach((k) => {
    tag.setAttribute(k, attributes[k]);
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      tag.appendChild(document.createTextNode(child));
    } else {
      tag.appendChild(child);
    }
  });
  return tag;
}
