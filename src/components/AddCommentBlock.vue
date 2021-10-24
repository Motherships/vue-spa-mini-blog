<script setup lang="ts">
import AddCommentForm from '@/components/AddCommentForm.vue';
defineProps<{ parentId: string }>();
</script>

<template>
  <div class="add-comment-block">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">Add Comment</p>
          </div>
        </div>

        <div class="content">
          <AddCommentForm :parent-id="parentId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-comment-block {
  margin-top: 24px;
}
</style>
