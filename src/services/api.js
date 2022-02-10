import axios from './axios'

const API_KEY = process.env.VUE_APP_API_KEY

export function getCityByLocationName(name) {
    return axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`)
        .then(response => Promise.resolve(response.data.length ? response.data[0] : null));
}

export function getWeatherForLocation({lon, lat}, lang = 'en') {
    return axios.get(`https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}&exclude=minutely,hourly,alerts`)
        .then(response => Promise.resolve(response.data));
}

export function getWeatherIconUrlByName(iconName, size = 4) {
    return `https://openweathermap.org/img/wn/${iconName}@${size}x.png`
}
