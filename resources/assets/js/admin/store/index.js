import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import loading from "./modules/loading";
import user from "./modules/user";
import file from "./modules/fileUpload";

export default new Vuex.Store({
    modules:{
        loading,
        user,
        file,
    },
})