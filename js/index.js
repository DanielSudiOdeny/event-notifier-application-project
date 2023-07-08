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
