<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';

const props = defineProps<{ parentId: string }>();
const emit = defineEmits<{
  (e: 'newComment'): void;
}>();

const store = useStore();

const initialNewCommentForm = () => ({
  name: {
    value: '',
    error: true,
    touched: false,
  },
  content: {
    value: '',
    error: true,
    touched: false,
  },
});

const newCommentForm = reactive(initialNewCommentForm());

const isTitleValid = () => {
  if (newCommentForm.name.value === '') {
    if (newCommentForm.name.touched === false) {
      newCommentForm.name.touched = true;
    }
    newCommentForm.name.error = true;
    return false;
  }

  newCommentForm.name.error = false;
  return true;
};

const isContentValid = () => {
  if (newCommentForm.content.value === '') {
    if (newCommentForm.content.touched === false) {
      newCommentForm.content.touched = true;
    }
    newCommentForm.content.error = true;
    return false;
  }

  newCommentForm.content.error = false;
  return true;
};

const resetForm = () => {
  Object.assign(newCommentForm, initialNewCommentForm());
};
const sumbitForm = () => {
  const nameIsValid = isTitleValid();
  const contentIsValid = isContentValid();
  if (nameIsValid && contentIsValid) {
    console.log('valid');
    const newComment = {
      parentId: props.parentId,
      authorName: newCommentForm.name.value,
      content: newCommentForm.content.value,
    };
    store.commit('addComment', newComment);
    resetForm();
    emit('newComment');
    return true;
  }

  console.log('invalid');
  return false;
};
</script>

<template>
  <form action="" method="post" @submit.prevent="sumbitForm">
    <div class="field">
      <label class="label">Author Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Author name"
          v-model="newCommentForm.name.value"
          :class="{
            'is-danger':
              newCommentForm.name.touched && newCommentForm.name.error,
          }"
          @input="isTitleValid"
        />
      </div>
      <p
        v-if="newCommentForm.name.touched && newCommentForm.name.error"
        class="help is-danger"
      >
        Name can't be empty
      </p>
    </div>

    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Content"
          v-model="newCommentForm.content.value"
          :class="{
            'is-danger':
              newCommentForm.content.touched && newCommentForm.content.error,
          }"
          @input="isContentValid"
        ></textarea>
      </div>
      <p
        v-if="newCommentForm.content.touched && newCommentForm.content.error"
        class="help is-danger"
      >
        Content can't be empty
      </p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :disabled="newCommentForm.name.error || newCommentForm.content.error"
          :class="{
            'is-disabled':
              newCommentForm.name.error || newCommentForm.content.error,
          }"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss"></style>
