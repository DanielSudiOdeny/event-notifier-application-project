// An event listener that only triggers the a callback function when the page is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  getEventsData();
  getFilteredSearch();
});

// Invoking this function will fetch events data from the server
function getEventsData() {
  fetch(`http://localhost:3000/events`)
    .then((response) => response.json())
    .then((data) => {
      displayEventCard(data);
      selectEvent(data);
    });
}

// Starting variables
const signupBtn = document.querySelector(".signup-btn");
const eventForm = document.querySelector(".event-form");
const eventsContainer = document.querySelector(".events-container");
const events = document.querySelector(".events");
const searchBtn = document.querySelector(".search-btn");
const selectEvents = document.querySelector("#events");
const eventType = document.querySelector(".event-type");
const musicGenre = document.querySelector(".music-genre");
const locationSearchBar = document.querySelector(".location-search-bar");
const eventSearchBar = document.querySelector(".search-bar");
const purchaseTicketbtn = document.querySelector(".purchase-ticket");
const createEventBtn = document.querySelector(
  ".search-event .create-event-btn"
);
const submitEventFormBtn = document.querySelector(
  ".event-form .create-event-btn"
);

// Invoking this function will create an event card and display the event data fetched from the server inside the card.
function displayEventCard(data) {
  data.forEach((data) => {
    const featuredEvents = document.createElement("div");
    featuredEvents.className = "card";
    featuredEvents.style = "width: 400px; height: 450px;";
    // The HTML elements below will create the event card
    featuredEvents.innerHTML = `
          <img class="card-img-top" src= ${data.poster} style="height: 180px" alt="Event Poster" />
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.date}   

            </p>
            <p class="ml-5">${data.time}</p>
             <p class="ml-5 location-details">${data.location}</p>
            <a href="#ticket-purchase-container" class="btn">Get Tickets</a>
          </div>
        </div>`;
    eventsContainer.appendChild(featuredEvents);
  });
}

// An event listener that listens for clicks and triggers a callback function that will allow user to create an event
submitEventFormBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const eventName = document.querySelector(".event-name");
  const eventLocation = document.querySelector(".event-location");
  const eventPoster = document.querySelector(".event-poster-url");
  const date = document.querySelector(".event-date");
  const eventTime = document.querySelector(".event-time");
  const newEventsContainer = document.querySelector(".new-event-container");
  let newEvent = document.createElement("div");
  newEvent.className = "card";
  newEvent.classList.add("shadow");
  newEvent.style = "width: 320px; height: 400px; margin-left: 30px";

  newEvent.innerHTML = ` 
          <img class="card-img-top" src= ${eventPoster.value} style="height: 180px;"alt="Event Poster" />
          <div class="card-body">
            <h5 class="card-title">${eventName.value}</h5>
            <p class="card-text" style="margin-bottom: 5px">${date.value}   

            </p>
            <p class="ml-5">${eventTime.value}</p>
             <p class="ml-5">${eventLocation.value}</p>
            <a href="#ticket-purchase-container" class="btn">Get Tickets</a>
          </div>
        </div>`;
  newEventsContainer.appendChild(newEvent);
});
