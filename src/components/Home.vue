<template>
  <div>
    <v-layout wrap align-start>
      <v-flex xs12 md8 xl6 mb-2 class="hidden-xs-only">
        <v-layout row wrap>
          <v-flex xs12 class="mb-2">
            <v-card>
            <v-stepper v-model="e1" class="grey darken-3">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="e1 > 1">Create your account</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="e1 > 2">Make new projects</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="e1 > 3">Include your team</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">Develop your ideas</v-stepper-step>
              </v-stepper-header>
              <v-stepper-content step="1">
                <v-card class="mb-3">
                  <v-card-media src="/static/slides/1.jpg" height="350px">
                    <v-container>
                    <v-layout column align-start>
                        <h1 class="white--text">Account</h1>
                        <h4 class="white--text">Create your account to manage your projects</h4>
                    </v-layout>
                    </v-container>
                  </v-card-media>
                </v-card>
                <v-btn primary @click.native="e1 = 2">Continue</v-btn>
                <v-btn flat dark>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card class="mb-3">
                  <v-card-media src="/static/slides/2.jpg" height="350px">
                    <v-container>
                      <v-layout column align-start>
                        <h1 class="white--text">Projects</h1>
                        <h4 class="white--text">Make your dreams come true</h4>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                </v-card>
                <v-btn primary @click.native="e1 = 3">Continue</v-btn>
                <v-btn flat dark>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card class="mb-3">
                  <v-card-media src="/static/slides/3.jpg" height="350px">
                    <v-container>
                      <v-layout column align-start>
                        <h1 class="white--text">Team</h1>
                        <h4 class="white--text">Meet your friends</h4>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                </v-card>
                <v-btn primary @click.native="e1 = 4">Continue</v-btn>
                <v-btn flat dark>Cancel</v-btn>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-card class="mb-3">
                  <v-card-media src="/static/slides/5.jpg" height="350px">
                    <v-container>
                      <v-layout column align-start>
                        <h1 class="black--text">Done</h1>
                        <h4 class="black--text">You are ready to development!</h4>
                      </v-layout>
                    </v-container>
                  </v-card-media>
                </v-card>
                <v-btn primary @click.native="e1 = 1">Done</v-btn>
                <v-btn flat dark>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <blockquote>
                <v-card-title>
                  Project Manager
                </v-card-title>
                <v-card-text>
                  <p>
                    Selam nmaner asdk asd asjnd asj dnasj ndjka sndjksa ndkja ndjs and naskj dnask dnjsa
                  </p>
                </v-card-text>
              </blockquote>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md4 xl3 mb-2>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-flex>
      <v-flex xs12 md8 xl6 offset-md-2>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        e1: 0,
        slides: [
          {
            src: '/static/slides/3.jpg',
            title: '3'
          },
          {
            src: '/static/slides/3.png',
            title: '3png'
          },
          {
            src: '/static/slides/5.jpg',
            title: '5'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
