import Vue from 'vue'
import Vuex from 'vuex'

import { app } from './modules/app'
import { menu } from './modules/menu'
import { sunRiseSunSet } from './modules/sunRiseSunSet'
import { template } from './modules/template'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    version: ''
  },
  modules: {
    app,
    menu,
    template,
    sunRiseSunSet
  }
})
