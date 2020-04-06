<template>
<div>
  <v-container>
     <v-row dense>
         <v-col cols="12">
            <h3>User: {{user.displayName}}</h3>
         </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="4">
        <v-btn  to='/join'>Join'Ty</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-btn to='/create'>Create'Ty</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
      <v-row dense>
         <v-col cols="12">
          <v-card class='cardItem' :to="'/party/'+party.id" v-for='party in userParty' v-bind:key="party.id">
                <v-row 
                 justify="center">
                  <v-spacer></v-spacer>
                  <v-col cols='1' v-if="party.ownerId == user.uid">
                    👑
                  </v-col>
                  <v-col cols="6">
                    <h3>{{party.name}}</h3>
                  </v-col>
                  <v-col cols="4">
                    ✔
                  </v-col>
                </v-row>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</div>
</template>

<script>
import store from '../store/index'
export default {
  store,
  data() {
      return {
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
    userParty(){
      return this.$store.getters.userParty
    }
  },
  methods: {
    
  },
  created(){
    // Get All User's Party
    this.$store.dispatch('getUserParty')
    //    
    

  },
  mounted(){
    this.$store.dispatch('getUserParty')

  }

}
</script>

<style>
.cardItem{
  width: 100%;
}
</style>