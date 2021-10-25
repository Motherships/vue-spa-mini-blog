<script setup lang="ts">
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Comment from '@/models/CommentModel';
import AddCommentBlock from '@/components/AddCommentBlock.vue';

const props = defineProps<{ comment: Comment }>();
const store = useStore();
const showCommentForm = ref(false);

const comments = computed(() =>
  store.getters.getCommentsByParentId(props.comment.id)
);

const deleteComment = () => {
  store.commit('deleteComment', props.comment.id);
};
</script>

<template>
  <section class="comment">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ comment.authorName }}</p>
          </div>
          <div class="media-right">
            <div class="buttons">
              <button
                class="button"
                @click="showCommentForm = !showCommentForm"
              >
                {{ showCommentForm ? 'Hide Comment form' : 'Add Comment' }}
              </button>

              <button class="button is-danger" @click="deleteComment">
                Delete
              </button>
            </div>
          </div>
        </div>

        <div class="content">
          {{ comment.content }}
        </div>
      </div>
    </div>
  </section>
  <AddCommentBlock
    v-if="showCommentForm"
    :parent-id="comment.id"
    @new-comment="showCommentForm = !showCommentForm"
  />

  <ul
    v-for="childComment in comments"
    :key="childComment.id"
    class="comments-list"
  >
    <li><SingleComment :comment="childComment" /></li>
  </ul>
</template>

<style scoped lang="scss">
.comments-list {
  list-style: none;
}

.comment {
  .buttons {
    justify-content: flex-end;
  }
}
</style>
