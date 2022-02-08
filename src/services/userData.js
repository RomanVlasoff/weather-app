// import { pick } from 'lodash'

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

// export function addCityToUserSearchHistory(newCity, _locales = ['en', 'ru']) {
//     const locales = _locales.includes('en') ? _locales : [..._locales, 'en']
//     const history = getUserCitySearchHistory();
//     if (history.find(city => city['en'] === newCity.local_names['en'])) {
//         return;
//     }
//     history.push(pick(newCity.local_names, locales));
//     localStorage.setItem(SEARCH_HISTORY, history)
// }

export function setUserSearchHistory(history) {
    console.log('setUserSearchHistory')
    console.log(history)
    localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}

export function subscribeOnSearchHistoryChange(callback) {
    const onLocalStorageChange = (e) => {
        console.log('onLocalStorageChange')
        console.log(e)
        if (e.key === SEARCH_HISTORY) {
            console.log('onLocalStorageChange 1')
            callback(parseHistoryFromString(e.newValue));
        }
    }
    window.addEventListener('storage', onLocalStorageChange);
    const unsubscribe = () => {
        window.removeEventListener('storage', onLocalStorageChange);
    }
    return unsubscribe;
}
