import { createRouter, createWebHashHistory } from 'vue-router';
import { routeBeforeEach, routeAfterEach } from './routerInterceptor'

const routes = [
  {
    path: '/',
    name: 'order',
    component: () => import('../views/workOrderView/Index.vue'),
    meta: { keep: true }
  },
  {
    path: '/showChart',
    name: 'showChart',
    component: () => import('../views/workOrderView/Index.vue'),
  }
];

const route = createRouter({ history: createWebHashHistory(), routes })

route.beforeEach(routeBeforeEach)
route.afterEach(routeAfterEach)

export default route
