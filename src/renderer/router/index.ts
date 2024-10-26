import { createRouter, createWebHashHistory } from 'vue-router';
import { routeBeforeEach, routeAfterEach } from './routerInterceptor'

const routes = [
  {
    path: '/',
    name: 'order',
    component: () => import('../views/WorkOrderView/Index.vue'),
    meta: { keep: true }
  },
  {
    path: '/shot',
    name: 'shot',
    component: () => import('../views/ScreenShot/Index.vue'),
  }
];

const route = createRouter({ history: createWebHashHistory(), routes })

route.beforeEach(routeBeforeEach)
route.afterEach(routeAfterEach)

export default route
