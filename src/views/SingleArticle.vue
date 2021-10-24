<script setup lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Article from '@/components/Article.vue';
import Comment from '@/components/Comment.vue';
import AddCommentBlock from '@/components/AddCommentBlock.vue';

const store = useStore();
const route = useRoute();

const article = store.getters.getArticleById(route.params.id);
const comments = store.getters.getCommentsByParentId(article.id);
console.log(comments);
</script>

<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="content">
          <div class="columns">
            <div class="column">
              <Article :article="article" />
              <ul>
                <li v-for="comment in comments" :key="comment.id">
                  <Comment :comment="comment" />
                </li>
              </ul>
              <AddCommentBlock :parent-id="article.id" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss"></style>
