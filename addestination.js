let submit = document.querySelector("[data-submit-button]");
let countryInput = document.querySelector("[data-country-input]");
let cityInput = document.querySelector("[data-city-input]");
let descriptionInput = document.querySelector("[data-description-input]");
let arrivalInput = document.querySelector("[data-arrival-date]");
let depatureInput = document.querySelector("[data-depature-date]");
let imageInput = document.querySelector("[data-image-input]");





submit.addEventListener("click", addTravel); 

function addTravel(){
    let country = countryInput.value 
    let city = cityInput.value 
    let description = descriptionInput.value
    let arrival = arrivalInput.value
    let depature = depatureInput.value
    let image = imageInput.value

    const newTravel = new Object();

    newTravel.city = city;
    newTravel.country = country;
    newTravel.description = description;
    newTravel.arrivaldate = arrival;
    newTravel.depaturedate = depature;
    newTravel.image = image;

    data = JSON.parse(localStorage.getItem("travels"))
    data.push(newTravel);
    localStorage.setItem("travels", JSON.stringify(data));

    console.log("STORAGE", data)
    console.log("NEW OBJECT", newTravel)
    event.preventDefault();
    location.reload(); 
  }


  document.addEventListener("DOMContentLoaded", calenderFunction());




console.log("bulmaCalender", bulmaCalendar)
  
  function calenderFunction(){
    console.log("HERE I AM")
    let kalender = bulmaCalendar;
    console.log("KALENDER", kalender)
  // Initialize all input of type date
  var calendars = bulmaCalendar.attach('[type="date"]', options);

  // Loop on each calendar initialized
  for(var i = 0; i < calendars.length; i++) {
    // Add listener to select event
    calendars[i].on('select', date => {
      console.log(date);
    });
  }
  
  // To access to bulmaCalendar instance of an element
  var element = document.querySelector('#my-element');
  if (element) {
    // bulmaCalendar instance is available as element.bulmaCalendar
    element.bulmaCalendar.on('select', function(datepicker) {
      console.log(datepicker.data.value());
    });
  }
  }



