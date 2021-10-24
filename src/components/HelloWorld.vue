<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>

  <div class="useless-button-wrapper">
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style scoped lang="scss">
a {
  display: block;
  color: #42b983;
}

.useless-button-wrapper {
  padding-top: 40px;
}
</style>
