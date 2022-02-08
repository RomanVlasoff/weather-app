import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import VueI18n from 'vue-i18n'

Vue.use(Vuetify);
Vue.use(VueI18n)

import en from '@/locale/en'
import ru from '@/locale/ru'
// import { en, ru } from 'vuetify/lib/locale'

const i18n = new VueI18n({
    locale: 'ru',
    messages: { en, ru },
})

const vuetify = new Vuetify({
    lang: {
        // locales: { en, ru },
        // current: 'ru',
        t: (key, ...params) => i18n.t(key, params),
    },
});

export { i18n, vuetify }
