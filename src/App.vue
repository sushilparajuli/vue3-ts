<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useModal } from "@/composables/modal";
import { ref, computed } from "vue";
import FormInput from "./components/FormInput.vue";
const modal = useModal();

const username = ref("hello");

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  };
});
</script>
<template>
  <div class="modal" style="color: white" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button @click="modal.hidedModal()" class="modal-close is-large"></button>
  </div>
  <div class="section">
    <div class="container">
      <FormInput name="Username" v-model="username" />
      <Navbar />
      <RouterView />
      {{ username }}
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "./assets/main.css";
</style>
