<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import Article from '@/models/ArticleModel';
const props = defineProps<{ article: Article }>();

const store = useStore();
const router = useRouter();

const deleteArticle = () => {
  store.commit('deleteArticle', props.article.id);
  router.push({ name: 'Blog' });
};
</script>

<template>
  <section class="article">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ article.title }}</p>
          </div>
        </div>

        <div class="content" v-html="article.content"></div>
        <div class="">
          <button class="button is-danger" @click="deleteArticle">
            Delete
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
