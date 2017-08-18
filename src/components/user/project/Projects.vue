<template>
  <v-card style="border-left: 5px solid #455a64" height="100%">
    <v-card-title><h5><v-icon large>folder</v-icon> Projects</h5></v-card-title>
    <v-card-text>
      <v-layout wrap chid-flex v-if="!creatingNewProject">
        <v-flex xs12 md6 v-for="(project,i) in projects" :key="i" class="mb-2">
          <v-slide-y-transition appear mode="out-in">
            <v-card class="white black--text" height="100%" style="border-radius: 5px">
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <h5 light class="grey--text text--darken-3"><b>{{ project.title }}</b></h5>
                  </v-flex>
                  <v-flex xs12>
                    <small class="grey--text text--darken-3"><i>Created @{{project.created_at}}</i></small>
                  </v-flex>
                  <v-flex xs12>
                    {{ project.description }}
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="grey lighten-4 black--text" light flat :to="'project/'+project._id">Check</v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <app-create-project :visible="creatingNewProject" @onClosed="creatingNewProject = false"></app-create-project>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions v-if="!creatingNewProject">
      <v-spacer></v-spacer>
      <v-btn class="blue" flat dark @click="creatingNewProject=true">
        <v-icon>add</v-icon>
        Add Project
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import CreateProject from './CreateProject.vue'
  export default {
    components: {
      'app-create-project': CreateProject
    },
    data () {
      return {
        creatingNewProject: false
      }
    },
    mounted () {
      this.$store.dispatch('getProjects', this.$store.getters.getAuthenticatedUser._id)
    },
    computed: {
      projects () {
        return this.$store.getters.getProjects
      }
    }
  }
</script>
