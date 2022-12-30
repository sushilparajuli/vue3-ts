import { createApp } from "vue"
import App from "@/App.vue"
import { createPinia } from "pinia"
import { router } from "@/router"

// eslint-disable-next-line prettier/prettier
createApp(App)
.use(createPinia())
.use(router)
.mount("#app")
