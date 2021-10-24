<script setup lang="ts">
import { CurrentArticle } from '@/models/ArticleModel';
defineProps<{ article: CurrentArticle }>();
</script>

<template>
  <section class="article">
    <section class="article">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ article.title }}</p>
            </div>
          </div>

          <div class="content">
            {{ article.content }}
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss"></style>
