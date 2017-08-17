<template>
  <div>
    <v-layout row wrap align-start>
      <v-flex xs12 md12 xl8>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-card>
              <v-card-title><h5><v-icon large>notifications</v-icon> Notifications</h5></v-card-title>
              <v-card-text>
                <v-alert class="white darken-4 grey--text text--darken-1" style="border-radius: 5px" icon="notifications" v-bind:value="true">
                  This is a success alert with a custom icon.
                </v-alert>
                <v-alert class="white darken-4 grey--text text--darken-1" style="border-radius: 5px" icon="notifications" v-bind:value="true">
                  This is a success alert with a custom icon.
                </v-alert>
                <v-alert class="white darken-4 grey--text text--darken-1" style="border-radius: 5px" icon="notifications" v-bind:value="true">
                  This is a success alert with a custom icon.
                </v-alert>
                <v-alert class="white darken-4 grey--text text--darken-1" style="border-radius: 5px" icon="notifications" v-bind:value="true">
                  This is a success alert with a custom icon.
                </v-alert>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-slide-y-transition mode="out-in">
              <app-intivations></app-intivations>
            </v-slide-y-transition>
          </v-flex>
        </v-layout>
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
