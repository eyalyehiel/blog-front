<script>
import { RouterLink, RouterView } from "vue-router"
import AppHeader from "./components/AppHeader.vue"
import { ref } from "vue"
import UserMsg from "./components/UserMsg.vue"

export default {
    components: {
        AppHeader,
        UserMsg,
    },
    setup(props) {

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
