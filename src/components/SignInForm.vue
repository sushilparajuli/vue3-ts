<script setup lang="ts">
import UserForm from "@/components/UserForm.vue";
import { useModal } from "@/composables/modal";
import { useUsers } from "@/stores/users";
import type { NewUser } from "@/types/users";
import { ref } from "vue";
const usersStore = useUsers();
const modal = useModal();
const error = ref("");
const handleSignIn = async (user: NewUser) => {
  const res = await usersStore.login(user);

  if ([401, 404].includes(res.status)) {
    error.value = "User name or password is incorrect";
  } else {
    usersStore.authenticate();
    modal.hideModal();
  }
};
</script>
<template>
  <UserForm @submit="handleSignIn" :errorMessage="error" />
</template>
