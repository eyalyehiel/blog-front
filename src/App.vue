<script>
import { RouterLink, RouterView } from "vue-router"
import AppHeader from "./components/AppHeader.vue"
import { onMounted, ref } from "vue"
import UserMsg from "./components/UserMsg.vue"
import {utilService} from "./services/util.service.js"
export default {
    components: {
        AppHeader,
        UserMsg,
    },
    setup(props) {
        onMounted(() => {
            utilService.setStyleMode()
        })
        return {  }
    },
}
</script>

<template>
    <main class="container">
        <AppHeader />
        <RouterView />
    </main>
    <UserMsg/>
</template>
