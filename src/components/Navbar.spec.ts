import { routes } from "@/router";
import { useUsers } from "@/stores/users";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import NavBar from "./NavBar.vue";

// mocking fetch same like jest.mock
vi.stubGlobal(
  "fetch",
  vi.fn(() => {})
);
describe("Navbar", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    const el = document.createElement("div");
    el.id = "modal";
    document.body.appendChild(el);
    pinia = createPinia();
    setActivePinia(pinia);
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  it("signin/signup cta buttons when not auth", () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia],
      },
    });

    expect(wrapper.find('[data-test="sign-up"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="sign-in"]').exists()).toBe(true);
  });

  it("renders new post/logout cta buttons when not auth", async () => {
    const users = useUsers();
    users.currentUserId = "1";
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router, pinia],
      },
    });

    expect(wrapper.find("a").text()).toBe("New Post");
    expect(wrapper.find("button").text()).toBe("Log Out");
    await wrapper.find('[data-test="logout"]').trigger("click");
    expect(wrapper.find('[data-test="sign-up"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="sign-in"]').exists()).toBe(true);
  });
});
