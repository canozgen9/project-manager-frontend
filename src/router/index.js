import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import {store} from '../store'
import axios from 'axios'
import Signin from '@/components/user/auth/Signin'
import Signup from '@/components/user/auth/Signup'
import Dashboard from '@/components/user/Dashboard'
import Profile from '@/components/user/dashboard/Profile'
import DashboardMain from '@/components/user/dashboard/Main'
import Notifications from '@/components/user/Notifications'
import Project from '@/components/user/project/Project'
import User from '@/components/user/friend/User'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/signin',
      children: [
        { path: '/signup', name: 'signup', component: Signup },
        { path: '/signin', name: 'signin', component: Signin }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        { path: '/dashboard', name: 'dashboardmain', component: DashboardMain }
      ]
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('setAuthenticatedUser', null)
        localStorage.removeItem('token')
        store.dispatch('closeSocket')
        next('/')
      }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    },
    { path: '/profile', name: 'profile', component: Profile },
    { path: '/notifications', name: 'notifications', component: Notifications }
  ]
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    axios
      .post('http://' + store.state.api + ':3000/check?token=' + localStorage.getItem('token'), {}, {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
      .then((res) => {
        if (res.data.success) {
          store.dispatch('setAuthenticatedUser', res.data.user)
          if (to.name === 'signin' || to.name === 'signup') {
            next('/dashboard')
          } else {
            next()
          }
        } else {
          store.dispatch('setAuthenticatedUser', null)
          localStorage.removeItem('token')
          store.dispatch('closeSocket')
          next('/')
        }
      })
      .catch((err) => {
        console.log(err)
        store.dispatch('setAuthenticatedUser', null)
        localStorage.removeItem('token')
        store.dispatch('closeSocket')
        next('/')
      })
  } else {
    store.dispatch('setAuthenticatedUser', null)
    store.dispatch('closeSocket')
    next()
  }
})

export default router
