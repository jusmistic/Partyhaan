import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import createParty from '../components/createParty.vue'
import joinParty from '../components/joinParty.vue'
import party from '../components/party.vue'
import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/create',
    name: 'createParty',
    component: createParty
  },
  {
    path: '/join',
    name: 'joinParty',
    component: joinParty
  },
  // {
  //   path: '/party',
  //   name: 'party',
  //   component: party
  // },
  {
    path: '/party/:id',
    name: 'partyPage',
    component: party
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.path === '/login'||
     to.path === '/register' ||
     store.getters.user
  ){
    return next()
  } else{
    router.push({path:"/login", query:{to: to.path}});
  }
})

export default router
