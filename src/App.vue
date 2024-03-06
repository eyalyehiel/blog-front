<script>
import { RouterLink, RouterView } from "vue-router"
import AppHeader from "./components/AppHeader.vue"
import { onMounted, ref } from "vue"
import UserMsg from "./components/UserMsg.vue"
import {utilService} from "./services/util.service.js"
import { userService } from "./services/user-service"
export default {
    components: {
        AppHeader,
        UserMsg,
    },
    setup(props) {
        onMounted(() => {
            utilService.toggleTheme()
        })
        const toggleTheme = async () =>{
            const {theme} = await userService.toggleUserTheme()
            utilService.toggleTheme(theme)
        }
        return { toggleTheme }
    },
}
</script>

<template>
    <main class="container">
        <AppHeader @toggleTheme="toggleTheme"/>
        <RouterView />
    </main>
    <UserMsg/>
</template>
