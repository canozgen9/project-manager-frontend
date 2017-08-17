import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import toastr from 'toastr'

export const store = new Vuex.Store({
  state: {
    api: '23.251.128.252',
    // api: 'localhost',
    authenticatedUser: null,
    socket: null,
    projectRooms: [
      'project1',
      'project2',
      'project3',
      'project4',
      'project5'
    ],
    users: [],
    friends: [],
    intivations: [],
    isConnected: false
  },
  getters: {
    projectRooms: (state) => {
      return state.projectRooms
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
      if (state.authenticatedUser) {
        state.socket.emit('getClient', state.authenticatedUser)
      }
    },
    joinRooms (state) {
      if (state.authenticatedUser) {
        state.socket.emit('joinRooms', state.projectRooms)
      }
    }
  },
  actions: {
    setClient ({commit}, client) {
      commit('setClient', client)
    },
    getClient ({commit}) {
      commit('getClient')
    },
    joinRooms ({commit}) {
      commit('joinRooms')
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
    acceptIntivation ({commit}, user) {
      commit('acceptIntivation', user)
    },
    sendIntivation ({commit}, user) {
      console.log('add')
    },
    getUsers ({commit}) {
      commit('getUsers')
    },
    checkSocket ({commit}) {
      commit('checkSocket')
    }
  }
})
