import { routes } from "@/router";
import { useUsers } from "@/stores/users";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, it, expect } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import NavBar from "./NavBar.vue";

describe("Navbar", () => {
  it("signin/signup cta buttons when not auth", () => {
    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);
    const pinia = createPinia();
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia],
      },
    });

    expect(wrapper.find('[data-test="sign-up"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="sign-in"]').exists()).toBe(true);
  });

  it("renders new post/logout cta buttons when not auth", () => {
    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);
    const pinia = createPinia();
    setActivePinia(pinia);
    const users = useUsers();
    users.currentUserId = "1";
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia],
      },
    });

    console.log(wrapper.html());
    expect(wrapper.find("a").text()).toBe("New Post");
    expect(wrapper.find("button").text()).toBe("Log Out");
  });
});
