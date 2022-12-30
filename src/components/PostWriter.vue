<script lang="ts" setup>
// import
import { ref, onMounted, watch, watchEffect } from "vue";
import type { TimelinePost } from "@/posts";
import { marked } from "marked";
import hljs from "highlight.js";

// Props and reactive variables
const props = defineProps<{
  post: TimelinePost;
}>();
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref("");

// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult;
//   });
// });

watch(
  content,
  (newContent) => {
    marked.parse(
      newContent,
      {
        gfm: true,
        breaks: true,
        highlight: (code) => {
          return hljs.highlightAuto(code).value;
        },
      },
      (err, parseResult) => {
        html.value = parseResult;
      }
    );
  },
  { immediate: true }
);

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
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
</template>