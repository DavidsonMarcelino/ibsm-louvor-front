import Vue from 'vue'
import VueRouter from 'vue-router'

import Banda from './bandas'
import Paritura from './partituras'
import Musica from './musicas'
import Instrumento from './instrumentos'
import User from './user'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    Banda,
    Paritura,
    Musica,
    Instrumento,
    User,
  
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const terms = localStorage.getItem('accept_terms');
  const authenticated = localStorage.getItem('token');
  let to_splited = to.path.toString().split('/')
  to_splited = to_splited.filter(part => part !== '')

  if (
    !authenticated &&
    (
      !(['/login'].includes(to.path.toString())) &&
      !(['public'].includes(to_splited[0]))
    )
  ) {
    next('/login');

    return true;
  }

  next();
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
