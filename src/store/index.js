import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    status:null,
    error: null,
    isLoggedin: false,
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    removeUser(state){
      state.user = null
    },
    setStatus(state, payload){
      state.status = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setIsLoggedin(state, payload){
      state.isLoggedin = payload
    }
  },
  actions: {
    register ({commit}, payload) {
      commit("setStatus", "Loading")
      commit("setError", null)

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
      // Register success
      commit('setUser', response.user.uid)
      commit('setStatus', 'Success')
      commit('setError', null)
      console.log(response)
      })
      .catch((error) => {
        commit('setStatus', 'Failure')
        commit('setError', error.message)
      console.log(error)
      })
  },
  login({commit}, payload) {
    commit("setStatus", "Loading")
    commit("setError", null)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid)
          commit('setStatus', 'Success')
          commit('setError', null)
          console.log(response)
        })
        .catch((error) => {
          commit('setStatus', 'Failure')
          commit('setError', error.message)
          console.log(error)
        })
  },
  logout ( {commit}) {
    firebase.auth().signOut()
      .then(() => {
        commit('setUser', null)
        commit('setStatus', 'success')
        commit('setError', null)
      })
      .catch((error) => {
        commit('setStatus', 'failure')
        commit('setError', error.message)
      })
  },
    
  },
  getters:{
    status(state){
      return state.status
    },
    user(state){
      return state.user
    },
    error(state){
      return state.error
    },
    isLoggedin(state){
      return state.error
    }
  },
  modules: {
  }
})
