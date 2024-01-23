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
                    <span> {{ user.posts.length }} </span>
                    <span> posts published</span>
                </div>
                <div class="comments written">
                    <span>{{sumComments}}</span>
                    <span> comments written</span>
                </div>
                <div class="likes on posts">
                    <span>{{sumLikes}}</span>
                    <span> likes on posts</span>
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
                    <PostDisplay :post="post" v-for="post in user.posts" :key="post._id" />
                </section>
            </section>
        </section>
    </main>
</template>

<script>
import PostDisplay from "@/components/PostDisplay.vue"
import { userService } from "@/services/user-service"
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
export default {
    setup() {
        const user = ref(null)
        const router = useRouter()
        onMounted(() => {
            user.value = userService.getLoggedinUser()
            if(!user.value) router.push('/')
            console.log(user.value);
        })
        const sumComments = computed(()=>{
            let sum = 0
            user.value.posts.forEach(post => sum += post.comments.length)
            return sum
        })
        const sumLikes = computed(()=>{
            let sum = 0
            user.value.posts.forEach(post => sum += post.userLiked.length)
            return sum
        })
        return { user,sumComments ,sumLikes}
    },
    components: { PostDisplay },
}
</script>

<style lang="scss" scoped></style>
