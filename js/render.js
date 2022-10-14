import { ref } from "./refs.js";

export default function renderEvents(arrayEvents) {
  const renderList = arrayEvents.map(
    (event) =>
      `<li class="event-li"><img class="img-event" src="${event.images[0].url}"><p class="name-event">${event.name}</p></li>`
  );
  ref.listEvents.insertAdjacentHTML("beforeend", renderList.join(""));
}
