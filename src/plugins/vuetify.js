import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import {i18n} from './vue-i18n'

Vue.use(Vuetify);

const vuetify = new Vuetify({
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
});

export {vuetify}
