import { createDiv } from "./utils.js";

const createEventTile = (event) => {
    const clickedElement = event.target;
    const weekDaysRowHeight = document.querySelector("#days-row").getBoundingClientRect().height;
    const left = clickedElement.getBoundingClientRect().left;
    const eventTile = createDiv("event-tile regular");

    eventTile.innerHTML = `<p class="event-tile-title">Event title very long text is going here</p>
                            <p class="event-tile-time">10:30 - 11:30am</p>`;

    eventTile.style.top = `${event.clientY - weekDaysRowHeight}px`;
    clickedElement.appendChild(eventTile);

    return eventTile;
};

export { createEventTile };
