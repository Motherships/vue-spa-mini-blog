<script setup lang="ts">
import Article from '@/models/ArticleModel';
defineProps<{ article: Article }>();
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
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
