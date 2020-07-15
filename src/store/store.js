import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import getters from "./getters"
import mutations from "./state"
import actions from "./state"
import mutations_type from "./mutations_types"
Vue.use(Vuex);

export default new Vuex.store({
    state,
    getters,
    mutations,
    actions
})
