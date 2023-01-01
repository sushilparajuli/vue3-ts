import { routes } from "@/router";
import { mount } from "@vue/test-utils";
import { createPinia } from "pinia";
import { describe, it } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import NavBar from "./NavBar.vue";

describe("Navbar", () => {
  it("renders", () => {
    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);
    const pinia = createPinia();
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    mount(NavBar, {
      global: {
        plugins: [router, pinia],
      }
    });
  });
});
