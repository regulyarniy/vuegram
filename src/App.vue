<template>
<div id="app">
  <Navigation v-if="currentUser"></Navigation>
  <router-view/>
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
import Navigation from './components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style>
</style>
