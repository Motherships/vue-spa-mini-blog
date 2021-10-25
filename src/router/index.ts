import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/BlogPage.vue';
import AddArticlePage from '@/views/AddArticlePage.vue';
import ArticlePage from '@/views/ArticlePage.vue';

export const leftRoutes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
  },
];

export const rightRoutes = [
  {
    path: '/blog/new',
    name: 'Add Article',
    component: AddArticlePage,
  },
];

export const staticRoutes = [...leftRoutes, ...rightRoutes];
export const dynamicRoutes = [
  { path: '/blog/:id', name: 'SingleArticle', component: ArticlePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...dynamicRoutes],
});

export default router;
