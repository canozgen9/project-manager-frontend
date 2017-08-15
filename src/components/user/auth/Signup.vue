<template>
  <v-card>
    <blockquote>
      <h3 class="white--text"><v-icon x-large>person_add</v-icon> Sign up</h3>
      <v-container fluid mt-1>
        <form @submit.prevent="onSignup">
          <v-layout row>
            <v-flex xs12 md10 offset-md1>
              <v-text-field v-model="username" name="input-1" label="Username" dark></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md10 offset-md1>
              <v-text-field v-model="email" name="input-1" label="Email" type="email" dark></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md10 offset-md1>
              <v-text-field v-model="password" name="input-1" label="Password" type="password" dark></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-spacer></v-spacer>
            <v-btn type="submit" flat>Sign up</v-btn>
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
        email: '',
        password: ''
      }
    },
    methods: {
      onSignup () {
        axios
          .post('http://' + this.$store.state.api + ':3000/signup', {username: this.username, email: this.email, password: this.password}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
          .then((res) => {
            console.log(res)
            toastr.success('Please sign in.', 'Your account created')
            this.username = ''
            this.email = ''
            this.password = ''
            this.$router.push('/signin')
          })
          .catch((err) => {
            console.log(err)
            toastr.error('Please try again later', 'Something went wrong')
          })
      }
    }
  }
</script>
