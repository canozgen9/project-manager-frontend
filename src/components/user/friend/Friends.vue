<template>
  <v-card tile>
    <v-card-title><h5><v-icon large>supervisor_account</v-icon> Friends</h5></v-card-title>
    <v-card-text>
      <v-layout wrap>
          <v-flex xs12 md6 v-for="(friend,i) in friends" :key="i" class="mb-2">
              <v-slide-y-transition appear mode="out-in">
                <v-card class="grey lighten-4 grey--text text--darken-3" style="border-radius: 5px">
                  <v-list light>
                    <v-list-tile avatar tag="div" light>
                      <v-list-tile-avatar light>
                        <img :src="avatar(friend)" />
                      </v-list-tile-avatar>
                      <v-list-tile-content light>
                        <v-list-tile-title light class="grey--text text--darken-3"><b>{{ friend.name }}</b></v-list-tile-title>
                        <small class="grey--text text--darken-3"><i>@{{friend.username}}</i></small>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <!--<v-card-text><i>{{ friend.email }}</i></v-card-text>-->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="grey lighten-4" flat light :to="'/user/'+friend._id">Profile</v-btn>
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
      avatar: function (user) {
        if (user.avatar) {
          return user.avatar
        }
        return '/static/friend.png'
      }
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
