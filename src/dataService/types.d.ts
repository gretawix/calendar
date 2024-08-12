import { LOCAL_STORAGE_KEY } from "./handleLocalStorage";
import type { Events, ObjectValues } from "../types/main";

export type DataSource = "local-storage" | "json-server";

export type LocalStorageKey = ObjectValues<typeof LOCAL_STORAGE_KEY>;

export type LocalStorageData<T extends LocalStorageKey> = {
    [LOCAL_STORAGE_KEY.SAVED_EVENTS]: Events;
}[T];

export interface EventsService {
    getAll(): Promise<Events>;
    create(event: EventData, eventType?: keyof Events): Promise<void>;
}
