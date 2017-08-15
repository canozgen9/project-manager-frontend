<template>
  <div>
    <v-layout row wrap align-start>
      <v-flex xs12 mb-2>
        <app-activity></app-activity>
      </v-flex>
      <v-flex xs12 md6 mb-2>
        <app-projects></app-projects>
      </v-flex>
      <v-flex xs12 md6 mb-2>
        <app-teams></app-teams>
      </v-flex>
      <v-flex xs12 md6 mb-2>
        <app-friends></app-friends>
      </v-flex>
      <v-flex xs12 md6 mb-2>
        <app-users></app-users>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Teams from '../team/Teams.vue'
  import Projects from '../project/Projects.vue'
  import Friends from '../friend/Friends.vue'
  import Activity from './Activity.vue'
  import Users from '../friend/Users.vue'
  export default {
    components: {
      'app-teams': Teams,
      'app-projects': Projects,
      'app-friends': Friends,
      'app-activity': Activity,
      'app-users': Users
    }
  }
</script>
