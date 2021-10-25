<script setup lang="ts">
import { ref } from 'vue';
import { leftRoutes, rightRoutes } from '@/router';

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
          <router-link
            v-for="route in leftRoutes"
            :key="route.path"
            :to="{ name: route.name }"
            class="navbar-item"
          >
            {{ route.label }}
          </router-link>
        </div>

        <div class="navbar-end">
          <div
            v-for="route in rightRoutes"
            :key="route.path"
            class="navbar-item"
          >
            <div class="buttons">
              <router-link :to="{ name: route.name }" class="button is-primary">
                {{ route.label }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss"></style>
