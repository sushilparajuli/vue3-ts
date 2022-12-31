<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { validate, length, required } from "@/validations";
import FormInput from "@/components/FormInput.vue";
import type { NewUser } from "@/types/users";
import { useUsers } from "@/stores/users";
import { useModal } from "@/composables/modal";

const username = ref("");
const password = ref("");
const usersStore = useUsers();
const modal = useModal();
const formField = ref<HTMLFormElement>();

const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 8, max: 20 })]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const handleSubmit = async () => {
  if (isInvalid.value) {
    return;
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };
  try {
    await usersStore.createUser(newUser);
  } catch (error) {
    console.error(error);
  }

  if (formField.value) {
    formField.value.reset();
  }

  modal.hidedModal();
};

onMounted(() => {
  console.log(formField.value);
});
</script>
<template>
  <form ref="formField" class="form" @submit.prevent="handleSubmit">
    <FormInput
      type="text"
      name="Username"
      v-model="username"
      :status="usernameStatus"
    />
    <FormInput
      type="password"
      name="Password"
      v-model="password"
      :status="passwordStatus"
    />
    <div class="control">
      <button :disabled="isInvalid" class="button is-primary">Submit</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  background: var(--vt-c-white);
  padding: 1.8rem;
  margin-top: 3rem;
}
</style>
