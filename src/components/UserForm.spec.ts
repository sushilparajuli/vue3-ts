import { routes } from "@/router";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import UserForm from "./UserForm.vue";

describe("UserForm", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  it("runs through the worflow", async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [router, pinia],
      },
    });

    expect(wrapper.find("button").element.disabled).toBe(true);
    expect(
      wrapper.find('[data-test-id="username"]').find(".is-danger").text()
    ).toBe("This field is required.");
    expect(
      wrapper.find('[data-test-id="password"]').find(".is-danger").text()
    ).toBe("This field is required.");
    await wrapper.find("#Username").setValue("user");
    await wrapper.find("#Password").setValue("passw");
    expect(
      wrapper.find('[data-test-id="username"]').find(".is-danger").text()
    ).toBe("This field is must be between 5 and 10");
    expect(
      wrapper.find('[data-test-id="password"]').find(".is-danger").text()
    ).toBe("This field is must be between 8 and 20");

    await wrapper.find("#Username").setValue("username");
    await wrapper.find("#Password").setValue("password");
    expect(
      wrapper.find('[data-test-id="username"]').find(".is-danger").exists()
    ).toBe(false);
    expect(
      wrapper.find('[data-test-id="password"]').find(".is-danger").exists()
    ).toBe(false);

    expect(wrapper.find("button").element.disabled).toBe(false);
    await wrapper.find("form").trigger("submit.prevent");
    expect(wrapper.emitted().submit[0]).toEqual([
      {
        username: "username",
        password: "password",
      },
    ]);
  });
});
