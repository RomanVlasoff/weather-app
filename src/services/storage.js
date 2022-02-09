const SEARCH_HISTORY = 'searchHistory'

function parseHistoryFromString(string) {
    if (!string) {
        return []
    }

    try {
        const parsed = JSON.parse(string);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return [];
    } catch {
        return []
    }
}

export function getUserCitySearchHistory() {
    const historyString = localStorage.getItem(SEARCH_HISTORY);
    return parseHistoryFromString(historyString);
}

export function setUserSearchHistory(history) {
    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

export function subscribeOnSearchHistoryChange(callback) {
    const onLocalStorageChange = (e) => {
        if (e.key === SEARCH_HISTORY) {
            callback(parseHistoryFromString(e.newValue));
        }
    }
    window.addEventListener('storage', onLocalStorageChange);
    const unsubscribe = () => {
        window.removeEventListener('storage', onLocalStorageChange);
    }
    return unsubscribe;
}
