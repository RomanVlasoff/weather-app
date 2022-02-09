import Vue from 'vue'
import App from './App.vue'
import {vuetify} from './plugins/vuetify'
import {i18n} from './plugins/vue-i18n'
import VuetifyToast from 'vuetify-toast-snackbar'
import store from './store'

Vue.config.productionTip = false

Vue.use(VuetifyToast, {
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$toast'
});

new Vue({
    vuetify,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')
