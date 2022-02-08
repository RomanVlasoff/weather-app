import {ru} from 'vuetify/lib/locale'

export default {
    // ...ru,
    $vuetify: {
        ...ru,
    },
    city: 'Город',
    exampleCity: 'Москва',
    feelsLike: 'Ощущается как {temp}',
    maxMinTemp: 'Макс. {max}, мин. {min}',
    pressureValue: '{value} мм рт. ст.',

    wind: {
        speedAndDirection: '{speed} м/с, {direction}',
        directions: {
            N: 'С',
            NE: 'СВ',
            E: 'В',
            SE: 'ЮВ',
            S: 'Ю',
            SW: 'ЮЗ',
            W: 'З',
            NW: 'СЗ'
        },
    },

    i18n: {
        selectLanguage: 'Выберите язык',
        languageName: 'Русский'
    },

    errors: {
        noCityWithEnteredName: 'Город с указанным названием не найден',
        requestError: 'Что-то пошло не так...'
    }
}
