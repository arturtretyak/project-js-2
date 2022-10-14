import renderEvents from "./render.js";
import fetchEvents from "./fetch.js";
import { ref } from "./refs.js";

export let currentPage = 0;
export let currentKeyword = "";

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

ref.form.addEventListener("submit", searchHandler);

ref.loadMore.addEventListener("click", loadMoreHandler);

export function searchHandler(evt) {
  {
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
  }
}

export function loadMoreHandler(evt) {
  getEvents(currentPage, currentKeyword);
}
