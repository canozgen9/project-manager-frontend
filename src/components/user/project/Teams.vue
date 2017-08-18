<template>
  <v-card style="border-left: 5px solid #455a64" fill-height>
    <v-card-title><h5><v-icon large>folder</v-icon> Teams</h5></v-card-title>
    <v-card-text>
      <v-layout wrap chid-flex v-if="!creatingNewTeam">
        <v-flex xs12 md6 v-for="(team,i) in teams" :key="i" class="mb-2">
          <v-slide-y-transition appear mode="out-in">
            <v-card class="white black--text" height="100%" style="border-radius: 5px">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <h5 light class="grey--text text--darken-3"><b>{{ team.name }}</b></h5>
                  </v-flex>
                  <v-flex xs12>
                    <small class="grey--text text--darken-3"><i>Created @{{team.created_at}}</i></small>
                  </v-flex>
                  <v-flex xs12>
                    {{ team.description }}
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="grey lighten-4 black--text" light flat :to="'team/'+team._id">Check</v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <app-create-team :visible="creatingNewTeam" @onClosed="creatingNewTeam = false"></app-create-team>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions v-if="!creatingNewTeam">
      <v-spacer></v-spacer>
      <v-btn class="blue" flat dark @click="creatingNewTeam=true">
        <v-icon>add</v-icon>
        Create Team
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import CreateTeam from '../team/CreateTeam.vue'
  export default {
    props: [
      'teams'
    ],
    components: {
      'app-create-team': CreateTeam
    },
    data () {
      return {
        creatingNewTeam: false
      }
    }
  }
</script>
