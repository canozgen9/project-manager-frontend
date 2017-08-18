<template>
  <v-card style="border-left: 5px solid #455a64" class="mb-2">
    <v-card-title><h5><v-icon large>supervisor_account</v-icon> Friend Intivations</h5></v-card-title>
    <v-card-text>
      <v-layout align-center justify-center v-if="loading">
        <v-progress-circular indeterminate v-bind:size="60" class="primary--text"></v-progress-circular>
      </v-layout>
      <v-layout wrap v-if="intivations.length > 0">
          <v-flex xs12 md6 v-for="(user,i) in intivations" :key="i" class="mb-2" v-if="!user.dismissedIntivation">
            <v-slide-y-transition appear mode="out-in">
              <v-card class="white black--text" style="border-radius: 5px">
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
      <div v-else>
        You have no intivation.
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-title><h5><v-icon large>group_work</v-icon> Team Intivations</h5></v-card-title>
    <v-card-text>
      <v-layout align-center justify-center v-if="loading">
        <v-progress-circular indeterminate v-bind:size="60" class="primary--text"></v-progress-circular>
      </v-layout>
      <v-layout wrap v-if="teamIntivations.length > 0">
        <v-flex xs12 md6 v-for="(team,i) in teamIntivations" :key="i" class="mb-2" v-if="!team.dismissedTeamIntivation">
          <v-slide-y-transition appear mode="out-in">
            <v-card class="white black--text" style="border-radius: 5px">
              <v-card-media class="grey lighten-2">
                <v-container>
                  <v-layout row>
                    <h5 class="black--text"><b><v-icon large light>code</v-icon> {{ team.name }}</b></h5>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div v-if="team.acceptedTeamInvitation">
                  <v-btn class="blue black--text" light disabled>Accepted</v-btn>
                </div>
                <div v-else>
                  <v-btn class="blue" @click="acceptTeamIntivation(team._id)">Accept</v-btn>
                  <v-btn class="red" @click="dismissTeamIntivation(team._id)">Dismiss</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
      <div v-else>
        You have no intivation.
      </div>
    </v-card-text>

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
      this.$store.dispatch('getTeamIntivations')
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
      },
      acceptTeamIntivation (teamId) {
        this.loading = true
        this.$store.dispatch('acceptTeamIntivation', teamId)
        this.loading = false
      }
    },
    computed: {
      authenticedUser () {
        return this.$store.getters.getAuthenticatedUser
      },
      intivations () {
        return this.$store.getters.getIntivations
      },
      teamIntivations () {
        return this.$store.getters.getTeamIntivations
      }
    }
  }
</script>
