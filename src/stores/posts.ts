import { defineStore } from "pinia";
import { type Post, today, thisWeek, thisMonth } from "@/posts";

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
  }),
});

// import { reactive, readonly } from "vue";
// export class PostsStore {
//   #state: PostsState;

//   constructor() {
//     this.#state = reactive<PostsState>({ foo: "foo" });
//   }

//   getState(): PostsState {
//     return readonly(this.#state);
//   }

//   updateFoo(foo: string) {
//     this.#state.foo = foo;
//   }
// }

// const store = new PostsStore();

// export function usePosts() {
//   return store;
// }
