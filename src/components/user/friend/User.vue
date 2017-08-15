<template>
  <div>
    <v-layout row wrap align-start>
      <v-flex xs12 md12 xl8>
        <v-card class="mb-2">
          <blockquote>
            <span><h4><v-icon x-large>account_box</v-icon><b> Profile | </b><i><small>{{ user.username }}</small></i></h4></span>
          </blockquote>
        </v-card>
      </v-flex>
      <v-flex xs12 md12 xl8>
        <v-card>
          <v-card-text>
            <v-chip class="grey white--text">Username: {{ user.username }}</v-chip>
            <v-chip class="red white--text">Email: {{ user.email }}</v-chip>
            <v-chip class="green white--text">Created At: {{ user.created_at }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        user: {}
      }
    },
    mounted () {
      console.log('token = ' + localStorage.getItem('token'))
      axios.get('http://localhost:3000/api/user?id=' + this.$route.params.id + '&token=' + localStorage.getItem('token'), {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            console.log('success = true')
            this.user = response.data.user
          } else {
            console.log('success = false')
          }
        })
        .catch((error) => {
          console.log('ERROR!!!' + error)
        })
    },
    methods: {

    },
    computed: {
      authenticedUser () {
        return this.$store.getters.getAuthenticatedUser
      }
    }
  }
</script>
