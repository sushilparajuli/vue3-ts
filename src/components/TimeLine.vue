<script setup lang="ts">
import TimeLineItem from "@/components/TimeLineItem.vue"
import { usePosts } from "@/stores/posts"
import { periods } from "@/types/constants.type"

// store setup and fetch posts
const postsStore = usePosts()
await postsStore.fetchPosts()
</script>
<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <TimeLineItem
      v-for="post of postsStore.filterPosts"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>
