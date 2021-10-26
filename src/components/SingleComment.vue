<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Comment from '@/models/CommentModel';
import AddCommentBlock from '@/components/AddCommentBlock.vue';

const props = defineProps<{ comment: Comment }>();
const store = useStore();
const showCommentForm = ref(false);
const editComment = ref(false);

const initialUpdatedCommentForm = () => {
  return {
    id: props.comment.id,
    authorName: props.comment.authorName,
    content: props.comment.content,
  };
};

const updatedCommentForm = reactive(initialUpdatedCommentForm());

const comments = computed(() =>
  store.getters.getCommentsByParentId(props.comment.id)
);

const resetForm = () => {
  Object.assign(updatedCommentForm, initialUpdatedCommentForm());
};

const deleteComment = () => {
  store.commit('deleteComment', props.comment.id);
};

const updateComment = () => {
  store.commit('updateComment', updatedCommentForm);
  editComment.value = false;
};

watch(
  () => props.comment,
  () => {
    resetForm();
  }
);
</script>

<template>
  <section class="comment">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p v-if="!editComment" class="title is-4">
              {{ comment.authorName }}
            </p>
            <input
              v-else
              v-model="updatedCommentForm.authorName"
              class="input"
              type="text"
            />
          </div>
          <div class="media-right">
            <div v-if="!editComment" class="buttons">
              <button
                class="button"
                @click="showCommentForm = !showCommentForm"
              >
                {{ showCommentForm ? 'Hide Comment form' : 'Add Comment' }}
              </button>
              <button
                class="button is-primary"
                @click="editComment = !editComment"
              >
                Edit
              </button>
              <button class="button is-danger" @click="deleteComment">
                Delete
              </button>
            </div>
            <div v-else class="buttons">
              <button class="button is-success" @click="updateComment">
                save
              </button>
            </div>
          </div>
        </div>

        <div v-if="!editComment" class="content">
          {{ comment.content }}
        </div>
        <textarea
          v-else
          v-model="updatedCommentForm.content"
          class="textarea"
          cols="30"
          rows="2"
        ></textarea>
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
