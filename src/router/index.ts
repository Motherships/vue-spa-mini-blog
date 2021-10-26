import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/BlogPage.vue';
import AddArticlePage from '@/views/AddArticlePage.vue';
import ArticlePage from '@/views/ArticlePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import EditArticlePage from '@/views/EditArticlePage.vue';

export const leftRoutes = [
  {
    path: '/',
    label: 'Home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/blog',
    label: 'Blog',
    name: 'blog',
    component: BlogPage,
  },
];

export const rightRoutes = [
  {
    path: '/blog/new',
    label: 'Add Article',
    name: 'addArticle',
    component: AddArticlePage,
  },
];

export const staticRoutes = [...leftRoutes, ...rightRoutes];
export const dynamicRoutes = [
  {
    path: '/blog/:id',
    label: 'Single Article',
    name: 'singleArticle',
    component: ArticlePage,
  },

  {
    path: '/blog/:id/edit',
    label: 'Edit Article',
    name: 'editArticle',
    component: EditArticlePage,
  },

  {
    path: '/not-found-404',
    label: 'Not Found Page',
    name: 'notFoundPage',
    component: NotFoundPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'notFoundPage' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...dynamicRoutes],
});

export default router;
