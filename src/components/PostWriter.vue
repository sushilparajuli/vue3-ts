<script lang="ts" setup>
// import
import { ref, onMounted } from "vue";
import type { TimelinePost } from "@/posts";

// Props and reactive variables
const props = defineProps<{
  post: TimelinePost;
}>();
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();

// Lifecycle hooks
onMounted(() => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node not found");
  }
  contentEditable.value.innerText = content.value;
});

// Methods
const handleInput = () => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node not found");
  }
  content.value = contentEditable.value?.innerText;
};
</script>
<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input type="text" class="input" v-model="title" />
        {{ title }}
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div ref="contentEditable" contenteditable @input="handleInput" />
    </div>
    <div class="column">{{ content }}</div>
  </div>
</template>
