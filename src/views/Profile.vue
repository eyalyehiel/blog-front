<template>
    <main v-if="user" class="profile">
        <section class="profile-header">
            <img :src="user.imgUrl" alt="" />
            <h2>{{ user.username }}</h2>
            <p>{{ user.createdAt }}</p>
        </section>
        <section class="wrapper">
            <section class="profile-stats">
                <div class="post-count">
                    <span>0</span>
                    <span>posts published</span>
                </div>
                <div class="comments written">
                    <span>0</span>
                    <span>comments written</span>
                </div>
                <div class="likes on posts">
                    <span>0</span>
                    <span>likes on posts</span>
                </div>
            </section>
            <section class="posts-dashboard">
                <section class="dashboard-header">
                    <h2>Posts</h2>
                    <select>
                        <option value="">All</option>
                        <option value="">Draft</option>
                        <option value="">Published</option>
                    </select>
                </section>
                <section class="dashboard-list">
                    <PostDisplay v-for="i in 3" :key="i" />
                </section>
            </section>
        </section>
    </main>
</template>

<script>
import PostDisplay from "@/components/PostDisplay.vue"
import { userService } from "@/services/user-service"
import { onMounted, ref } from "vue"

export default {
    setup() {
        const user = ref(null)
        onMounted(() => {
            user.value = userService.getLoggedinUser()
        })
        return { user }
    },
    components: { PostDisplay },
}
</script>

<style lang="scss" scoped></style>
