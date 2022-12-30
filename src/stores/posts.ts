import { defineStore } from "pinia"
import { DateTime } from "luxon/src/luxon"
import {
  type Post,
  today,
  thisWeek,
  thisMonth,
  type TimelinePost,
} from "@/posts"
import type { Period } from "@/types/constants.type"

interface PostsState {
  ids: string[]
  all: Map<string, Post>
  selectedPeriod: Period
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period
    },
  },
  getters: {
    filterPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id)
          if (!post) {
            throw new Error(`Post ${id} not found`)
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          }
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 })
          }
          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 })
          }
          return post
        })
    },
  },
})

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
