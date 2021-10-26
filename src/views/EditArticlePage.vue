<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import EditArticleBlock from '@/components/EditArticleBlock.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const article = computed(() => store.getters.getArticleById(route.params.id));

if (!article.value.id) {
  router.push({ name: 'notFoundPage' });
}
</script>

<template>
  <main class="main edit-article">
    <section class="section">
      <div class="container">
        <div class="content">
          <div class="columns">
            <div class="column">
              <EditArticleBlock :article="article" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss"></style>
