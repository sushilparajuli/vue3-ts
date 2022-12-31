<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useModal } from "@/composables/modal";
import { computed } from "vue";
const modal = useModal();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  };
});

async function authenticate() {
  const res = await fetch("/api/verify-token", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await res.json());
}
authenticate();
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
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.css";
@import "highlight.js/styles/atom-one-dark.css";
@import "./assets/main.css";
</style>
