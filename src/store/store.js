import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    // realtime updates from our posts collection
    fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      let postsArray = []

      querySnapshot.forEach(doc => {
        let post = doc.data()
        post.id = doc.id
        postsArray.push(post)
      })

      store.commit('setPosts', postsArray)
    })
  }
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: []
  },
  actions: {
    fetchUserProfile({
      commit,
      state
    }) {
      fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    clearData({
      commit
    }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setPosts', null)
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val) {
      state.posts = val
    }
  }
})

export default store