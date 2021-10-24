<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style lang="scss">
@import 'bulma/bulma.sass';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    background-color: #fafafa;
  }
}
</style>
