<template>
  <v-card>
  <v-container fluid>
    <v-layout row mb-2>
      <div v-if="isConnected">
        <v-icon class="green--text">autorenew</v-icon>
        Connected
        <v-btn flat>Disconnect</v-btn>
      </div>
      <div v-else>
        <v-icon class="grey--text">error</v-icon>
        Offline
        <v-btn flat>Connect</v-btn>
      </div>
    </v-layout>
    <v-layout align-center justify-center v-if="loading" row mb-2>
      <v-progress-circular indeterminate v-bind:size="60" class="primary--text"></v-progress-circular>
    </v-layout>
    <v-layout v-else row mb-2>
      <div class="scrollbar" id="style-10">
        <v-container>
          <div v-for="(message,i) in messages" :key="i">
            <div v-if="message.user.client">
              <!-- if -->
              <v-layout row v-if="message.user._id === authenticatedUser._id" style="margin-bottom: -30px">
                <v-spacer></v-spacer>
              <v-slide-y-transition appear mode="out-in">
                <v-container>
                  <v-layout row v-if="notAdjoiningMessage(i)">
                    <v-spacer></v-spacer>
                    <i><small>{{ message.user.username }}</small></i>
                  </v-layout>
                  <div v-else></div>
                  <v-layout row>
                    <v-spacer></v-spacer>
                    <v-chip :class="message.user.color" class="white--text">
                      {{ message.message }}
                    </v-chip>
                  </v-layout>
                </v-container>
              </v-slide-y-transition>
              </v-layout>
              <!-- else -->
              <v-layout row v-else style="margin-bottom: -30px">
              <v-slide-y-transition appear mode="out-in">
                <v-container>
                  <v-layout row v-if="notAdjoiningMessage(i)">
                    <i><small>{{ message.user.username }}</small></i>
                    <v-spacer></v-spacer>
                  </v-layout>
                  <div v-else></div>
                  <v-layout row>
                    <v-chip :class="message.user.color" class="white--text">
                      {{ message.message }}
                    </v-chip>
                    <v-spacer></v-spacer>
                  </v-layout>
                </v-container>
              </v-slide-y-transition>
              </v-layout>
            </div>

            <div v-else>
              <v-layout row v-if="message.user._id === authenticatedUser._id" style="margin-bottom: -30px">
                <v-spacer></v-spacer>
              <v-slide-y-transition appear mode="out-in">
                <v-container>
                  <v-layout row v-if="notAdjoiningMessage(i)">
                    <v-spacer></v-spacer>
                    <i><small>{{ message.user.username }}</small></i>
                  </v-layout>
                  <div v-else></div>
                  <v-layout row>
                    <v-spacer></v-spacer>
                    <v-chip :class="message.user.color" class="white--text">
                      {{ message.message }}
                    </v-chip>
                  </v-layout>
                </v-container>
              </v-slide-y-transition>
              </v-layout>
              <!-- else -->
              <v-layout row v-else style="margin-bottom: -30px">
              <v-slide-y-transition appear mode="out-in">
                <v-container>
                  <v-layout row v-if="notAdjoiningMessage(i)">
                    <i><small>{{ message.user.username }}</small></i>
                    <v-spacer></v-spacer>
                  </v-layout>
                  <div v-else></div>
                  <v-layout row>
                    <v-chip :class="message.user.color" class="white--text">
                      {{ message.message }}
                    </v-chip>
                    <v-spacer></v-spacer>
                  </v-layout>
                </v-container>
              </v-slide-y-transition>
              </v-layout>
            </div>
          </div>
        </v-container>
      </div>
    </v-layout>
    <v-layout row wrap mb-4>
        <v-flex xs12 style="margin-bottom: -40px">
          <v-text-field ref="messageInput" @keypress.enter.prevent ="sendMessage" name="input-1" label="Send message" v-model="message" textarea dark></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row wrap mb-4>
      <v-spacer></v-spacer>
      <v-btn flat @click="sendMessage" class="primary">Send</v-btn>
    </v-layout>
    <v-layout row wrap>
      <!--<v-chip v-for="(client,i) in clients" :key="i" :class="client.color" class="white&#45;&#45;text">-->
        <!--{{ client.username }}-->
      <!--</v-chip>-->
    </v-layout>
  </v-container>
  </v-card>
</template>

<script>
  import toastr from 'toastr'
  export default {
    props: [
      'room'
    ],
    name: 'chat',
    data () {
      return {
        messages: [],
        message: '',
        loading: true
      }
    },
    sockets: {
      gotMessage (message) {
        if (message.room === this.room) {
          this.messages.push(message)
          this.$nextTick(function () {
            var container = this.$el.querySelector('#style-10')
            container.scrollTop = container.scrollHeight
          })
        } else {
          toastr.info(message.message, message.user.username + ' to ' + message.room + '!')
        }
      }
    },
    watch: {
      '$route.params.id' () {
        this.loading = true
        this.$store.dispatch('getProjectMessages', {room: this.room}).then((messages) => {
          this.messages = messages
          this.loading = false
          this.$nextTick(function () {
            var container = this.$el.querySelector('#style-10')
            container.scrollTop = container.scrollHeight
          })
        })
      }
    },
    mounted () {
      this.$store.dispatch('getProjectMessages', {room: this.room}).then((messages) => {
        this.messages = messages
        this.loading = false
        this.$nextTick(function () {
          var container = this.$el.querySelector('#style-10')
          container.scrollTop = container.scrollHeight
        })
      })
    },
    computed: {
      authenticatedUser () {
        return this.$store.getters.getAuthenticatedUser
      },
      isConnected () {
        return this.$store.state.isConnected
      },
      socket () {
        return this.$store.getters.getSocket
      }
    },
    methods: {
      sendMessage () {
        if (this.isConnected) {
          if (this.message.trim().length > 0) {
            var message = {
              content: this.message,
              room: this.room
            }
            this.socket.emit('sendMessage', message)
            this.message = ''
            this.$refs.messageInput.focus()
          }
        }
      },
      notAdjoiningMessage: function (i) {
        if (i - 1 < 0) {
          return true
        } else {
          if (this.messages[i].user._id === this.messages[i - 1].user._id) {
            return false
          } else {
            return true
          }
        }
      }
    }
  }
</script>

<style>

  .scrollbar
  {
    float: left;
    height: 400px;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #wrapper
  {
    text-align: center;
    width: 500px;
    margin: auto;
  }

  /*
   *  STYLE 10
   */

  #style-10::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }

  #style-10::-webkit-scrollbar
  {
    width: 10px;
  }

  #style-10::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-image: -webkit-linear-gradient(90deg,
    rgba(0, 0, 0, .2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, .2) 50%,
    rgba(0, 0, 0, .2) 75%,
    transparent 75%,
    transparent)
  }

</style>
