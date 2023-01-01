import { routes } from "@/router";
import { useUsers } from "@/stores/users";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { createMemoryHistory, createRouter, type Router } from "vue-router";
import PostWriter from "./PostWriter.vue";

describe("PostWriter", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    const user = useUsers();
    user.currentUserId = "1";
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  it("writes post with markdown", () => {
    return new Promise<void>(async (resolve) => {
      const wrapper = mount(PostWriter, {
        global: {
          plugins: [router, pinia],
        },
        props: {
          post: {
            id: "1",
            title: "Testing",
            authorId: "1",
            created: "",
            markdown: "Testing",
            html: "",
          },
        },
      });

      wrapper.find<HTMLDivElement>(
        '[data-test-id="content-editable"]'
      ).element.innerText = "# Title";
      await wrapper
        .find<HTMLDivElement>('[data-test-id="content-editable"]')
        .trigger("input");

      setTimeout(async () => {
        await wrapper.find('[data-test-id="submit"]').trigger("click");
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "authorId": "1",
              "created": "",
              "html": "<h1 id=\\"title\\">Title</h1>
          ",
              "id": "1",
              "markdown": "# Title",
              "title": "Testing",
            },
          ]
        `);
        console.log(wrapper.html());
        resolve();
      }, 300);
    });
  });
});
