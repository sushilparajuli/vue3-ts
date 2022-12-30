<script lang="ts" setup>
// import
import { ref, onMounted, watch } from "vue";
import type { TimelinePost } from "@/posts";
import { marked } from "marked";
import hljs from "highlight.js";
import { useRouter } from "vue-router";
import debounce from "lodash/debounce";
import { usePosts } from "@/stores/posts";

// Props and reactive variables
const props = defineProps<{
  post: TimelinePost;
}>();
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref("");
const postStore = usePosts();
const router = useRouter();

// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult;
//   });
// });

// Methods
const handleInput = () => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node not found");
  }
  content.value = contentEditable.value?.innerText;
};

const handleSave = async () => {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
  };
  await postStore.createPost(newPost);
  router.push("/");
};

const parsHtml = (markdown: string) => {
  marked.parse(
    markdown,
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
};

watch(
  content,
  debounce((newContent) => {
    parsHtml(newContent);
  }, 250),
  { immediate: true }
);

// Lifecycle hooks
onMounted(() => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node not found");
  }
  contentEditable.value.innerText = content.value;
});
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
  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleSave">
        Save Post
      </button>
    </div>
  </div>
</template>
