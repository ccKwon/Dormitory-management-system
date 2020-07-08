import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    userInfo: {}
};

const getters = {

};

const mutations = {
    getUserInfo(state, userinfo) {
        // Object.assign(state.userInfo, userinfo)
        state.userInfo = userinfo;
    }
};

const actions = {
    changeUserinfo(context, userinfo) {
        context.commit("getUserInfo", userinfo)
    }
    // getuserInfo({ commit }) {
    //     let user = localStorage.getItem("username");
    //     let i = localStorage.getItem("i");
    //     let userinfo = {};
    //     this.$axios.get('/api/getuser?account=' + user).then(res => {
    //         userinfo = res.data;
    //         userinfo.identity = i;
    //         // this.$store.commit('getUserInfo', userinfo)
    //         commit('getUserInfo', userinfo);
    //     })
    // }

};



const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
}

);

export default store;