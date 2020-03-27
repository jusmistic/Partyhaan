<template>
  <div id="NavBar">
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item router to="/" >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title >home</v-list-item-title>
          </v-list-item>

          <v-list-item router to="/dashboard" >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title >dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item router to="/login" v-if="!userLogedIn()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title >Login</v-list-item-title>
          </v-list-item>

          <v-list-item router to="/register" v-if="!userLogedIn()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title >Register</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout()" v-if="userLogedIn()">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item>
      </v-list-item-group>
      
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      title: process.env.VUE_APP_TITLE,
      
    }),
    methods:{
      userLogedIn() {
      return this.$store.getters.user
    },
      logout(){
        this.$store.dispatch('logout')
        if(this.$store.getters.error == null ){
              // if login not err
              this.$router.push({ path: '/login' }).catch()
          }
    }
    
    }
  }
</script>