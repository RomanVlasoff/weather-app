import Vue from 'vue';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import en from '@/locale/en'
import ru from '@/locale/ru'

const i18n = new VueI18n({
    locale: 'ru',
    messages: {en, ru},
})

export {i18n}
