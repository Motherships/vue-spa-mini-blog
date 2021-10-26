<script setup lang="ts">
import ArticleForm from '@/components/ArticleForm.vue';
import Article from '@/models/ArticleModel';
defineProps<{ article: Article }>();
</script>

<template>
  <div class="add-article-block">
    <div class="add-comment-block">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title">Edit Article</p>
            </div>
          </div>

          <div class="content">
            <ArticleForm :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
