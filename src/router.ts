import Vue from 'vue'
import Router from 'vue-router'

import Home from './pages/Home.vue'
import Agenda from './pages/Agenda.vue'
import Map from './pages/Map.vue'
import Venue from './pages/Venue.vue'
import Sponsor from '@/pages/Sponsor.vue'
import Staff from '@/pages/Staff.vue'

import { LanguageType } from '@/../languages'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      index: 0
    }
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
    meta: {
      index: 1
    }
  },
  {
    path: '/agenda/:sid',
    name: 'AgendaView',
    component: Agenda
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
    meta: {
      index: 2
    }
  },
  {
    path: '/venue',
    name: 'Venue',
    component: Venue,
    meta: {
      index: 3
    }
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: Sponsor,
    meta: {
      index: 4
    }
  },
  {
    path: '/staff',
    name: 'Staff',
    component: Staff,
    meta: {
      index: 5
    }
  }
]

const expandedRoutes = [
  ...routes.map((route) => {
    return {
      path: route.path,
      redirect: `/${LanguageType.default}${route.path}`
    }
  }),
  ...routes.map((route) => {
    route = { ...route }
    route.path = `/:language${route.path}`
    return route
  })
]

const router = new Router({
  mode: 'history',
  base: '/2020/',
  routes: expandedRoutes,
  scrollBehavior (to, from) {
    if (to.hash) {
      const target = document.querySelector(to.hash) as HTMLElement

      return window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      })
    } else if (!(to.name === 'Agenda' && from.name === 'AgendaView') && !(to.name === 'AgendaView' && from.name === 'Agenda')) {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
