<template>
  <v-card tile>
    <v-card-title><h5><v-icon large>call_made</v-icon> Other Users</h5></v-card-title>
    <v-card-text>
      <v-layout wrap chid-flex>
          <v-flex xs12 md6 v-for="(user,i) in users" :key="i" class="mb-2">
            <v-slide-y-transition appear mode="out-in">
            <v-card class="white black--text" height="100%" style="border-radius: 5px">
              <v-list>
                <v-list-tile avatar tag="div">
                  <v-list-tile-avatar>
                    <img :src="avatar(user)" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title class="grey--text text--darken-3"><b>{{ user.name }}</b></v-list-tile-title>
                    <small class="grey--text text--darken-3"><i>@{{user.username}}</i></small>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <!--<v-card-text><i>{{ user.email }}</i></v-card-text>-->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="sentIntivation(user)" disabled class="grey lighten-2 black--text" light>Sent Intivation</v-btn>
                <v-btn v-else-if="gotIntivation(user)" disabled class="grey lighten-2 black--text" light>You got Intivation</v-btn>
                <v-btn v-else class="grey lighten-4" flat light @click="addFriend(user._id)">Add Friend</v-btn>
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
      this.$store.dispatch('getUsers')
    },
    methods: {
      addFriend (friendId) {
        this.$store.dispatch('addFriend', friendId)
      },
      sentIntivation (user) {
        return user.intivations.includes(this.$store.getters.getAuthenticatedUser._id)
      },
      gotIntivation (user) {
        for (var i = 0; i < this.$store.state.intivations.length; i++) {
          if (this.$store.state.intivations[i]._id === user._id) {
            return true
          }
        }
        return false
      },
      avatar: function (user) {
        if (user.avatar) {
          return user.avatar
        }
        return '/static/friend.png'
      }
    },
    computed: {
      authenticatedUser () {
        return this.$store.getters.getAuthenticatedUser
      },
      users () {
        return this.$store.getters.getUsers
      }
    }
  }
</script>
