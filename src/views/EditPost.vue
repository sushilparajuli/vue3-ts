<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import { useRoute } from "vue-router";
import PostWriter from "@/components/PostWriter.vue";
const route = useRoute();
const id = route.params.id as string;
const postsStore = usePosts();
const post = postsStore.all.get(id);

if (!post) {
  throw Error(`No Post found with given id:${id}`);
}
</script>
<template>
  <h1>Edit Post :</h1>
  <PostWriter :post="post" />
</template>
