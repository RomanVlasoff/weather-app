import axios from './axios'

const API_KEY = '767647942a0f777311afe0714eee4be4'

// const API_KEY ='767647942a0f777311afe0714eee4be4-'

export function getCityByLocationName(name) {
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`)
        .then(response => Promise.resolve(response.data.length ? response.data[0] : null));
}

export function getCurrentWeatherForLocation({lon, lat}, lang = 'en') {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}`)
        .then(response => Promise.resolve(response.data));
}

export function getWeatherIconUrlByName(iconName, size = 4) {
    return `https://openweathermap.org/img/wn/${iconName}@${size}x.png`
}
