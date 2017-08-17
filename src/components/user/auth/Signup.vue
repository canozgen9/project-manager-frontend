<template>
  <v-card>
    <blockquote>
      <h3 class="white--text"><v-icon x-large>person_add</v-icon> Sign up</h3>
        <v-container fluid grid-list-xs>
          <v-layout row wrap>
            <v-flex xs12>
              <img class="image" :src="imageSrc" alt="lorem" width="100%" height="100%">
            </v-flex>
          </v-layout>
            <input @change="uploadImage" type="file" name="photo" accept="image/*">
        </v-container>
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
        password: '',
        imageSrc: '/static/friend.png'
      }
    },
    methods: {
      onSignup () {
        axios
          .post('http://' + this.$store.state.api + ':3000/user/new', {username: this.username, email: this.email, password: this.password}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
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
      },
      uploadImage: function (e) {
        var files = e.target.files
        if (!files[0]) {
          return
        }
        var data = new FormData()
        data.append('image', files[0])
//        var reader = new FileReader()
//        reader.onload = (e) => {
//          this.imageSrc = e.target.result
//          console.log(e.target.result)
//        }
        var config = {
          'Access-Control-Allow-Origin': '*',
          onUploadProgress: progressEvent => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
          }
        }
        var _this = this
        axios.post('http://' + this.$store.state.api + ':3000/uploads', data, config)
          .then(function (response) {
            if (response.data.success) {
              _this.imageSrc = 'http://' + _this.$store.state.api + ':3000' + response.data.filepath
            } else {
              console.log('server error')
              console.log(response.data.message)
            }
          }).catch(function (error) {
            console.log('xml error')
            console.log(error) // catch your error
          })
      }
    }
  }
</script>

<style scoped>

</style>
