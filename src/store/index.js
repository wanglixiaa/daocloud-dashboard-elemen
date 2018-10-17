import Vue from 'vue'
import Vuex from 'vuex'
import personalMenu from '@/config/personal-menu-config'
import cachaMenu from '@/config/cacha-menu-config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menu: personalMenu
  },
  mutations: {
    change (state) {
      if (state.menu === cachaMenu) {
        state.menu = personalMenu
      } else {
        state.menu = cachaMenu
      }
    }
  }
})

export default store
