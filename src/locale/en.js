import {en} from 'vuetify/lib/locale'

export default {
    $vuetify: {
        ...en,
    },
    appName: 'EasyWeatherApp',
    city: 'City',
    exampleCity: 'London',
    feelsLike: 'Feels like {temp}',
    maxMinTemp: 'Max {max}, min {min}',
    pressureValue: '{value} mm Hg',
    timeNow: 'Now {time}',
    humidity: 'Humidity',
    pressure: 'Atmosphere pressure',
    wind: {
        wind: 'Wind',
        speedAndDirection: '{speed} m/s, {direction}',
        directions: {
            N: 'N',
            NE: 'NE',
            E: 'E',
            SE: 'SE',
            S: 'S',
            SW: 'SW',
            W: 'W',
            NW: 'NW'
        },
    },
    i18n: {
        selectLanguage: 'Select language',
        languageName: 'English'
    },
    errors: {
        noCityWithEnteredName: 'City with the entered name not found',
        requestError: 'Something went wrong...',
        cityNameIsRequired: 'Enter the city name'
    }
}
