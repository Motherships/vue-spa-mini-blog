<script setup lang="ts">
import { useStore } from 'vuex';

import Article from '@/components/ArticleCard.vue';

const store = useStore();
</script>

<template>
  <main class="main blog">
    <section class="section">
      <div class="container">
        <div class="content">
          <h1 class="title">List of articles</h1>
          <ul class="blog__articles-list">
            <li
              v-for="article in store.state.articles"
              :key="article.id"
              class="blog__article"
            >
              <router-link :to="'/blog/' + article.id">
                <Article :article="article" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.blog {
  &__articles-list {
    display: flex;
    flex-direction: column;
    gap: 24px;

    margin: 0;
    list-style: none;
  }
}
</style>
