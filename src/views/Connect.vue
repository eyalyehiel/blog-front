<template>
    <main class="connect" :class="{ log: isLogin, sign: !isLogin }">
        <form class="login">
            <div class="wrapper">
                <h2>Login</h2>
                <input
                v-model="username"
                    autocomplete="off"
                    required
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    
                />
                <input
                v-model="password"
                    autocomplete="off"
                    required
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    
                />
                <button @click.prevent="login">Login</button>
            </div>
            <section
                @click="isLogin = !isLogin"
                v-if="!isLogin"
                class="dark"
            ></section>
        </form>
        <span class="switch">
            <button @click="isLogin = !isLogin">
                {{ isLogin ? "Signup" : "Login" }}
            </button>
        </span>
        <form class="signup">
            <div class="wrapper">
                <h2>Signup</h2>
                <input
                    autocomplete="off"
                    v-model="username"
                    required
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    
                />
                <input
                    autocomplete="off"
                    v-model="email"
                    required
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    id="email"
                />
                <input
                    autocomplete="off"
                    v-model="password"
                    required
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    
                />
                <button @click.prevent="signup">Signup</button>
            </div>
            <section
                @click="isLogin = !isLogin"
                v-if="isLogin"
                class="dark"
            ></section>
        </form>
    </main>
</template>

<script>
import { computed, ref } from "vue"
import { userService } from "../services/user-service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "@/services/event-bus.service"
import { useRouter } from "vue-router"

export default {
    setup() {
        const isLogin = ref(true)
        const username = ref("")
        const email = ref("")
        const password = ref("")
        const router =useRouter()

        const signup = async () => {
            const userToSign = {
                username: username.value,
                email: email.value,
                password: username.value,
                imgUrl: "",
            }
            try {
                await userService.signup(userToSign)
                eventBus.emit('updateHeader')
                showSuccessMsg(`Welcome ${userToSign.username}`)
                router.push('/')
            } catch (err) {
                console.log("err", err)
            }
        }

        const login = async () =>{
            const userToLogin = {
                username: username.value,
                password: password.value
            }
            try{
                // console.log(userToLogin);
                let loggedUser = await userService.login(userToLogin)
                showSuccessMsg(`Welcome ${loggedUser.username}`)
                eventBus.emit('updateHeader')
                router.push('/')
            }catch(err){
                showErrorMsg(err)
            }
        }
        return { isLogin, username, password, email, signup,login }
    },
}
</script>

<style lang="scss" scoped></style>
