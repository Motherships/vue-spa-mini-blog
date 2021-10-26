<script setup lang="ts">
import { reactive, ref, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { QuillEditor } from '@vueup/vue-quill';

import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Article from '@/models/ArticleModel';

const props = defineProps<{ article?: Article }>();
const store = useStore();

const articleEditor = ref({} as typeof QuillEditor);

let title = {
  value: '',
  touched: false,
};
let excerpt = {
  value: '',
  touched: false,
};
let content = {
  value: '',
  touched: false,
};

let isNewArticle = true;

const { article } = toRefs(props);

if (article && article.value) {
  isNewArticle = false;
  title = {
    value: article.value.title,
    touched: true,
  };
  excerpt = {
    value: article.value.excerpt,
    touched: true,
  };
  content = {
    value: article.value.content,
    touched: true,
  };
}

const initialNewArticleForm = (
  title: { value: string; touched: boolean },
  excerpt: { value: string; touched: boolean },
  content: { value: string; touched: boolean }
) => ({
  title: {
    value: title.value,
    error: false,
    touched: title.touched,
  },
  excerpt: {
    value: excerpt.value,
    error: false,
    touched: excerpt.touched,
  },
  content: {
    value: content.value,
    error: false,
    touched: content.touched,
  },
});

const newArticleForm = reactive(initialNewArticleForm(title, excerpt, content));

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
  Object.assign(newArticleForm, initialNewArticleForm(title, excerpt, content));
  articleEditor.value.setContents(content.value);
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

const updateArticle = () => {
  if (!(article && article.value)) {
    return false;
  }

  const titleIsValid = isTitleValid();
  const excerptIsValid = isExcerptValid();
  const contentIsValid = isContentValid();
  if (titleIsValid && excerptIsValid && contentIsValid) {
    console.log('valid');
    const newArticle = {
      id: article.value.id,
      title: newArticleForm.title.value,
      excerpt: newArticleForm.excerpt.value,
      content: newArticleForm.content.value,
    };
    store.commit('updateArticle', newArticle);

    return true;
  }

  console.log('invalid');
  return false;
};
</script>

<template>
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
        :content="newArticleForm.content.value"
        :contentType="'html'"
      />
    </div>
    <p
      v-if="newArticleForm.content.touched && newArticleForm.content.error"
      class="help is-danger"
    >
      Content can't be empty
    </p>
  </div>

  <div v-if="isNewArticle" class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        @click="sumbitForm"
        :disabled="
          newArticleForm.title.error ||
          newArticleForm.excerpt.error ||
          newArticleForm.content.error
        "
        :class="{
          'is-disabled':
            newArticleForm.title.error ||
            newArticleForm.excerpt.error ||
            newArticleForm.content.error,
        }"
      >
        Submit
      </button>
    </div>
  </div>

  <div v-else class="field is-grouped">
    <div class="control">
      <button
        class="button is-link"
        @click="updateArticle"
        :disabled="
          newArticleForm.title.error ||
          newArticleForm.excerpt.error ||
          newArticleForm.content.error
        "
        :class="{
          'is-disabled':
            newArticleForm.title.error ||
            newArticleForm.excerpt.error ||
            newArticleForm.content.error,
        }"
      >
        Save
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
