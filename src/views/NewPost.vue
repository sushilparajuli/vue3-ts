<script setup lang="ts">
import PostWriter from "@/components/PostWriter.vue";
import { useUsers } from "@/stores/users";
import type { TimelinePost } from "@/types/posts";
import { DateTime } from "luxon";

const usersStore = useUsers();

if (!usersStore.currentUserId) {
  throw Error("Users was not found");
}
const post: TimelinePost = {
  id: "-1",
  title: "Title",
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
  authorId: usersStore.currentUserId,
};
</script>
<template>
  <PostWriter :post="post" />
</template>
