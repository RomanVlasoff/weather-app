import Vue from 'vue'
import Vuex from 'vuex'
import errors from './modules/errors'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    errors,
    search,
  }
})
