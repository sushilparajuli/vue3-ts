import type { NewUser, User } from "@/types/users";
import { defineStore } from "pinia";

interface UserState {
  currentUserId?: string;
}
export const useUsers = defineStore("users", {
  state: (): UserState => ({
    currentUserId: undefined,
  }),
  actions: {
    async authenticate() {
      try {
        const res = await fetch("/api/verify-token", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();
        this.currentUserId = user.id;
      } catch (err) {
        this.currentUserId = undefined;
      }
    },
    async logout() {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return this.authenticate();
    },
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      return this.authenticate();
    },
    async login(user: NewUser) {
      const body = JSON.stringify(user);
      return await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      // return this.authenticate();
    },
  },
});
