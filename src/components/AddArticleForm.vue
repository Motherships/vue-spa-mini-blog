<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const store = useStore();

const defaultNewArticleForm = {
  title: {
    value: '',
    error: true,
    touched: false,
  },
  content: {
    value: '',
    error: true,
    touched: false,
  },
};

// const quillContent = ref({});
const newArticleForm = reactive({ ...defaultNewArticleForm });

const articleEditor = ref({} as typeof QuillEditor);

const isTitleValid = () => {
  if (newArticleForm.title.value === '') {
    if (newArticleForm.title.touched === false) {
      newArticleForm.title.touched = true;
    }
    newArticleForm.title.error = true;
    return false;
  }

  newArticleForm.title.error = false;
  return true;
};

const isContentValid = () => {
  newArticleForm.content.value = articleEditor.value.getHTML();
  if (newArticleForm.content.value === '') {
    if (newArticleForm.content.touched === false) {
      newArticleForm.content.touched = true;
    }
    newArticleForm.content.error = true;
    return false;
  }

  newArticleForm.content.error = false;
  return true;
};

const sumbitForm = () => {
  const titleIsValid = isTitleValid();
  const contentIsValid = isContentValid();
  if (titleIsValid && contentIsValid) {
    console.log('valid');
    const newArticle = {
      title: newArticleForm.title.value,
      content: newArticleForm.content.value,
    };
    store.commit('addArticle', newArticle);
    Object.assign(newArticleForm, defaultNewArticleForm);
    return true;
  }

  console.log('invalid');
  return false;
};
</script>

<template>
  <form action="" method="post" @submit.prevent="sumbitForm">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Title"
          v-model="newArticleForm.title.value"
          :class="{
            'is-danger':
              newArticleForm.title.touched && newArticleForm.title.error,
          }"
          @input="isTitleValid"
        />
      </div>
      <p
        v-if="newArticleForm.title.touched && newArticleForm.title.error"
        class="help is-danger"
      >
        Title can't be empty
      </p>
    </div>

    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <QuillEditor
          toolbar="minimal"
          v-model:content="newArticleForm.content.value"
          ref="articleEditor"
          @update:content="isContentValid"
        />
      </div>
      <p
        v-if="newArticleForm.content.touched && newArticleForm.content.error"
        class="help is-danger"
      >
        Content can't be empty
      </p>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :disabled="newArticleForm.title.error || newArticleForm.content.error"
          :class="{
            'is-disabled':
              newArticleForm.title.error || newArticleForm.content.error,
          }"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss"></style>
