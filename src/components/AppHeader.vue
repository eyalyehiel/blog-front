<template>
    <header :class="{ scrolled: isScrolled }">
        <section>
            <h1>Blog<span>O</span>n</h1>

            <ul @click="toggleMenu" v-if="menuOpen">
                <li>
                    <router-link to="/"> <homeIcon /> Home</router-link>
                </li>
                <li>
                    <router-link to="/edit"> <addIcon /> Add</router-link>
                </li>
                <li>
                    <router-link v-if="!user" to="/connect">
                        <connectIcon /> Connect</router-link
                    >
                    <router-link v-else to="/profile">
                        <profileIcon />
                        {{ user.username }}
                    </router-link>
                </li>
                <li v-if="user">
                    <a @click="logout"> Logout</a>
                </li>
            </ul>
            <button @click="toggleMenu">
                <menuIcon />
            </button>
        </section>
    </header>
</template>

<script>
import { onMounted, ref } from "vue"
import menuIcon from "../assets/svgs/menu.vue"
import homeIcon from "../assets/svgs/home.vue"
import addIcon from "../assets/svgs/add.vue"
import connectIcon from "../assets/svgs/connect.vue"
import profileIcon from "../assets/svgs/profile.vue"
import { userService } from "@/services/user-service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "@/services/event-bus.service"
export default {
    components: {
        menuIcon,
        homeIcon,
        addIcon,
        connectIcon,
        profileIcon,
    },
    setup() {
        const menuOpen = ref(false)
        const isScrolled = ref(false)
        const user = ref(null)
        onMounted(() => {
            if (window.innerWidth > 480) menuOpen.value = true
            window.addEventListener("scroll", () => {
                isScrolled.value = window.scrollY > 0
            })
            user.value = userService.getLoggedinUser()
            eventBus.on('updateHeader', () => {
                user.value = userService.getLoggedinUser()
            })
        })
        const toggleMenu = () => {
            if (window.innerWidth > 480) {
                menuOpen.value = true
                return
            }
            menuOpen.value = !menuOpen.value
        }
        const logout = async () => {
            try {
                await userService.logout()
                user.value = null
                
                showSuccessMsg('You are logged out')
            } catch (err) {
                showErrorMsg(err)
            }
        }

        return { toggleMenu, menuOpen, isScrolled, user, logout }
    },
}
</script>

<style lang="scss" scoped></style>
