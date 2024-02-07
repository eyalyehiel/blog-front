<template>
    <main v-if="user" class="profile">
        <section class="profile-header">
            <img :src="user.imgUrl" alt="" />
            <h2>{{ user.username }}</h2>
            <p>Joined on {{ computedDate }}</p>
        </section>
        <section class="wrapper">
            <section class="profile-stats">
                <div class="post-count">
                    <span> {{ user.posts.length }} </span>
                    <span> posts published</span>
                </div>
                <div class="comments written">
                    <span>{{ sumComments }}</span>
                    <span> comments written</span>
                </div>
                <div class="likes on posts">
                    <span>{{ sumLikes }}</span>
                    <span> likes on posts</span>
                </div>
            </section>
            <section class="posts-dashboard">
                <section class="dashboard-header">
                    <h2>Posts</h2>
                    <select v-model="isDraft">
                        <option value="null" selected>All</option>
                        <option value="true">Draft</option>
                        <option value="false">Published</option>
                    </select>
                </section>
                <section class="dashboard-list">
                    <PostDisplay
                        @remove="removePost"
                        :post="post"
                        v-for="post in postsToShow"
                        :key="post._id"
                    />
                </section>
            </section>
        </section>
    </main>
</template>

<script>
import PostDisplay from "@/components/PostDisplay.vue"
import { showSuccessMsg } from "@/services/event-bus.service"
import { postService } from "@/services/post-service"
import { userService } from "@/services/user-service"
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
export default {
    setup() {
        const user = ref(null)
        const router = useRouter()
        const isDraft = ref(null)
        onMounted(() => {
            user.value = userService.getLoggedinUser()
            // console.log(user.value)
            if (!user.value) router.push("/")
        })
        const computedDate = computed(() => {
            const date = new Date(user.value.createdAt) // Assuming the date is in YYYY-MM-DD format
            const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })

            // console.log(formattedDate) // Output: Jan 15, 2024
            return formattedDate
        })
        const postsToShow = computed(() => {
            return user.value.posts.filter((post) => {
                if (isDraft.value === "null") {
                    return true
                } else if (isDraft.value === "true") {
                    return post.isDraft === true
                } else return post.isDraft === false
            })
        })
        const sumComments = computed(() => {
            let sum = 0
            user.value.posts.forEach((post) => (sum += post.comments.length))
            return sum
        })
        const sumLikes = computed(() => {
            let sum = 0
            user.value.posts.forEach((post) => (sum += post.userLiked.length))
            return sum
        })
        const removePost = async (id) => {
            try {
                await postService.remove(id)
                await userService.removeFromUserPosts(id)
                user.value = userService.getLoggedinUser()
                showSuccessMsg("Post removed")
            } catch (err) {
                console.log(err)
            }
        }
        return { user, sumComments, sumLikes, isDraft, postsToShow, removePost,computedDate }
    },
    components: { PostDisplay },
}
</script>

<style lang="scss" scoped></style>
