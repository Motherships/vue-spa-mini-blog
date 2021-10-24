<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Article from '@/components/Article.vue';

const store = useStore();
const route = useRoute();

store.commit('setCurrentArticleByID', route.params.id);
</script>

<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="content">
          <div class="columns">
            <div class="column">
              <Article :article="store.state.currentArticle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss"></style>
