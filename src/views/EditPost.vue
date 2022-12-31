<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import { useRoute, useRouter } from "vue-router";
import PostWriter from "@/components/PostWriter.vue";
import type { Post } from "@/types/posts";
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const postsStore = usePosts();
const post = postsStore.all.get(id);

if (!post) {
  throw Error(`No Post found with given id:${id}`);
}

const handleEditPost = async (post: Post) => {
  await postsStore.editPost(post);
  router.push("/");
};
</script>
<template>
  <h1>Edit Post :</h1>
  <PostWriter :post="post" @submit="handleEditPost" />
</template>
