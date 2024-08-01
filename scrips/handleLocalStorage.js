const eventsDataKey = "eventsData";

const storeDataInLocalStorage = (key, data) => {
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

const getDataFromLocalStorage = (key) => {
    try {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { storeDataInLocalStorage, getDataFromLocalStorage, eventsDataKey };
