<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { nanoid } from 'nanoid';

const store = useStore();
console.log(store);

const newArticleForm = reactive({
  title: {
    value: '',
    error: false,
    touched: false,
  },
  content: {
    value: '',
    error: false,
    touched: false,
  },
});

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
  if (isTitleValid() && isContentValid()) {
    console.log(nanoid());
  } else {
    console.log('invalid');
  }
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
          placeholder="Text input"
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
        <textarea
          class="textarea"
          placeholder="Textarea"
          v-model="newArticleForm.content.value"
          :class="{
            'is-danger':
              newArticleForm.content.touched && newArticleForm.content.error,
          }"
          @input="isContentValid"
        ></textarea>
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
        <button class="button is-link">Submit</button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss"></style>
