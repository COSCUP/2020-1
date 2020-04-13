import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home.vue';
import Agenda from './pages/Agenda.vue';
import Activity from './pages/Activity.vue';
import Traffic from './pages/Traffic.vue';
import Venue from './pages/Venue.vue';
import Sponsor from '@/pages/Sponsor.vue';
import Staff from '@/pages/Staff.vue';

import { Route } from 'vue-router';

import { LanguageType } from '@/../languages';


Vue.use(Router);

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      index: 0,
      label: 'home',
      menuItem: true
    }
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
    meta: {
      index: 1,
      label: 'agenda',
      menuItem: true
    }
  },
  {
    path: '/agenda/:sid',
    name: 'AgendaView',
    component: Agenda,
    meta: {
      menuItem: false
    }
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity,
    meta: {
      index: 2,
      label: 'activity',
      menuItem: false
    }
  },
  {
    path: '/activity/:aid',
    name: 'ActivityView',
    component: Activity,
    meta: {
      menuItem: false
    }
  },
  {
    path: '/venue',
    name: 'Venue',
    component: Venue,
    meta: {
      index: 3,
      label: 'venue',
      menuItem: true
    }
  },
  {
    path: '/traffic',
    name: 'Traffic',
    component: Traffic,
    meta: {
      index: 4,
      label: 'traffic',
      menuItem: true
    }
  },
  {
    path: '/staff',
    name: 'Staff',
    component: Staff,
    meta: {
      index: 5,
      label: 'staff',
      menuItem: true
    }
  },
  {
    path: '/sponsor',
    name: 'Sponsor',
    component: Sponsor,
    meta: {
      index: 6,
      label: 'sponsor',
      menuItem: true
    }
  }
];

const expandedRoutes = [
  ...routes.map((route) => {
    return {
      path: route.path,
      redirect: `/${LanguageType.default}${route.path}`
    };
  }),
  ...routes.map((route) => {
    route = { ...route };
    route.path = `/:language${route.path}`;
    return route;
  })
];

const router = new Router({
  mode: 'history',
  base: '/2020/',
  routes: expandedRoutes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      const target = document.querySelector(to.hash) as HTMLElement;

      return window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    } else if (!(to.name === 'Agenda' && from.name === 'AgendaView') && !(to.name === 'AgendaView' && from.name === 'Agenda')) {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to: Route, from: Route, next: (...args: any[]) => any) => {
  if (from.path.startsWith('/activity') && to.path === '/activity') {
    next(false);
  } else {
    next();
  }
});

export default router;
