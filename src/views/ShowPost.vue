<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;
const postsStore = usePosts();
const post = postsStore.all.get(id);

if (!post) {
  throw Error(`No Post found with given id:${id}`);
}
</script>
<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-third">
      <RouterLink
        :to="`/posts/${post.id}/edit`"
        class="is-link button is-rounded"
      >
        Edit
      </RouterLink>
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column"></div>
  </div>
</template>
