<script setup lang="ts">
import AddArticleForm from '@/components/AddArticleForm.vue';
</script>

<template>
  <div class="add-article-block">
    <div class="add-comment-block">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">Add Article</p>
            </div>
          </div>

          <div class="content">
            <AddArticleForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
