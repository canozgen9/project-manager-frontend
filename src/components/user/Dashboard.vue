<template>
  <div>
    <v-layout row wrap align-start>
    <v-flex xs12 md12 xl8>
      <span><h4><b><v-icon x-large>home</v-icon> Dashboard | </b><i><small>@{{ this.$store.getters.getAuthenticatedUser.username }}</small></i></h4></span>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-flex>
    </v-layout>
  </div>
</template>
