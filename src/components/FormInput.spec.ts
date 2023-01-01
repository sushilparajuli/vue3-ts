import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FormInput from "@/components/FormInput.vue";
import { computed, defineComponent, ref } from "vue";

describe("FormInput", () => {
  it("test full validations logic", async () => {
    const Parent = defineComponent({
      components: { FormInput },
      template: `
      <FormInput
        name="name"
        type="text"
        :status="status"
        v-model="formValue"
        />
      `,
      setup() {
        const formValue = ref("foo");
        const status = computed(() => {
          if (formValue.value.length > 5) {
            return {
              valid: true,
            };
          } else {
            return {
              valid: false,
              message: "error",
            };
          }
        });
        return {
          formValue,
          status,
        };
      },
    });
    const wrapper = mount(Parent);
    expect(wrapper.find(".is-danger").text()).toBe("error");
    await wrapper.find("input").setValue("foobar");
    expect(wrapper.find(".is-danger").exists()).toBe(false);
  });

  it("render some error messages", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "name",
        status: {
          valid: false,
          message: "Error message here",
        },
        type: "text",
      },
    });
    expect(wrapper.find("p.is-danger").exists()).toBe(true);
  });
  it("render no error messages", () => {
    const wrapper = mount(FormInput, {
      props: {
        name: "foo",
        modelValue: "name",
        status: {
          valid: true,
          message: "Error message here",
        },
        type: "text",
      },
    });
    expect(wrapper.find("p.is-danger").exists()).toBe(false);
  });
});
