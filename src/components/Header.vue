<script setup lang="ts">
import { ref } from 'vue';
import { routes } from '@/router';

const showNavBar = ref(false);
</script>

<template>
  <header class="header">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showNavBar }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          @click="showNavBar = !showNavBar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" class="navbar-menu" :class="{ 'is-active': showNavBar }">
        <div class="navbar-start">
          <div v-for="route in routes" :key="route.path" class="navbar-item">
            <router-link :to="route.path">{{ route.name }}</router-link>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss"></style>
