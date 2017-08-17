<template>
  <v-card tile>
    <v-card-title><h5><v-icon large>supervisor_account</v-icon> Friends</h5></v-card-title>
    <v-card-text>
      <v-layout wrap>
          <v-flex xs12 md6 v-for="(friend,i) in friends" :key="i" class="mb-2">
              <v-slide-y-transition appear mode="out-in">
              <v-card class="blue darken-3 white--text" style="border-radius: 5px">
                <v-card-media src="/static/friend.png">
                  <v-container style="background-color: rgba(0,0,0,0.5); border-radius: 5px">
                    <v-layout row>
                      <h5 class="white--text"><b><v-icon large>person</v-icon> {{ friend.username }}</b></h5>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-text><i>{{ friend.email }}</i></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="blue" :to="'/user/'+friend._id">See Profile</v-btn>
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
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.$store.dispatch('getFriends')
    },
    methods: {

    },
    computed: {
      authenticedUser () {
        return this.$store.getters.getAuthenticatedUser
      },
      friends () {
        return this.$store.getters.getFriends
      }
    }
  }
</script>
