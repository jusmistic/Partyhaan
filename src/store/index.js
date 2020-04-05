import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from 'firebase/app';
// import 'firebase/auth';
import {firebaseAuth, firebaseDb, firebaseDbVar} from '../firebase-app'

Vue.use(Vuex)
let auth = firebaseAuth
let db = firebaseDb
let fbVar = firebaseDbVar

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
      .set({'uid':user.uid,'name':payload.name, party:[]})
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
  // join party
  async addPartyToUser({commit}, partyId){
    try{
      const userRef = await db.collection('users')
                              .doc(this.getters.user.uid)
                              .update({
                                party: fbVar.FieldValue.arrayUnion(partyId)
                              })
      if(userRef){
        commit('setStatus', 'Add Party to user completed')
      }
    } catch(err){
      console.log(err)
      commit('setError', err)
    }
  },
  async joinParty({commit}, partyId){
    commit('setStatus', 'Join Party')
    commit('setError', null)
    // check username exist in group before join
    try{
      const partyRef = await db.collection('party')
                              .doc(partyId)
                              .collection('members')
                              .where('id', '==', this.getters.user.uid)
                              .get()
      //check if user is already in this group
      if(!partyRef.empty){
        commit('setError','userExist')
        console.log(this.getters.error)
      } else{ //user not in group
        //add this user to party members collection
        const memberRef = await db.collection('party')
                                  .doc(partyId)
                                  .collection('members')
                                  .add({'id':this.getters.user.uid,'name':this.getters.user.displayName ,'paymentStatus':false})
        if(memberRef){
          //add to user party
          await this.dispatch('addPartyToUser', partyId)
          commit('setStatus', 'joinComplete')

          
        }
      }
    } catch(err){
      commit('setError', err)

    }

  },

  // Create Party
  async createParty({commit}, payload){
    let party = payload.party
    let members = payload.members
    commit('setStatus', 'Start Create party')
    const partyRef = await db.collection('party').add(party)
    try{
      const res = await db.collection('party')
                          .doc(partyRef.id)
                          .collection('members')
                          .add(members)
      await this.dispatch('addPartyToUser', partyRef.id)

      commit('setStatus', 'Create Party Success')
      commit('setError', null)
      // Set Respone Party to resParty
      commit('setResParty', res)
    } catch(err){
      commit('setError', err)
    }
 
  },

  getUserParty({commit}){
    commit('setStatus', 'Start Get User Party')
    db.collection('users')
      .doc(this.getters.user.uid)
      .get()
      .then((docRef)=>{
        let partys = docRef.data().party
        let partyList = []
        partys.forEach(party => {
          db.collection('party')
          .doc(party)
          .get()
          .then(partyRef =>{
            let tmpParty = partyRef.data()
            tmpParty.id = partyRef.id
            partyList.push(tmpParty)
          })
        });
        commit('setStatus', 'Query User Party Complete')
        commit('setUserParty', partyList)
    })
    
  },

  getPartyById({commit}, partyId){
    commit('setStatus', 'Get party by id')
    db.collection('party')
    .doc(partyId)
    .get()
    .then((doc)=>{
      // console.log(doc.data())
      let tmpParty = doc.data()
      tmpParty.members = []
      db.collection('party')
      .doc(partyId)
      .collection('members')
      .get()
      .then((memberRef) =>{
        memberRef.forEach(member => {
          tmpParty.members.push(member.data())
          // console.log(tmpParty.member)
        });
      })
      commit('setCurrentParty',tmpParty)
      commit('setStatus', 'Get party by ID complete')
      commit('setError', null)
    })
    .catch((err)=>{
      commit('setError', err)
    })
  },
  setPaymentStatus({commit}, payload){
    commit('setStatus', 'Set paymentStatus')
    let memberId = payload.memberId
    let status = payload.status
    let partyId = payload.partyId
    db.collection('party')
      .doc(partyId)
      .collection('members')
      .where('id', '==', memberId)
      .get()
      .then(docRef =>{
        //always has 1 doc
        docRef.forEach(doc =>{
          // console.log(doc.ref.id)
          db.collection('party')
            .doc(partyId)
            .collection('members')
            .doc(doc.ref.id) //ref to this doc
            .update({
              paymentStatus: status
            })
            .catch(err => {
              commit('setError', err)
            })
        })
      })
      .then(()=>{
        commit('setStatus', 'Set paymentStatus complete')
      })
      .catch(err => {
        commit('setError', err)
      })

  },

  removeMember({commit}, payload){
    commit('setStatus', 'Remove Member from party')
    let memberId = payload.memberId
    let partyId = payload.partyId 
    db.collection('party')
      .doc(partyId)
      .collection('members')
      .where('id', '==', memberId)
      .get()
      .then((docRef)=>{
        docRef.forEach(doc => {
          //remove member
          db.collection('party')
            .doc(partyId)
            .collection('members')
            .doc(doc.ref.id)
            .delete()
            .then(()=>{
              commit('setStatus', 'Removed from party')
              db.collection('users')
                .doc(memberId)
                .update({
                  party: fbVar.FieldValue.arrayRemove(partyId)
                })
                .then(()=>{
                  commit('setStatus', 'Removed from user')
                })
                .catch(err=>{
                  commit('setError', err)
                  })
            })
            .catch(err=>{
              commit('setError', err)
            })
          
          
        })
      })
      .catch(err=>{ commit('setError',err)})
  },
  deleteParty({commit}, partyId){
    commit('setStatus', 'Deleting Party'+partyId)
    db.collection('party')
      .doc(partyId)
      .delete()
      .then(()=>{
        commit('setStatus', 'Deleted Party '+partyId)
        commit('setStatus', 'Deleted Party '+partyId)
      })
      .catch(err=>commit('setError', err))
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
