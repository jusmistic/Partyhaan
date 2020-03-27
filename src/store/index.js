import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from 'firebase/app';
// import 'firebase/auth';
import {firebaseAuth, firebaseDb} from '../firebase-app'

Vue.use(Vuex)
let auth = firebaseAuth
let db = firebaseDb

export default new Vuex.Store({
  state: {
    user: null,
    status:null,
    error: null,
    name: null,
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
  },
  actions: {

    register ({commit}, payload) {
      commit("setStatus", "Loading")
      commit("setError", null)

      auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
      let user = response.user
      // Register success
      commit('setUser', user)
      commit('setStatus', 'Success')
      commit('setError', null)

      // create profile in firestore
      commit('setStatus', 'Loading')
      db.collection('users')
      .doc(user.uid)
      .set({'uid':user.uid,'partys':[]})
      .then(() => {
        commit('setStatus', 'User updated in firestore')
        commit('setError', null)      })
      
      return response.user.updateProfile({
        displayName: payload.name
      })
    })
      .catch((error) => {
        commit('setStatus', 'Failure')
        commit('setError', error.message)
      })
  },
  login({commit}, payload) {
    commit("setStatus", "Loading")
    commit("setError", null)
    auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user)
          commit('setStatus', 'Success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'Failure')
          commit('setError', error.message)
        })
  },
  logout ( {commit}) {
    auth().signOut()
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
  autoLogin({commit}, payload){
    commit('setUser', payload)
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
    name(state){
      return state.name
    }
  },
  modules: {
  }
})
