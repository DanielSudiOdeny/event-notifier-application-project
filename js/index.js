// Starting variables
const welcomePage = document.querySelector("#content-fluid");
const signupBtn = document.querySelector(".signup-btn");
const eventForm = document.querySelector(".event-form");
const eventsContainer = document.querySelector(".events-container");
const events = document.querySelector(".events");
const searchBtn = document.querySelector(".search-btn");
const locationSearchBar = document.querySelector(".location-search-bar");
const eventSearchBar = document.querySelector(".search-bar");
const purchaseTicketbtn = document.querySelector(".purchase-ticket");
const newEventsContainer = document.querySelector(".new-event-container");

const createEventBtn = document.querySelector(
  ".search-event .create-event-btn"
);
const submitEventFormBtn = document.querySelector(
  ".event-form .create-event-btn"
);

document.addEventListener("DOMContentLoaded", function () {
  getEventsData();
  getFilteredSearch();
});

signupBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  welcomePage.scrollIntoView(true);
  const userName = document.querySelector(".username");
  const userEmail = document.querySelector(".user-email");
  const userPassword = document.querySelector(".user-password");

  const data = {
    userName: userName.value,
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  };

  fetch("http://localhost:3000/logins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "applicaton/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
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
  //   newEventsContainer.innerHTML = "";
  newEventsContainer.appendChild(newEvent);

  //   Invoking this function will allow user to choose whether to add new event to featured events or not.
  const getUserInput = function () {
    let userInput;
    setTimeout(() => {
      userInput = prompt(
        "Do you want to add new event to featured events? reply with Y or N"
      );
      // An If else that determines whether the user has chosen to add a new event to the featured event or not
      if (userInput === "Y") {
        const newlyAddedFeaturedEvent = document.createElement("div");
        newlyAddedFeaturedEvent.className = "card";
        newlyAddedFeaturedEvent.style =
          "height: 470px; width: 400px; margin: 20px;";

        // The new card will be created inside the innerHTML and will be displayed in the featured events;
        newlyAddedFeaturedEvent.innerHTML = `  
          <img class="card-img-top" src= ${eventPoster.value} style="height: 180px;" alt="Event Poster" />
          <div class="card-body">
            <h5 class="card-title">${eventName.value}</h5>
            <p class="card-text">${date.value}   

            </p>
            <p class="ml-5">${eventTime.value}</p>
             <p class="ml-5">${eventLocation.value}</p>
            <a href="#ticket-purchase-container" class="btn">Get Tickets</a>
          </div>
        </style=>`;
        eventsContainer.appendChild(newlyAddedFeaturedEvent);

        // An object that stores data concerning the newly created event
        const data = {
          name: eventName.value,
          description: "",
          date: date.value,
          time: eventTime.value,
          location: eventLocation.value,
          tickets_available: "",
          poster: eventPoster,
        };

        // Invoking this function will use a post method to post the data concerning the newly created event to the server
        function postEventDetailsToServer(data) {
          fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }

        // postEventDetailsToServer(data);

        // Invoking this function will reset the event form after the new event is created
        function resetEventForm() {
          eventLocation.value = "";
          eventName.value = "";
          eventPoster.value = "";
          eventTime.value = "";
          date.value = "";
          newEvent.classList.add("hidden-1");
          eventForm.classList.add("hidden-1");
          events.classList.remove("hidden");
        }

        resetEventForm();
        setTimeout(() => {
          alert("Kudos! Your new event has been added to the features events");
        }, 3000);
      }
    }, 2000);
  };
  getUserInput();
});

// An Event listener that toggles whether to display the event form depending on whether it's clicked or not
createEventBtn.addEventListener("click", function (e) {
  if (events.classList.contains("hidden")) {
    newEventsContainer.innerHTML = "";
    newEventsContainer.appendChild(eventForm);
    eventForm.classList.add("hidden-1");
    events.classList.remove("hidden");
  } else {
    newEventsContainer.appendChild(eventForm);
    eventForm.classList.remove("hidden-1");
    events.classList.add("hidden");
  }
});
let getEventsOnFilteredSearch = function (data) {
  let eventFromSearchResults = document.createElement("div");
  eventFromSearchResults.className = "card";
  eventFromSearchResults.classList.add("shadow");
  eventFromSearchResults.style =
    "width: 320px; height: 430px; margin-left: 30px";

  eventFromSearchResults.innerHTML = ` 
          <img class="card-img-top" src= ${data.poster} style="height: 180px;"alt="Event Poster" />
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text" style="margin-bottom: 5px">${data.date}   

            </p>
            <p class="ml-5">${data.time}</p>
             <p class="ml-5">${data.location}</p>
            <a href="#ticket-purchase-container" class="btn">Get Tickets</a>
          </div>
        </div>`;

  newEventsContainer.innerHTML = "";
  newEventsContainer.appendChild(eventFromSearchResults);
  events.classList.add("hidden");
};

// A click event triggers a callback function that will fetch data from the server containing the specific event the user searches for
searchBtn.addEventListener("click", function (event) {
  fetch("http://localhost:3000/events")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      displaySearchResults(data);
    });
  // postEventDetailsToServer(data);

  //   Invoking this function will display the specific event the user searches for if it's present in the server;
  function displaySearchResults(data) {
    data.forEach((data) => {
      //  An if else that only displays an event based on whether the data the user keys in and the data in the server matches
      if (
        eventSearchBar.value === data.name &&
        locationSearchBar.value === data.location
      ) {
        newEventsContainer.innerHTML = "";
        getEventsOnFilteredSearch(data);
      }
    });
  }
});

searchBtn.addEventListener("click", function (event) {
  fetch("http://localhost:3000/events")
    .then((response) => response.json())
    .then((data) => {
      displayFilteredResults(data);
    });
  // postEventDetailsToServer(data);

  //   Invoking this function will display the specific event the user searches for if it's present in the server;
  function displayFilteredResults(data) {
    const filterLocation = document.querySelector(".location");
    data.forEach((data) => {
      //  An if else that only displays an event based on whether the data the user keys in and the data in the server matches
      if (data.location.contains("Nairobi")) {
        let eventFromSearchResults = document.createElement("div");
        eventFromSearchResults.className = "card";
        eventFromSearchResults.classList.add("shadow");
        eventFromSearchResults.style =
          "width: 320px; height: 400px; margin-left: 30px";
        const newEventsContainer = document.querySelector(
          ".new-event-container"
        );
        eventFromSearchResults.innerHTML = ` 
          <img class="card-img-top" src= ${data.poster} style="height: 180px;"alt="Event Poster" />
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text" style="margin-bottom: 5px">${data.date}   

            </p>
            <p class="ml-5">${data.time}</p>
             <p class="ml-5">${data.location}</p>
            <a href="#ticket-purchase-container" class="btn">Get Tickets</a>
          </div>
        </div>`;
        newEventsContainer.appendChild(eventFromSearchResults);
        events.classList.add("hidden");
      }
    });
  }
});

const ticketPurchaseContainer = document.querySelector(
  "#ticket-purchase-container"
);
const ticketPurchaseForm = document.querySelector(".ticket-purchase-form");
const fullNamePlaceHolder = document.querySelector(".fullname-placeholder");
const selectEl = document.createElement("select");
let userChoiceOfEvent;

function selectEvent(data) {
  data.forEach((data) => {
    const optionEl = document.createElement("option");

    optionEl.textContent = data.name;
    optionEl.setAttribute("value", data.poster);
    selectEl.appendChild(optionEl);
    ticketPurchaseForm.insertBefore(selectEl, fullNamePlaceHolder);
    const eventTypeBtn = document.querySelectorAll("option");

    selectEl.addEventListener("change", function (e) {
      userChoiceOfEvent = e.target.value;
      if (userChoiceOfEvent === data.poster) {
        console.log(e.target.value, data.poster);
        const imageNew = document.querySelector(".event-image");
        imageNew.src = e.target.value;
      }
    });
  });
}

// Purchase ticket functionality
purchaseTicketbtn.addEventListener("click", function (e) {
  e.preventDefault();
  const userFullname = document.querySelector(".user-fullname");
  const userPhoneNumber = document.querySelector(".user-phone-number");

  const ticketDetails = {
    event: userChoiceOfEvent,
    userFullName: userFullname.value,
    UserPhoneNumber: userPhoneNumber.value,
  };

  function saveTicketPurchaseDetailsToServer() {
    fetch("http://localhost:3000/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(ticketDetails),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  console.log(saveTicketPurchaseDetailsToServer());
  alert(
    "Congratulations! your slot is secured! We will contact you shortly concerning payment"
  );
});

const selectEl2 = document.createElement("select");
selectEl2.textContent = "Search Events by:";
selectEl.className = "select1";

function getFilteredSearch() {
  fetch("http://localhost:3000/customizedSearch")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayFilteredResults(data);
    });
}

function displayFilteredResults(data) {
  data.forEach((data) => {
    const searchEvent = document.querySelector(".search-event");
    const optionEl2 = document.createElement("option");
    optionEl2.textContent = data.category;
    optionEl2.setAttribute("value", data.category);
    selectEl2.appendChild(optionEl2);
    searchEvent.appendChild(selectEl2);

    selectEl2.addEventListener("change", function (e) {
      if (e.target.value === "Location") {
        if (e.target.value === data.category) {
          locationSearchBar.setAttribute("placeholder", e.target.value);
          const userLocation = prompt("Please enter your location");
          fetch(`http://localhost:3000/events`)
            .then((response) => response.json())
            .then((data) => {
              data.forEach((data) => {
                if (userLocation === data.city) {
                  getEventsOnFilteredSearch(data);
                }
              });
            });
        }
      } else if (e.target.value === "Event Type") {
        if (e.target.value === data.category) {
          locationSearchBar.setAttribute("placeholder", e.target.value);
          const userChosenEventType = prompt(
            "What kind of events are you looking for?"
          );
          fetch(`http://localhost:3000/events`)
            .then((response) => response.json())
            .then((data) => {
              data.forEach((data) => {
                if (userChosenEventType === data.type) {
                  getEventsOnFilteredSearch(data);
                }
              });
            });
        }
      } else if (e.target.value === "Music Genre") {
        if (e.target.value === data.category) {
          locationSearchBar.setAttribute("placeholder", e.target.value);
          const userChosenMusicGenre = prompt(
            "What Genre of music do you enjoy listening to?"
          );
          fetch(`http://localhost:3000/events`)
            .then((response) => response.json())
            .then((data) => {
              data.forEach((data) => {
                if (userChosenMusicGenre === data.genre) {
                  getEventsOnFilteredSearch(data);
                }
              });
            });
        }
      }
    });
  });
}
