import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // 4# 
  {
    path: '/screen4',
    name: 'screen4',
    component: () => import('../views/screen4.vue'),
  },
  {
    path: '/screen4-3',
    name: 'screen4-3',
    component: () => import('../views/screen4-3.vue'),
  },
  {
    path: '/entranceGate',
    name: 'entranceGate',
    component: () => import('../views/entranceGate.vue'),
  },
  {
    path: '/entranceGateDemotion',
    name: 'entranceGateDemotion',
    component: () => import('../views/entranceGateDemotion.vue'),
  },
  {
    path: '/exitGate',
    name: 'exitGate',
    component: () => import('../views/exitGate.vue'),
  },
  {
    path: '/exitGateDemotion',
    name: 'exitGateDemotion',
    component: () => import('../views/exitGateDemotion.vue'),
  },
  {
    path: '/noEntry',
    name: 'noEntry',
    component: () => import('../views/noEntry.vue'),
  },
  {
    path: '/noExit',
    name: 'noExit',
    component: () => import('../views/noExit.vue'),
  },
  {
    path: '/screenA',
    name: 'screenA',
    component: () => import('../views/screenA.vue'),
  },
  {
    path: '/screenADemotion',
    name: 'screenADemotion',
    component: () => import('../views/screenADemotion.vue'),
  },
  {
    path: '/screenB',
    name: 'screenB',
    component: () => import('../views/screenB.vue'),
  },
  {
    path: '/screenC',
    name: 'screenC',
    component: () => import('../views/screenC.vue'),
  },
 
  {
    path: '/screenE',
    name: 'screenE',
    component: () => import('../views/screenE.vue'),
  },
  {
    path: '/screenEDemotion',
    name: 'screenEDemotion',
    component: () => import('../views/screenEDemotion.vue'),
  },
  {
    path: '/screenF',
    name: 'screenF',
    component: () => import('../views/screenF.vue'),
  },
  {
    path: '/screenFDemotion',
    name: 'screenFDemotion',
    component: () => import('../views/screenFDemotion.vue'),
  },
  {
    path: '/generalMessage',
    name: 'generalMessage',
    component: () => import('../views/generalMessage.vue'),
  },
  {
    path: '/danger-1',
    name: 'danger-1',
    component: () => import('../views/danger-1.vue'),
  },
  {
    path: '/danger-2',
    name: 'danger-2',
    component: () => import('../views/danger-2.vue'),
  },
  {
    path: '/danger-3',
    name: 'danger-3',
    component: () => import('../views/danger-3.vue'),
  },
  {
    path: '/danger-4',
    name: 'danger-4',
    component: () => import('../views/danger-4.vue'),
  },
  {
    path: '/danger-6',
    name: 'danger-6',
    component: () => import('../views/danger-6.vue'),
  },
  {
    path: '/danger-5',
    name: 'danger-5',
    component: () => import('../views/danger-5.vue'),
  },
  {
    path: '/danger-7',
    name: 'danger-7',
    component: () => import('../views/danger-2.vue'),
  },
  {
    path: '/danger-8',
    name: 'danger-8',
    component: () => import('../views/danger-7.vue'),
  },
  {
    path: '/danger-9',
    name: 'danger-9',
    component: () => import('../views/danger-6.vue'),
  },
  {
    path: '/danger-10',
    name: 'danger-10',
    component: () => import('../views/danger-10.vue'),
  },
  {
    path: '/danger-11',
    name: 'danger-11',
    component: () => import('../views/danger-11.vue'),
  },
  {
    path: '/danger-12',
    name: 'danger-12',
    component: () => import('../views/danger-6.vue'),
  },
  {
    path: '/danger-13',
    name: 'danger-13',
    component: () => import('../views/danger-13.vue'),
  },
  {
    path: '/danger-14',
    name: 'danger-14',
    component: () => import('../views/danger-14.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
