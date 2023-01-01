<script lang="ts" setup>
// import
import { ref, onMounted, watch } from "vue";
import type { Post, TimelinePost } from "@/types/posts";
import { marked } from "marked";
import hljs from "highlight.js";
import debounce from "lodash/debounce";
import { useUsers } from "@/stores/users";

// Props and reactive variables
const props = defineProps<{
  post: TimelinePost | Post;
}>();
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref("");
const usersStore = useUsers();

const emit = defineEmits<{
  (event: "submit", payload: Post): void;
}>();

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
  if (!usersStore.currentUserId) {
    throw Error("Users was not found");
  }
  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created === "string"
        ? props.post.created
        : props.post.created.toISO(),
    title: title.value,
    markdown: content.value,
    html: html.value,
    authorId: usersStore.currentUserId,
  };

  try {
    emit("submit", newPost);
  } catch (error) {
    console.error(error);
  }
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
      <div
        data-test-id="content-editable"
        ref="contentEditable"
        contenteditable
        @input="handleInput"
      />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button
        data-test-id="submit"
        class="button is-primary is-pulled-right"
        @click="handleSave"
      >
        Save Post
      </button>
    </div>
  </div>
</template>
