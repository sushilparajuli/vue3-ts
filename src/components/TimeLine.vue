<script setup lang="ts">
import { DateTime } from "luxon/src/luxon";
import { ref, computed } from "vue";
import { type TimelinePost, today, thisMonth, thisWeek } from "../posts";
import TimeLineItem from "./TimeLineItem.vue";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = typeof periods[number];
const selectedPeriod = ref<Period>("Today");

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
      return post;
    });
});

const selectPeriod = (period: Period): void => {
  selectedPeriod.value = period;
};
</script>
<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="`period`"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <TimeLineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>
