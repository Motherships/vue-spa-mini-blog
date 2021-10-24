import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import Blog from '@/views/Blog.vue';
import AddArticle from '@/views/AddArticle.vue';
import SingleArticle from '@/views/SingleArticle.vue';

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
  { path: '/blog/:id', component: SingleArticle },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
