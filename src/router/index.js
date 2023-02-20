import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'


const requireAuth = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    // User is logged in, allow access to the requested route
    next();
  } else {
    // User is not logged in, redirect to login page
    next('/login');
  }
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainView.vue'), 
    meta: {requireAuth:true, requiresSuperuser: true}
  },
  {
    path: '/main2',
    name: 'main2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Main2View.vue'),
    beforeEnter: requireAuth,
    meta: {requireAuth:true, requiresUser: true}
  },
  {
    path: '/log',
    name: 'log',
    component: () => import(/* webpackChunkName: "about" */ '../views/LogView.vue'),
    beforeEnter: requireAuth 
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/admin-panel',
    name: 'admin-panel',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }

  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user');
  const isAdmin = isAuthenticated && JSON.parse(isAuthenticated).role === 'admin';
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next('/');
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user');
  const isSuperuser = isAuthenticated && JSON.parse(isAuthenticated).role === 'superuser';
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresSuperuser && !isSuperuser) {
    next('/');
  } else {
    next();
  }
});



export default router
