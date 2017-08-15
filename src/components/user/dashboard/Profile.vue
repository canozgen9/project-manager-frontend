<template>
  <div>
    <v-layout row wrap align-start>
      <v-flex xs12 md12 xl8>
        <v-card class="mb-2">
          <blockquote>
            <span><h4><v-icon x-large>account_box</v-icon><b> Profile | </b><i><small>{{ this.$store.getters.getAuthenticatedUser.username }}</small></i></h4></span>
          </blockquote>
        </v-card>
      </v-flex>
      <v-flex xs12 md12 xl8>
        <v-card>
          <v-card-text>
            <v-chip class="grey white--text">Username: {{ this.$store.getters.getAuthenticatedUser.username }}</v-chip>
            <v-chip class="red white--text">Email: {{ this.$store.getters.getAuthenticatedUser.email }}</v-chip>
            <v-chip class="green white--text">Created At: {{ this.$store.getters.getAuthenticatedUser.created_at }}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
