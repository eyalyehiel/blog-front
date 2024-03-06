<template>
    <header :class="{ scrolled: isScrolled }">
        <section>
            <h1 @click="refresh">Blog<span>O</span>n</h1>
            <button
                @click="router.push('/connect')"
                class="connect-btn"
                v-if="!user"
            >
                Connect
            </button>
            <span v-else class="menu">
                <img @click="toggleMenu" :src="user?.imgUrl" alt="" />
                <ul v-outside="toggleMenu" @click="toggleMenu" v-if="menuOpen">
                    <li><router-link to="/profile">Profile</router-link></li>
                    <li><router-link to="/edit">Add post</router-link></li>
                    <li @click="toggleTheme">
                        <span>Toggle theme</span>
                    </li>
                    <li class="hr" @click="logout"><span>Logout</span></li>
                </ul>
            </span>
        </section>
    </header>
</template>

<script>
import { onMounted, ref } from "vue"
import { userService } from "@/services/user-service.js"
import {
    eventBus,
    showErrorMsg,
    showSuccessMsg,
} from "@/services/event-bus.service"
import { useRouter } from "vue-router"
export default {
    setup(props, context) {
        const menuOpen = ref(false)
        const isScrolled = ref(false)
        const user = ref(null)
        const router = useRouter()
        
        onMounted(() => {
            user.value = userService.getLoggedinUser()
            eventBus.on("updateHeader", () => {
                user.value = userService.getLoggedinUser()
            })
        })
        const toggleMenu = () => {
            menuOpen.value = !menuOpen.value
        }
        const logout = async () => {
            try {
                await userService.logout()
                user.value = null

                showSuccessMsg("You are logged out")
                refresh()
            } catch (err) {
                showErrorMsg(err)
            }
        }

        const refresh = () => {
            router.push("/")
            // window.location.reload()
        }

        const toggleTheme = async () => {
            context.emit("toggleTheme")
        }

        return {
            toggleMenu,
            menuOpen,
            isScrolled,
            user,
            logout,
            refresh,
            router,
            toggleTheme,
            
        }
    },
}
</script>

<style lang="scss" scoped></style>
