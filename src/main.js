import "./assets/_main.scss"
import { clickOutsideDirective } from "./directives"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

const app = createApp(App)
app.directive("outside", clickOutsideDirective)

app.use(router)

app.mount("#app")
