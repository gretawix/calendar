import type { Events, ObjectValues } from "../types/main";

const LOCAL_STORAGE_KEY = {
    SAVED_EVENTS: "savedEvents",
} as const;

type LocalStorageKey = ObjectValues<typeof LOCAL_STORAGE_KEY>;

type LocalStorageData<T extends LocalStorageKey> = {
    [LOCAL_STORAGE_KEY.SAVED_EVENTS]: Events;
}[T];

const storeDataInLocalStorage = <T extends LocalStorageKey>(key: T, data: LocalStorageData<T>) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

const getDataFromLocalStorage = <T extends LocalStorageKey>(key: T): LocalStorageData<T> => {
    try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            return JSON.parse(storedData) as LocalStorageData<T>;
        }
    } catch (error) {
        console.error("Failed to retrieve data from local storage:", error);
    }

    return {} as LocalStorageData<T>;
};

export { storeDataInLocalStorage, getDataFromLocalStorage, LOCAL_STORAGE_KEY };
