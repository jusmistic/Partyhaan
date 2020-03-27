import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './firebase-app'
import { firestorePlugin } from 'vuefire'
import { firebaseAuth } from './firebase-app'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(firestorePlugin)

// Vue.$store.dispatch('isLoggedIn')
firebaseAuth().onAuthStateChanged(function(user) {
  if (user) {
    // console.log(user)
    store.dispatch('autoLogin', user)
    router.push('/dashboard')
  } else {
    // No user is signed in.
    // router.push('/login')

  }
});
