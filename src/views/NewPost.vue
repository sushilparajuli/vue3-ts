<script setup lang="ts">
import PostWriter from "@/components/PostWriter.vue";
import type { TimelinePost } from "@/types/posts";
import { DateTime } from "luxon";
const post: TimelinePost = {
  id: "-1",
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
};
</script>
<template>
  <PostWriter :post="post" />
</template>
