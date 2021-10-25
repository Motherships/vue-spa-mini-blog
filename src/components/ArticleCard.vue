<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import Article from '@/models/ArticleModel';
const props = defineProps<{ article: Article }>();
const store = useStore();

const commentsCount = computed(() =>
  store.getters.getCommentsNumberByArticleId(props.article.id)
);
</script>

<template>
  <section class="article">
    <div class="card">
      <div class="card-image">
        <!-- <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure> -->
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ article.title }}</p>
          </div>
        </div>

        <div class="content">
          {{ article.excerpt }}
        </div>

        <div class="comments-count">{{ commentsCount }} comments</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.article {
  transition: transform ease-in-out 0.2s;
  &:focus,
  &:hover {
    transform: scale(1.02);
  }
}
</style>
