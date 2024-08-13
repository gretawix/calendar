import type { EventsService } from "./types";

let eventsService: EventsService | null = null;

export const globalAppState = {
    getEventsService: () => {
        if (eventsService === null) {
            throw new Error("Event service is not provided to global app state");
        }

        return eventsService;
    },
    setEventsService: (service: EventsService) => {
        eventsService = service;
    },
};
