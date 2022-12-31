<script setup lang="ts">
import { useModal } from "@/composables/modal";
import { useUsers } from "@/stores/users";
const modal = useModal();
const usersStore = useUsers();
</script>
<template>
  <nav class="navbar mb-6">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button is-info">New Post</RouterLink>
        <button
          type="button"
          @click="usersStore.logout()"
          class="button is-danger"
        >
          Log Out
        </button>
      </div>
      <div v-else class="buttons">
        <button type="button" @click="modal.showModal('signUp')" class="button">
          Sign Up
        </button>
        <button @click="modal.showModal('signIn')" class="button">
          Sign In
        </button>
      </div>
    </div>
    <Teleport to="#modal"> <component :is="modal.component.value" /> </Teleport>
  </nav>
</template>
