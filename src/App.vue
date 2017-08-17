<template>
  <v-app dark>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" enable-resize-watcher>
      <v-list v-if="this.$store.getters.getAuthenticatedUser">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="avatar" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-divider></v-divider>
        <template v-for="(item, i) in navItems">
          <v-layout row v-if="item.heading" :to="item.link" align-center :key="i">
            <v-flex xs12>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" :to="child.link">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-divider dark v-else-if="item.divider" class="my-4" :key="i"></v-divider>
          <v-list-tile v-else :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <div v-if="drawer">
        <v-btn icon @click.native.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn icon @click.native.stop="clipped = !clipped">
          <v-icon>web</v-icon>
        </v-btn>
      </div>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="authenticatedUser" class="hidden-xs-only">
        <v-btn disabled v-if="isConnected" flat class="green--text">Online</v-btn>
        <v-btn disabled v-else flat>Offline</v-btn>
        <v-btn v-if="!isConnected" @click="reconnect">Reconnect</v-btn>
        <div v-else></div>
        <v-btn flat router to="/notifications">
          <span v-if="notificationsLength > 0" style="position: absolute; bottom: 12px; left: 30px; padding-right:5px; padding-left:5px; background-color: red; border-radius: 5px" class="primary--text">{{ notificationsLength }}</span>
          <v-icon dark left>notifications</v-icon>
          <span>Notifications</span>
        </v-btn>
        <v-btn flat v-for="(item,i) in toolbarItems" :key="i" :to="item.link">
          <v-icon dark left>{{item.icon}}</v-icon>
          {{item.text}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container wrap>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>
    <v-footer>
      <v-spacer></v-spacer>
      <span>&copy; 2017 - Project Manager - All Rights Reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
  import toastr from 'toastr'

  toastr.options = {
    timeOut: 5000,
    extendedTimeOut: 100,
    tapToDismiss: true,
    debug: false,
    fadeOut: 2,
    fadeIn: 2,
    positionClass: 'toast-top-right'
  }

  export default {
    data () {
      return {
        testMsg: '',
        notificationsLength: 0,
        clipped: true,
        drawer: true,
        fixed: false,
        authenticatedNavItems: [
          { heading: 'General' },
          { icon: 'home', text: 'Dashboard', link: '/dashboard' },
          { divider: true },
          { heading: 'Project Management' },
          {
            icon: 'settings_ethernet',
            'icon-alt': 'code',
            text: 'Projects',
            model: false,
            children: [
              { text: 'Project 1', link: '/project/1' },
              { text: 'Project 2', link: '/project/2' },
              { text: 'Project 3', link: '/project/3' },
              { text: 'Project 4', link: '/project/4' },
              { text: 'Project 5', link: '/project/5' }
            ]
          },
          { icon: 'group_work', text: 'Teams', link: '/teams' },
          { icon: 'settings', text: 'Settings', link: '/settings' },
          { divider: true },
          { icon: 'account_box', text: 'Profile', link: '/profile' },
          { icon: 'group', text: 'Friends', link: '/firends' },
          { icon: 'power_settings_new', text: 'Logout', link: '/logout' }
        ],
        authenticatedToolbarItems: [
          { icon: 'help_outline', text: 'Help', link: '/help' },
          { icon: 'power_settings_new', text: 'Logout', link: '/logout' }
        ],
        guestNavItems: [
          { icon: 'lock_open', text: 'Sign in', link: '/signin' },
          { icon: 'person_add', text: 'Sign up', link: '/signup' },
          { divider: true },
          { icon: 'feedback', text: 'About', link: '/about' },
          { icon: 'perm_phone_msg', text: 'Communication', link: '/communication' }
        ],
        guestToolbarItems: [

        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Project Manager'
      }
    },
    sockets: {
      connect () {
        this.$store.state.isConnected = true
        toastr.success('CONNECTED')
      },
      disconnect () {
        this.$store.state.isConnected = false
        toastr.warning('DISCONNECTED')
      },
      setClient (client) {
        this.$store.dispatch('setClient', client)
      },
      joinedRoom (room) {
        toastr.success('Joined room: ' + room)
      },
      leftRoom (room) {
        toastr.warning('Left room: ' + room)
      },
      updateAuthenticatedUser (data) {
        this.$store.dispatch('getUsers')
        this.$store.dispatch('getFriends')
        this.$store.dispatch('getIntivations')

        if (data.type === 0) {
          // success
          toastr.success(data.message)
          this.notificationsLength++
        } else if (data.type === 1) {
          // info
          toastr.info(data.message)
        } else if (data.type === 2) {
          // warning
          toastr.warning(data.message)
        } else if (data.type === 3) {
          // error
          toastr.error(data.message)
        }
      }
    },
    methods: {
      reconnect () {
        this.$store.dispatch('openSocket')
        this.$store.dispatch('getClient')
        this.$store.dispatch('joinRooms')
      },
      toggleDrawer () {
        this.drawer = !this.drawer
        console.log(this.drawer)
      }
    },
    computed: {
      name () {
        return this.$store.getters.getAuthenticatedUser.name
      },
      avatar () {
        if (this.$store.getters.getAuthenticatedUser.avatar) {
          return this.$store.getters.getAuthenticatedUser.avatar
        }
        return '/static/friend.png'
      },
      socket () {
        return this.$store.getters.getSocket
      },
      isConnected () {
        return this.$store.state.isConnected
      },
      navItems () {
        if (this.authenticatedUser) {
          return this.authenticatedNavItems
        } else {
          return this.guestNavItems
        }
      },
      toolbarItems () {
        if (this.authenticatedUser) {
          return this.authenticatedToolbarItems
        } else {
          return this.guestToolbarItems
        }
      },
      authenticatedUser () {
        if (this.$store.getters.getAuthenticatedUser) {
          if (this.authenticatedNavItems.length === 11) {
            this.authenticatedNavItems.splice(8, 0, { heading: this.$store.getters.getAuthenticatedUser.username })
          }
          return this.$store.getters.getAuthenticatedUser
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="stylus">
  .toast-top-right {
    top: 75px;
  }

  @import './stylus/main'
  #navigation-1 a {
    text-decoration: none;
  }
</style>
