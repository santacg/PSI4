<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NAVHeader from './components/NAVHeader.vue'
</script>

<template>
  <header>
  <NAVHeader/>
  </header>
  <RouterView />
</template>
