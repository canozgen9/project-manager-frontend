<template>
      <v-card v-if="visible" height="100%" light style="border-radius: 5px">
        <v-card-title>
          New Project
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field v-model="title" name="input-1" label="Project Title" type="text" light></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="gitRepo" name="input-1" label="Git Repository (Optional)" type="text" light></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field ref="messageInput" name="input-1" label="Project Description" v-model="description" textarea light></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat light @click="cancel">Cancel</v-btn>
          <v-btn flat light @click="submit">Create Project</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
  export default{
    props: [
      'visible'
    ],
    data () {
      return {
        title: '',
        gitRepo: '',
        description: ''
      }
    },
    computed: {
      validForm () {
        return this.title.length > 0 && this.description.length > 0
      }
    },
    methods: {
      cancel () {
        this.$emit('onClosed')
      },
      submit () {
        if (this.validForm) {
          this.$store.dispatch('createNewProject', {title: this.title, git_repository: this.gitRepo, description: this.description})
          this.$emit('onClosed')
        }
      }
    }
  }
</script>
