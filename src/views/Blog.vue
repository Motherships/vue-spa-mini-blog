<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import Article from '@/components/ArticleCard.vue';
const ARTICLES_PER_PAGE = 2;

const store = useStore();
const route = useRoute();

const numberOfPages = ref(
  Math.ceil((store.state.articles.length || 1) / ARTICLES_PER_PAGE)
);

function getCurrentPage() {
  return parseInt(route.query.page as string) || 1;
}
const currentPage = ref(getCurrentPage());

function fetchArticles() {
  const articles = store.state.articles.slice(
    (currentPage.value - 1) * ARTICLES_PER_PAGE
  );

  let numberToCut = ARTICLES_PER_PAGE;
  if (articles.length < numberToCut) {
    numberToCut = articles.length;
  }
  return articles.slice(0, numberToCut);
}

const currentArticles = ref(fetchArticles());

watch(
  () => route.query.page,
  (first, second) => {
    currentPage.value = getCurrentPage();
    console.log(currentPage.value);
    currentArticles.value = fetchArticles();
    console.log(currentArticles.value);
  }
);
</script>

<template>
  <main class="main blog">
    <section class="section">
      <div class="container">
        <div class="content">
          <h1 class="title">List of articles</h1>
          <ul class="blog__articles-list">
            <li
              v-for="article in currentArticles"
              :key="article.id"
              class="blog__article"
            >
              <router-link :to="'/blog/' + article.id">
                <Article :article="article" />
              </router-link>
            </li>
          </ul>
          <nav
            class="pagination is-large"
            role="navigation"
            aria-label="pagination"
          >
            <span v-if="currentPage > 1" class="pagination-previous">
              <router-link
                :to="{ name: 'Blog', query: { page: currentPage - 1 } }"
              >
                Previous
              </router-link>
            </span>
            <span v-if="numberOfPages > currentPage" class="pagination-next">
              <router-link
                :to="{ name: 'Blog', query: { page: currentPage + 1 } }"
              >
                Next page
              </router-link>
            </span>
          </nav>
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
