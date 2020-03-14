<template>
  <v-app>
    <nav-bar></nav-bar>
    <router-view id="router-view-id"></router-view>
  </v-app>
</template>

<script>

import NavBar from '@/views/NavBar'
export default {
  name: 'App',
  components: {
    NavBar,
  },

  data: () => ({

  }),
};
</script>
<style>
  #router-view-id{
    margin-top: 1rem;
  }
</style>