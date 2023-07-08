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
