<script setup lang="ts">
import TimeLine from "@/components/TimeLine.vue"
</script>

<template>
  <div class="section"></div>

  <div class="container">
    <Suspense>
      <template #default>
        <TimeLine />
      </template>
      <template #fallback>
        <progress class="progress is-primary is-small" />
      </template>
    </Suspense>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.css";
</style>
