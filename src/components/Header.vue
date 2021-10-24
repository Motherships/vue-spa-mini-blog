<script setup lang="ts">
import { routes } from '@/router';
</script>

<template>
  <header class="header">
    <div class="header__routes">
      <div class="header__route" v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.text }}</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
