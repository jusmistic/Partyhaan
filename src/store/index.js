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
    resParty: null,
    userParty: null,
    currentParty: null
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
    setResParty(state, payload){
      state.resParty = payload
    },
    setUserParty(state, payload){
      state.userParty = payload
    },
    setCurrentParty(state, payload){
      state.currentParty = payload
    }
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
      .set({'uid':user.uid,'name':payload.name})
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

  // Create Party
  createParty({commit}, payload){
    commit('setStatus', 'Start Create party')
    console.log('sending')
    db.collection('party')
    .add(payload)
    .then((res)=>{
      commit('setStatus', 'Create Party Success')
      commit('setError', null)
      // Set Respone Party to resParty
      commit('setResParty', res)
      
    })
    .catch(error => console.error("Error adding document: ", error))
  },

  getUserParty({commit}){
    commit('setStatus', 'Start Get User Party')
    db.collection('party')
    .where('ownerId','==',this.getters.user.uid)
    .get()
    .then((res)=>{
      commit('setStatus', 'Query User Party Complete')
      let partys = []
      res.forEach((docs)=>{
        let party = docs.data()
        party.id = docs.id
        partys.push(party)
      })
      
      commit('setUserParty', partys)
    })
    .catch((err)=>{
      commit('setError', err)
    })
  },

  getPartyById({commit}, partyId){
    commit('setStatus', 'Get party by id')
    db.collection('party')
    .doc(partyId)
    .get()
    .then((doc)=>{
      commit('setCurrentParty',doc.data())
      commit('setStatus', 'Get party by ID complete')
      commit('setError', null)
    })
    .catch((err)=>{
      commit('setError', err)
    })
  }
    
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
    },
    resParty(state){
      return state.resParty
    },
    userParty(state){
      return state.userParty
    },
    currentParty(state){
      return state.currentParty
    }
  },
  modules: {
  }
})