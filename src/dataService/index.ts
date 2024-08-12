import type { EventData, Events } from "../types/main";

type DataSource = "local-storage" | "json-server";

interface EventsService {
    getAll(): Promise<Events>;
    create(event: EventData, eventType?: keyof Events): Promise<void>;
}

class EventsLocalStorageService implements EventsService {
    private localStorageKey: string = "savedEvents";

    async getAll(): Promise<Events> {
        const events = localStorage.getItem(this.localStorageKey);
        return events ? JSON.parse(events) : { all: [], current: {} };
    }

    async create(event: EventData, eventType: keyof Events = "all"): Promise<void> {
        const events = await this.getAll();
        if (eventType === "current") {
            events.current = event;
        } else {
            events.all.push(event);
        }
        localStorage.setItem(this.localStorageKey, JSON.stringify(events));
    }
}

const eventsServiceFactory = (dataSource: DataSource = "local-storage"): EventsService => {
    // if (dataSource === "local-storage")
    return new EventsLocalStorageService();
};

export default eventsServiceFactory;
