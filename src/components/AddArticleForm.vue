<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const store = useStore();

const initialNewArticleForm = () => ({
  title: {
    value: '',
    error: true,
    touched: false,
  },
  excerpt: {
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

const newArticleForm = reactive(initialNewArticleForm());

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

const isExcerptValid = () => {
  if (newArticleForm.excerpt.value === '') {
    if (newArticleForm.excerpt.touched === false) {
      newArticleForm.excerpt.touched = true;
    }
    newArticleForm.excerpt.error = true;
    return false;
  }

  newArticleForm.excerpt.error = false;
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

const resetForm = () => {
  Object.assign(newArticleForm, initialNewArticleForm());
  articleEditor.value.setContents('');
};

const sumbitForm = () => {
  const titleIsValid = isTitleValid();
  const excerptIsValid = isExcerptValid();
  const contentIsValid = isContentValid();
  if (titleIsValid && excerptIsValid && contentIsValid) {
    console.log('valid');
    const newArticle = {
      title: newArticleForm.title.value,
      excerpt: newArticleForm.excerpt.value,
      content: newArticleForm.content.value,
    };
    store.commit('addArticle', newArticle);

    resetForm();
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
          v-model="newArticleForm.title.value"
          class="input"
          type="text"
          placeholder="Title"
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
      <label class="label">Excerpt</label>
      <div class="control">
        <textarea
          v-model="newArticleForm.excerpt.value"
          @input="isExcerptValid"
          placeholder="Excerpt"
          class="textarea"
          cols="30"
          rows="2"
          :class="{
            'is-danger':
              newArticleForm.excerpt.touched && newArticleForm.excerpt.error,
          }"
        ></textarea>
      </div>
      <p
        v-if="newArticleForm.excerpt.touched && newArticleForm.excerpt.error"
        class="help is-danger"
      >
        Excerpt can't be empty
      </p>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <QuillEditor
          toolbar="minimal"
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
