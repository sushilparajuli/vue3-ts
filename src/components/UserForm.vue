<script setup lang="ts">
import { ref, computed } from "vue";
import { validate, length, required } from "@/validations";
import FormInput from "@/components/FormInput.vue";
import type { NewUser } from "@/types/users";

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void;
}>();

const props = defineProps<{
  errorMessage?: string;
}>();

const username = ref("");
const password = ref("");
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
    emit("submit", newUser);
  } catch (error) {
    console.error(error);
  }

  if (formField.value && !props.errorMessage) {
    formField.value.reset();
  }
};
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
    <div v-if="errorMessage" class="is-danger help">{{ errorMessage }}</div>
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
