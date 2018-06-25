import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import storeLoading from '../modules/loading/store';
export default new Vuex.Store({
    modules: {
        storeLoading
    }
})
