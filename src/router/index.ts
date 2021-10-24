import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

const About = { template: '<div>About</div>' };

export const routes = [
  {
    path: '/',
    text: 'Go to home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    text: 'Go to About',
    name: 'About',
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
