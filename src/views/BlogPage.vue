<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import Article from '@/models/ArticleModel';
import ArticleCard from '@/components/ArticleCard.vue';
import InfiniteLoading from 'vue-infinite-loading';
const ARTICLES_PER_PAGE = 5;
const store = useStore();

const page = ref(0);
const currentArticles = ref<Array<Article>>([]);

function fetchArticles(): Array<Article> {
  const itemsToSkip = (page.value - 1) * ARTICLES_PER_PAGE;
  if (store.state.articles.length < itemsToSkip) {
    return [];
  }
  const articles = store.state.articles.slice(itemsToSkip);

  let numberToCut = ARTICLES_PER_PAGE;
  if (articles.length < numberToCut) {
    numberToCut = articles.length;
  }
  return articles.slice(0, numberToCut);
}

function addArticles($state: any) {
  page.value += 1;
  const articles = fetchArticles();
  if (articles.length) {
    currentArticles.value.push(...articles);
    $state.loaded();
  } else {
    $state.complete();
  }
}
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
                <ArticleCard :article="article" />
              </router-link>
            </li>
          </ul>
          <infinite-loading @infinite="addArticles"></infinite-loading>
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
