<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import SingleArticle from '@/components/SingleArticle.vue';
import AddCommentBlock from '@/components/AddCommentBlock.vue';
import CommentsList from '@/components/CommentsList.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const article = computed(() => store.getters.getArticleById(route.params.id));

if (!article.value.id) {
  router.push({ name: 'notFoundPage' });
}
const comments = computed(() =>
  store.getters.getCommentsByParentId(article.value.id)
);

const deleteArticle = () => {
  store.commit('deleteArticle', article.value.id);
  router.push({ name: 'blog' });
};
</script>

<template>
  <main class="main single-article">
    <section class="section">
      <div class="container">
        <div class="content">
          <div class="columns">
            <div class="column">
              <SingleArticle
                :article="article"
                @delete-article="deleteArticle"
              />

              <h2 class="title">Comments</h2>
              <CommentsList :comments="comments" />

              <AddCommentBlock v-if="article.id" :parent-id="article.id" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.single-article {
  &__comments-list {
    list-style: none;
  }
}
</style>
