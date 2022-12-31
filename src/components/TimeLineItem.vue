<script setup lang="ts">
import type { TimelinePost } from "@/types/posts";
defineProps<{
  post: TimelinePost;
}>();
</script>
<template>
  <RouterLink
    :to="`posts/${post.id}`"
    :class="`panel-block is-flex is-flex-direction-column`"
  >
    <a> {{ post.title }} </a>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </RouterLink>
</template>
