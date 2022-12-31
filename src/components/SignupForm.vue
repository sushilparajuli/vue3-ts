<script setup lang="ts">
import { ref, computed } from "vue";
import { validate, length, required } from "@/validations";
import FormInput from "@/components/FormInput.vue";

const username = ref("hello");
const password = ref("");

const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 8, max: 20 })]);
});
</script>
<template>
  <form class="form">
    <FormInput name="Username" v-model="username" :status="usernameStatus" />
    <FormInput name="Password" v-model="password" :status="passwordStatus" />
  </form>
</template>

<style scoped>
.form {
  background: var(--vt-c-white);
  padding: 1.8rem;
  margin-top: 3rem;
}
</style>
