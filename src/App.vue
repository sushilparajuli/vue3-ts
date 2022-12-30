<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
<template>
  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "./assets/main.css";
</style>
