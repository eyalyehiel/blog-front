<template>
    <section class="post-preview">
        <img
            v-if="post.imgUrl"
            @click="router.push(`/post/${post._id}`)"
            :src="post.imgUrl"
            alt=""
        />
        <section class="wrapper">
            <section class="post-author">
                <img
                    alt="../assets/images/jungle.jpg"
                    :src="post.author?.imgUrl"
                />
                <section class="mini-wrapper">
                    <span class="username"> {{ post.author?.username }}</span>
                    <span class="date-posted">{{ formattedDate }}</span>
                </section>
            </section>
            <div class="mini-wrapper">
                <router-link :to="'/post/' + post._id" class="post-title">{{
                    post.title
                }}</router-link>
                <PostTags :tags="tagsToShow" class="preview" />
            </div>
            <section class="post-stats">
                <span>{{ post.comments.length }} comments</span>
                <span @click="toggleLike">{{ post.userLiked.length }} likes</span>
            </section>
        </section>
    </section>
</template>

<script>
import { computed, toRefs } from "vue"
import PostTags from "./PostTags.vue"
import { useRouter } from "vue-router"
export default {
    props: {
        post: Object,
    },
    components: {
        PostTags,
    },
    setup(props, context) {
        const router = useRouter()
        const { post } = toRefs(props)
        const tagsToShow = computed(() => {
            return post.value.tags.slice(0, 3)
        })

        const formattedDate = computed(() => {
            const date = new Date(post.value.createdAt)
            const options = { month: "short", day: "numeric" }
            return new Intl.DateTimeFormat("en-US", options).format(date)
        })
        const toggleLike = () => {
            context.emit("toggleLike", post.value._id)
        }
        return { post, tagsToShow, formattedDate, toggleLike, router }
    },
}
</script>

<style lang="scss" scoped></style>
