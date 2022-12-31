<script setup lang="ts">
import PostWriter from "@/components/PostWriter.vue";
import { useUsers } from "@/stores/users";
import { usePosts } from "@/stores/posts";
import type { Post, TimelinePost } from "@/types/posts";
import { DateTime } from "luxon";
import { useRouter } from "vue-router";

const usersStore = useUsers();
const postsStore = usePosts();
const router = useRouter();

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

const handleNewPost = async (post: Post) => {
  await postsStore.createPost(post);
  router.push("/");
};
</script>
<template>
  <PostWriter :post="post" @submit="handleNewPost" />
</template>
