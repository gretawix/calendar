import { EventData } from "./types/main.js";

const currentEventDataKey: string = "currentEventData";
const savedEventsKey: string = "allSavedEvents";

const storeDataInLocalStorage = (key: string, data: EventData | EventData[]) => {
    try {
        if (key && data !== undefined) {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
    return false;
};

const getDataFromLocalStorage = (key: string) => {
    try {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { storeDataInLocalStorage, getDataFromLocalStorage, currentEventDataKey, savedEventsKey };
