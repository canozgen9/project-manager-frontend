<template>
  <v-card>
    <blockquote>
      <h3 class="white--text"><v-icon x-large>person_add</v-icon> Sign up</h3>
        <v-container fluid>
          <v-layout row wrap v-if="!uploading" align-center justify-center>
            <img class="image mb-2" :src="imageSrc" alt="lorem" width="90%" height="90%">
              <v-btn @click="openFileChooser" flat>Choose Avatar</v-btn>
            <div class="upload-btn-wrapper">
              <input ref="avatarUpload" @change="uploadImage" type="file" name="myfile" accept="image/*">
            </div>
          </v-layout>
          <v-layout v-else align-center justify-center class="mt-2">
            <v-progress-circular
              v-bind:size="200"
              v-bind:width="15"
              v-bind:rotate="360"
              v-bind:value="uploadingProcess"
              class="primary--text"
            >
              {{ uploadingProcess }}
            </v-progress-circular>
          </v-layout>
          <v-layout row wrap>
          </v-layout>
        </v-container>
      <v-container fluid mt-1>
        <form @submit.prevent="onSignup">
          <v-layout row>
            <v-flex xs12 md10 offset-md1>
              <v-text-field v-model="name" name="input-1" label="Full Name" dark></v-text-field>
            </v-flex>
          </v-layout>
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
            <v-btn :disabled="uploading" type="submit" flat>Sign up</v-btn>
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
        name: '',
        username: '',
        email: '',
        password: '',
        imageSrc: '/static/friend.png',
        uploading: false,
        uploadingProcess: 0
      }
    },
    methods: {
      openFileChooser () {
        this.$refs['avatarUpload'].click()
      },
      onSignup () {
        axios
          .post('http://' + this.$store.state.api + ':3000/user/new', {username: this.username, email: this.email, password: this.password, avatar: this.imageSrc, name: this.name}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
          .then((res) => {
            console.log(res)
            toastr.success('Please sign in.', 'Your account created')
            this.username = ''
            this.email = ''
            this.password = ''
            this.name = ''
            this.imageSrc = '/static/friend.png'
            this.$router.push('/signin')
          })
          .catch((err) => {
            console.log(err)
            toastr.error('Please try again later', 'Something went wrong')
          })
      },
      uploadImage: function (e) {
        this.uploading = true
        var files = e.target.files
        if (!files[0]) {
          return
        }
        var data = new FormData()
        data.append('image', files[0])
        var _this = this
        var config = {
          'Access-Control-Allow-Origin': '*',
          onUploadProgress: progressEvent => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
            _this.uploadingProcess = percentCompleted
          }
        }
        axios.post('http://' + this.$store.state.api + ':3000/uploads', data, config)
          .then(function (response) {
            if (response.data.success) {
              _this.imageSrc = 'http://' + _this.$store.state.api + ':3000' + response.data.filepath
              _this.uploading = false
              _this.uploadingProcess = 0
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
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    cursor: pointer;
  }

  .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
</style>
