<template>
    <v-card v-if="visible" height="100%" light style="border-radius: 5px">
      <v-card-title>
        New Team
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field v-model="name" name="input-1" label="Team Name" type="text" light></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select light label="Team Mates" v-bind:items="this.$store.getters.getFriends" v-model="selectedFriends" item-text="name" item-value="_id" multiple chips max-height="auto" autocomplete>
              <template light slot="selection" scope="data">
                <v-chip light close @input="data.parent.selectItem(data.item)" @click.native.stop class="chip--select-multi" :key="data.item._id">
                  <v-avatar>
                    <img :src="data.item.avatar">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template light slot="item" scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template light v-else>
                  <v-list-tile-avatar light>
                    <img v-bind:src="data.item.avatar"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content light>
                    <v-list-tile-title light v-html="data.item.name"></v-list-tile-title>
                    <v-list-tile-sub-title light v-html="data.item.group"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat light @click="cancel">Cancel</v-btn>
        <v-btn flat light @click="submit">Create Team</v-btn>
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
        name: '',
        selectedFriends: []
      }
    },
    computed: {
      validForm () {
        return this.name.length > 0
      }
    },
    methods: {
      cancel () {
        this.$emit('onClosed')
      },
      submit () {
        if (this.validForm) {
          this.$store.dispatch('createNewTeam', {team: {name: this.name, sentIntivation: this.selectedFriends, project: this.$route.params.id}})
          this.$emit('onClosed')
        }
      }
    }
  }
</script>
