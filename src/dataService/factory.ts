import type { EventData, Events } from "../types/main";
import { storeDataInLocalStorage, getDataFromLocalStorage, LOCAL_STORAGE_KEY } from "./handleLocalStorage";
import type { DataSource, EventsService } from "./types";

class EventsLocalStorageService implements EventsService {
    async getAll(): Promise<Events> {
        return getDataFromLocalStorage(LOCAL_STORAGE_KEY.SAVED_EVENTS);
    }

    async create(event: EventData, eventType: keyof Events = "all"): Promise<void> {
        const events = await this.getAll();
        if (eventType === "current") {
            events.current = event;
        } else {
            events.all.push(event);
        }
        storeDataInLocalStorage(LOCAL_STORAGE_KEY.SAVED_EVENTS, events);
    }
}

const eventsServiceFactory = (dataSource: DataSource = "local-storage"): EventsService => {
    // if (dataSource === "local-storage")
    return new EventsLocalStorageService();
};

export default eventsServiceFactory;
