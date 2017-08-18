<template>
    <v-slide-y-transition mode="out-in">
  <div>
      <v-layout row wrap align-start>
        <span><h4><b><v-icon x-large>code</v-icon> {{ project.title }} | </b><i><small>{{ project.created_at }}</small></i></h4></span>
      </v-layout>
      <v-layout row wrap align-start>
        <v-flex xs12 md6 xl4>
          <v-layout row wrap>
            <v-flex xs12 class="mb-2">
              <v-card style="border-left: 5px solid #455a64" fill-height>
                <v-card-title><h5><v-icon large>info_outline</v-icon> Details</h5></v-card-title>
                <v-card-text>
                  {{ project.description }}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <app-teams :teams="project.teams"></app-teams>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md6 xl4>
          <app-chat :room="project._id"></app-chat>
        </v-flex>
      </v-layout>
  </div>
    </v-slide-y-transition>
</template>

<script>
  import Chat from '../../chat/Chat.vue'
  import Teams from './Teams.vue'
  export default {
    components: {
      'app-chat': Chat,
      'app-teams': Teams
    },
    data () {
      return {
        project: {

        }
      }
    },
    watch: {
      '$route.params.id' () {
        this.$store.dispatch('getProject', {project_id: this.$route.params.id}).then((project) => {
          this.project = project
        })
      }
    },
    mounted () {
      this.$store.dispatch('getProject', {project_id: this.$route.params.id}).then((project) => {
        this.project = project
      })
    },
    computed: {

    }
  }
</script>
