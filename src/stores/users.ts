import type { NewUser } from "@/types/users";
import { defineStore } from "pinia";

export const useUsers = defineStore("users", {
  actions: {
    createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);
      return fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
  },
});
