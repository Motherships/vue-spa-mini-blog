<script setup lang="ts">
import Comment from '@/models/CommentModel';
defineProps<{ comment: Comment }>();
</script>

<template>
  <section class="comment">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ comment.authorName }}</p>
          </div>
        </div>

        <div class="content">
          {{ comment.content }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
