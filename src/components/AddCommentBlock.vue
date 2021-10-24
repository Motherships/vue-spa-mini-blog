<script setup lang="ts">
import AddCommentForm from '@/components/AddCommentForm.vue';

defineProps<{ parentId: string }>();

const emit = defineEmits<{
  (e: 'newComment'): void;
}>();
</script>

<template>
  <div class="add-comment-block">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title">Add Comment</p>
          </div>
        </div>

        <div class="content">
          <AddCommentForm
            :parent-id="parentId"
            @new-comment="emit('newComment')"
          />
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
