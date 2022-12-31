<script setup lang="ts">
import { useModal } from "@/composables/modal";
import SignupForm from "@/components/SignupForm.vue";
const modal = useModal();
</script>
<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button type="button" @click="modal.showModal()" class="button">
          Sign Up
        </button>
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
      </div>
    </div>
    <Teleport to="#modal"> <SignupForm /> </Teleport>
  </nav>
</template>
