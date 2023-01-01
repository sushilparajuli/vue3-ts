import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NewPost from "@/views/NewPost.vue";
import ShowPost from "@/views/ShowPost.vue";
import EditPost from "@/views/EditPost.vue";
import { useUsers } from "@/stores/users";

// 2. Define some routes
// Each route should map to a component.
export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/posts/new",
    component: NewPost,
    beforeEnter: () => {
      const userStore = useUsers();
      if (!userStore.currentUserId) {
        return {
          path: "/",
        };
      }
    },
  },
  {
    path: "/posts/:id",
    component: ShowPost,
  },
  {
    path: "/posts/:id/edit",
    component: EditPost,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
