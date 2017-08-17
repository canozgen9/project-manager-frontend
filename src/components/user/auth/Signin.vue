<template>
  <v-card>
    <blockquote>
      <h3><v-icon x-large>lock_open</v-icon> Sign in</h3>
      <v-container fluid>
        <form @submit.prevent="onSignin">
          <v-layout row>
            <v-flex xs12 md10 offset-md1>
              <v-text-field v-model="username" name="input-1" label="Username or email"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md10 offset-md1>
              <v-text-field v-model="password" name="input-1" label="Password" type="password"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-btn type="submit" flat>Sign in</v-btn>
          </v-layout>
        </form>
      </v-container>
    </blockquote>
  </v-card>
</template>

<script>
  import axios from 'axios'
  import toastr from 'toastr'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      onSignin () {
        axios
          .post('http://' + this.$store.state.api + ':3000/user/authenticate', {username: this.username, password: this.password}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
          .then((res) => {
            console.log(res)
            if (res.data.success) {
              localStorage.setItem('token', res.data.token)
              this.username = ''
              this.password = ''
              this.$store.dispatch('setAuthenticatedUser', res.data.user)
              this.$store.dispatch('openSocket')
              this.$store.dispatch('getClient')
              this.$store.dispatch('joinRooms')
              this.$router.push('/dashboard')
            } else {
              toastr.error(res.data.message, 'Login failed')
            }
          })
          .catch((error) => {
            toastr.error(error, 'Something went wrong!')
          })
      }
    }
  }
</script>
