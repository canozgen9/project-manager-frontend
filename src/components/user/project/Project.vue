<template>
  <div>
    <v-layout row wrap align-start>
      <v-flex xs12 md12 xl8>
        <v-card class="mb-2">
          <blockquote>
            <span><h4><b><v-icon x-large>code</v-icon> Project | </b><i><small>{{ project.room }}</small></i></h4></span>
          </blockquote>
        </v-card>
      </v-flex>
    </v-layout>
      <v-layout row wrap align-start>
      <v-flex xs12 md6 xl4>
        <v-card class="mb-2">
          <v-card-title>Project Proporties</v-card-title>
          <v-card-text>Project... </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 xl4>
        <app-chat :room="project.room"></app-chat>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Chat from '../../chat/Chat.vue'
  export default {
    components: {
      'app-chat': Chat
    },
    computed: {
      project () {
        return {room: 'project' + this.$route.params.id}
      }
    },
    mounted () {
    }
  }
</script>
