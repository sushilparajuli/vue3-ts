<script setup lang="ts">
import { useModal } from "@/composables/modal";
import { useUsers } from "@/stores/users";
import { useRouter } from "vue-router";
const modal = useModal();
const usersStore = useUsers();
const router = useRouter();

async function logOut() {
  await usersStore.logout();
  router.push({ path: "/" });
}
</script>
<template>
  <nav class="navbar mb-6">
    <div class="navbar-end">
      <div v-if="usersStore.currentUserId" class="buttons">
        <RouterLink to="/posts/new" class="button is-info">New Post</RouterLink>
        <button
          data-test="logout"
          type="button"
          @click="logOut()"
          class="button is-danger"
        >
          Log Out
        </button>
      </div>
      <div v-else class="buttons">
        <button
          data-test="sign-up"
          type="button"
          @click="modal.showModal('signUp')"
          class="button"
        >
          Sign Up
        </button>
        <button
          data-test="sign-in"
          @click="modal.showModal('signIn')"
          class="button"
        >
          Sign In
        </button>
      </div>
    </div>
    <Teleport to="#modal"> <component :is="modal.component.value" /> </Teleport>
  </nav>
</template>
