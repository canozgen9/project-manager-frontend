import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import toastr from 'toastr'

export const store = new Vuex.Store({
  state: {
    // api: '23.251.128.252',
    api: 'localhost',
    authenticatedUser: null,
    socket: null,
    projects: [],
    teams: [],
    teamIntivations: [],
    users: [],
    friends: [],
    intivations: [],
    isConnected: false,
    authenticatedNavItems: [
      {heading: 'Menu'},
      { icon: 'home', text: 'Dashboard', link: '/dashboard' },
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
    ]
  },
  getters: {
    getProjects: (state) => {
      return state.projects
    },
    getTeams: (state) => {
      return state.teams
    },
    getTeamIntivations: (state) => {
      return state.teamIntivations
    },
    getAuthenticatedUser: (state) => {
      return state.authenticatedUser
    },
    getClient: (state) => {
      return state.authenticatedUser.client
    },
    getSocket: (state) => {
      return state.socket
    },
    getFriends: (state) => {
      return state.friends
    },
    getUsers: (state) => {
      return state.users
    },
    getIntivations: (state) => {
      return state.intivations
    }
  },
  mutations: {
    setAuthenticatedUser (state, user) {
      state.authenticatedUser = user
    },
    setClient (state, client) {
      state.authenticatedUser.client = client
    },
    getFriends (state) {
      axios.get('http://' + state.api + ':3000/api/user/friends?token=' + localStorage.getItem('token'), {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            state.friends = response.data.friends
          } else {
            toastr.error(response.data.message, 'Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    addFriend (state, candicateFriendId) {
      axios.post('http://' + state.api + ':3000/api/user/intivations/send?token=' + localStorage.getItem('token'), {friend_id: candicateFriendId}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            for (var i = 0; i < state.users.length; i++) {
              if (state.users[i]._id === candicateFriendId) {
                var usr = state.users[i]
                usr.sentIntivation = true
                state.users.splice(i, 1, usr)
                break
              }
            }
          } else {
            toastr.error(response.data.message, 'Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    getIntivations (state) {
      axios.get('http://' + state.api + ':3000/api/user/intivations/all?token=' + localStorage.getItem('token'), {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            state.intivations = response.data.intivations
          } else {
            toastr.error(response.data.message, 'Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    getTeamIntivations (state) {
      axios.get('http://' + state.api + ':3000/api/team/intivations?token=' + localStorage.getItem('token'), {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            state.teamIntivations = response.data.intivations
          } else {
            toastr.error(response.data.message, 'Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    acceptIntivation (state, candicateUserId) {
      axios.post('http://' + state.api + ':3000/api/user/intivations/accept?token=' + localStorage.getItem('token'), {candicateUserId: candicateUserId}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            for (var i = 0; i < state.intivations.length; i++) {
              if (state.intivations[i]._id === candicateUserId) {
                var usr = state.intivations[i]
                usr.aceeptedInvitation = true
                state.intivations.splice(i, 1, usr)
                break
              }
            }
          } else {
            toastr.error('Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    acceptTeamIntivation (state, teamId) {
      axios.post('http://' + state.api + ':3000/api/team/intivations/accept?token=' + localStorage.getItem('token'), {team_id: teamId}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            for (var i = 0; i < state.teamIntivations.length; i++) {
              if (state.teamIntivations[i]._id === teamId) {
                var team = state.teamIntivations[i]
                team.acceptedTeamInvitation = true
                state.teamIntivations.splice(i, 1, team)
                break
              }
            }
            var rooms = []
            rooms.push(response.data.project)
            state.socket.emit('joinRooms', rooms)
          } else {
            toastr.error('Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    sendIntivation (state, user) {
      console.log('add')
    },
    getUsers (state) {
      axios.get('http://' + state.api + ':3000/api/users?token=' + localStorage.getItem('token'), {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            state.users = response.data.users
          } else {
            toastr.error(response.data.message, 'Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    openSocket (state) {
      if (state.authenticatedUser) {
        state.socket.open()
      }
    },
    closeSocket (state) {
      if (state.socket.connected) {
        state.socket.close()
      }
    },
    checkSocket (state) {
      if (!state.socket.connected) {
        state.socket.open()
      } else {
        state.socket.close()
        state.socket.open()
      }
    },
    getClient (state) {
      console.log('GET CLIENT')
      console.log(state.authenticatedUser)
      if (state.authenticatedUser) {
        console.log(state.authenticatedUser)
        state.socket.emit('getClient', state.authenticatedUser)
      }
    },
    joinRooms (state, rooms) {
      if (state.authenticatedUser) {
        state.socket.emit('joinRooms', rooms)
      }
    },
    createNewProject (state, project) {
      axios.post('http://' + state.api + ':3000/api/project/new?token=' + localStorage.getItem('token'), {project: project}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            console.log('PROJECT CREATED')
            state.projects.push(response.data.project)
            var rooms = []
            rooms.push(response.data.project)
            state.socket.emit('joinRooms', rooms)
          } else {
            toastr.error('Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    createNewTeam (state, data) {
      axios.post('http://' + state.api + ':3000/api/team/new?token=' + localStorage.getItem('token'), data, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            console.log('TEAM CREATED')
          } else {
            toastr.error('Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    },
    getProjects (state, userId) {
      axios.post('http://' + state.api + ':3000/api/projects/all?token=' + localStorage.getItem('token'), {user_id: userId}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
        .then((response) => {
          if (response.data.success) {
            state.projects = response.data.projects
            state.authenticatedNavItems[2].children = []
            console.log(state.authenticatedNavItems)
            state.projects.forEach(function (project) {
              state.authenticatedNavItems[2].children.push({text: project.title, link: '/project/' + project._id})
            })
          } else {
            toastr.error('Error')
          }
        })
        .catch((error) => {
          toastr.error(error, 'Error')
        })
    }
  },
  actions: {
    setClient ({commit}, client) {
      commit('setClient', client)
    },
    getClient ({commit}) {
      commit('getClient')
    },
    joinRooms ({commit, state}, rooms) {
      if (rooms) {
        commit('joinRooms', rooms)
      } else {
        axios.post('http://' + state.api + ':3000/api/projects/all?token=' + localStorage.getItem('token'), {user_id: state.authenticatedUser._id}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
          .then((response) => {
            if (response.data.success) {
              state.projects = response.data.projects
              commit('joinRooms', response.data.projects)
            } else {
              toastr.error('Error')
            }
          })
          .catch((error) => {
            toastr.error(error, 'Error')
          })
      }
    },
    getProjectMessages ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://' + state.api + ':3000/api/project/team/messages?token=' + localStorage.getItem('token'), {room: data.room}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
          .then((response) => {
            if (response.data.success) {
              resolve(response.data.messages)
            } else {
              toastr.error(response.data.message, 'Error fetching messages!')
            }
          })
          .catch((error) => {
            toastr.error(error)
          })
      })
    },
    getProject ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://' + state.api + ':3000/api/project/get?token=' + localStorage.getItem('token'), data, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
          .then((response) => {
            if (response.data.success) {
              resolve(response.data.project)
            } else {
              toastr.error(response.data.message, 'Error fetching project!')
            }
          })
          .catch((error) => {
            toastr.error(error)
          })
      })
    },
    openSocket ({commit}) {
      commit('openSocket')
    },
    closeSocket ({commit}) {
      commit('closeSocket')
    },
    setAuthenticatedUser ({commit}, user) {
      commit('setAuthenticatedUser', user)
    },
    getFriends ({commit}) {
      commit('getFriends')
    },
    addFriend ({commit}, candicateFriendId) {
      commit('addFriend', candicateFriendId)
    },
    getIntivations ({commit}) {
      commit('getIntivations')
    },
    getTeamIntivations ({commit}) {
      commit('getTeamIntivations')
    },
    acceptIntivation ({commit}, user) {
      commit('acceptIntivation', user)
    },
    acceptTeamIntivation ({commit}, data) {
      commit('acceptTeamIntivation', data)
    },
    sendIntivation ({commit}, user) {
      console.log('add')
    },
    getUsers ({commit}) {
      commit('getUsers')
    },
    checkSocket ({commit}) {
      commit('checkSocket')
    },
    createNewProject ({commit}, project) {
      commit('createNewProject', project)
    },
    createNewTeam ({commit}, data) {
      commit('createNewTeam', data)
    },
    getProjects ({commit}, userId) {
      commit('getProjects', userId)
    }
  }
})
