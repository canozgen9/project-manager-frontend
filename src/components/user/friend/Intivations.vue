<template>
  <v-card>
    <v-card-title><h5><v-icon large>supervisor_account</v-icon> Intivations</h5></v-card-title>
    <v-card-text>
      <v-layout align-center justify-center v-if="loading">
        <v-progress-circular indeterminate v-bind:size="60" class="primary--text"></v-progress-circular>
      </v-layout>
      <v-layout wrap v-else>
          <v-flex xs12 md6 v-for="(user,i) in intivations" :key="i" class="mb-2" v-if="!user.dismissedIntivation">
            <v-slide-y-transition appear mode="out-in">
              <v-card class="white black--text">
                <v-card-media class="grey lighten-2">
                  <v-container>
                    <v-layout row>
                      <h5 class="black--text"><b><v-icon large light>person</v-icon> {{ user.username }}</b></h5>
                    </v-layout>
                  </v-container>
                </v-card-media>
              <v-card-text>{{ user.email }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div v-if="user.aceeptedInvitation">
                  <v-btn class="blue black--text" light disabled>Accepted</v-btn>
                </div>
                <div v-else>
                  <v-btn class="blue" @click="acceptIntivation(user._id)">Accept</v-btn>
                  <v-btn class="red" @click="dismissIntivation(user._id)">Dismiss</v-btn>
                </div>
              </v-card-actions>
              </v-card>
            </v-slide-y-transition>
          </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="red" flat dark>
        <v-icon>search</v-icon>
        Find Your Friends
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import toastr from 'toastr'
  export default {
    data () {
      return {
        loading: true
      }
    },
    beforeCreate () {
      this.loading = true
    },
    mounted () {
      this.loading = true
      this.$store.dispatch('getIntivations')
      this.loading = false
    },
    methods: {
      acceptIntivation (userId) {
        this.loading = true
        this.$store.dispatch('acceptIntivation', userId)
        this.loading = false
      },
      dismissIntivation (userId) {
        for (var i = 0; i < this.intivations.length; i++) {
          if (this.intivations[i]._id === userId) {
            var usr = this.intivations[i]
            usr.dismissedIntivation = true
            this.intivations.splice(i, 1, usr)
            break
          }
        }
        toastr.info('Dismissed')
      }
    },
    computed: {
      authenticedUser () {
        return this.$store.getters.getAuthenticatedUser
      },
      intivations () {
        return this.$store.getters.getIntivations
      }
    }
  }
</script>
