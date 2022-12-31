<script setup lang="ts">
import TimeLine from "@/components/TimeLine.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <progress class="progress is-primary is-small mt-5" />
    </template>
  </Suspense>
</template>
