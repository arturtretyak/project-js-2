const API_KEY = "9cTjAjlRB53wyhAFk5VzXcBu5GiPU6fK";
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

let currentPage = 0;
let currentKeyword = "";

const ref = {
  form: document.querySelector(".form-search"),
  loadMore: document.querySelector(".load-more"),
  listEvents: document.querySelector(".list-of-events"),
};

function fetchEvents(page, keyword) {
  const urlParams = new URLSearchParams({
    page: page,
    keyword: keyword,
    apikey: API_KEY,
    size: 50,
  });
  return fetch(`${BASE_URL}events/?${urlParams}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

function getEvents(page, keyword) {
  fetchEvents(page, keyword)
    .then((obj) => {
      renderEvents(obj._embedded.events);
      if (obj.page.totalPages > 1) {
        ref.loadMore.classList.remove("hidden");
      }
      if (obj.page.totalPages - 1 === currentPage) {
        ref.loadMore.classList.add("hidden");
        alert("FINISH!");
      }
      currentPage += 1;
      currentKeyword = keyword;
    })
    .catch((error) => {
      ref.loadMore.classList.add("hidden");
    });
}

function renderEvents(arrayEvents) {
  const renderList = arrayEvents.map(
    (event) =>
      `<li class="event-li"><img class="img-event" src="${event.images[0].url}"><p class="name-event">${event.name}</p></li>`
  );
  ref.listEvents.insertAdjacentHTML("beforeend", renderList.join(""));
}

ref.form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const keyword = evt.currentTarget.elements.query.value;
  if (!keyword) {
    return;
  }
  if (keyword !== currentKeyword) {
    currentPage = 0;
    currentKeyword = keyword;
    ref.listEvents.innerHTML = "";
  }
  getEvents(currentPage, keyword);
});

ref.loadMore.addEventListener("click", (evt) => {
  getEvents(currentPage, currentKeyword);
});
