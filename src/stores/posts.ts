import { defineStore } from "pinia";
import { DateTime } from "luxon/src/luxon";
import type { Post, TimelinePost } from "@/types/posts";
import type { Period } from "@/types/constants.type";

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
    async fetchPosts() {
      const res = await fetch("http://localhost:8001/posts");
      const data = (await res.json()) as Post[];
      await delay();

      const ids: string[] = [];
      const all = new Map<string, Post>();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },
    createPost(post: TimelinePost) {
      const body = JSON.stringify({ ...post, created: post.created.toISO() });
      return fetch("http://localhost:8001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
  },
  getters: {
    filterPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);
          if (!post) {
            throw new Error(`Post ${id} not found`);
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }
          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }
          return post;
        });
    },
  },
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
