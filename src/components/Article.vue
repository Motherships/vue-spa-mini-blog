<script setup lang="ts">
import Article from '@/models/ArticleModel';
defineProps<{ article: Article }>();
</script>

<template>
  <section class="article">
    <h2>{{ article.title }}</h2>
    <p>{{ article.content }}</p>
  </section>
</template>

<style scoped lang="scss"></style>
