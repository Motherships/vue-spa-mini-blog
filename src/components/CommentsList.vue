<script setup lang="ts">
import SingleComment from '@/components/SingleComment.vue';
import CommentModel from '@/models/CommentModel';

defineProps<{ comments: CommentModel[] }>();
</script>

<template>
  <ul class="comments-list">
    <li v-for="comment in comments" :key="comment.id">
      <SingleComment :comment="comment" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.comments-list {
  list-style: none;
}
</style>
