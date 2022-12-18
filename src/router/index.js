import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import VisualizationView from '../views/VisualizationView.vue'
import QueueView from '../views/QueueView.vue'
import PopularView from '../views/PopularView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/visualization/:owner/:repo',
      name: 'visualization',
      component: VisualizationView
    },
    {
      path: '/queue',
      name: 'queue',
      component: QueueView
    },
    {
      path: '/popular',
      name: 'popular',
      component: PopularView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
