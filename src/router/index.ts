import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Blog from '@/views/Blog.vue';
import AddArticle from '@/views/AddArticle.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/blog/new',
    name: 'Add Article',
    component: AddArticle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
