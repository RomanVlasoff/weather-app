import { en } from 'vuetify/lib/locale'

export default {
    // ...en,
    $vuetify: {
        ...en,
    },
        city: 'City',
        exampleCity: 'London',
        keke: 'Перевод',

        i18n: {
            selectLanguage: 'Select language',
            languageName: 'English'
        },

        errors: {
            noCityWithEnteredName: 'Город с указанным названием не найден',
            requestError: 'Что-то пошло не так...'
        }
}
