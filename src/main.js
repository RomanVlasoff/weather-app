import Vue from 'vue'
import App from './App.vue'
import { vuetify, i18n } from './plugins/vuetify'
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
