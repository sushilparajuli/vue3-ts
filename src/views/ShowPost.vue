<script setup lang="ts">
import { usePosts } from "@/stores/posts";
import { useUsers } from "@/stores/users";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;
const postsStore = usePosts();
const usersStore = useUsers();
const post = postsStore.all.get(id);

const canEdit = computed(() => {
  if (!usersStore.currentUserId) return false;
  if (usersStore.currentUserId !== post?.authorId) return false;
  return true;
});

if (!post) {
  throw Error(`No Post found with given id:${id}`);
}
</script>
<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-third">
      <RouterLink
        v-if="canEdit"
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
