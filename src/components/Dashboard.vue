<template>
<div id="dashboard">

  <section>
    <div class="col1">
      <div class="profile">
        <h5>{{ userProfile.name }}</h5>
        <p>{{ userProfile.title }}</p>
        <div class="create-post">
          <p>create a post</p>
          <form @submit.prevent>
            <textarea v-model.trim="post.content"></textarea>
            <button class="button" @click="createPost" :disabled="post.content == ''">post</button>
          </form>
        </div>
      </div>
    </div>
    <div class="col2">
      <div>
        <p class="no-results">There are currently no posts</p>
      </div>
    </div>
  </section>

</div>
</template>

<script>
import {
  mapState
} from 'vuex'
const fb = require('../firebaseConfig.js')

export default {
  data() {
    return {
      post: {
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    createPost() {
      fb.postsCollection.add({
        createdOn: new Date(),
        content: this.post.content,
        userId: this.currentUser.uid,
        userName: this.userProfile.name,
        comments: 0,
        likes: 0
      }).then(ref => {
        this.post.content = ''
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
