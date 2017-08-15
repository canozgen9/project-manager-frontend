<template>
  <div>
    <v-layout row wrap align-start>
      <v-flex xs12 md12 xl8>
        <v-card class="mb-2">
          <blockquote>
            <span><h4><b><v-icon x-large>notifications</v-icon> Notifications | </b><i><small>{{ this.$store.getters.getAuthenticatedUser.username }}</small></i></h4></span>
          </blockquote>
        </v-card>
        <v-slide-y-transition mode="out-in">
          <app-intivations></app-intivations>
        </v-slide-y-transition>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import Intivations from './friend/Intivations.vue'
  export default {
    components: {
      'app-intivations': Intivations
    }
  }
</script>
