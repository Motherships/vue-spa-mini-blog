<script setup lang="ts">
import { useStore } from 'vuex';

import Article from '@/components/Article.vue';

const store = useStore();
</script>

<template>
  <main class="main blog">
    <section class="section">
      <div class="container">
        <div class="content">
          <h1>List of articles</h1>
          <ul class="blog__articles-list">
            <li
              v-for="article in store.state.articles"
              :key="article.id"
              class="blog__article"
            >
              <Article :article="article" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss"></style>
