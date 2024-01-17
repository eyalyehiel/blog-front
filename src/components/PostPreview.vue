<template>
    <section class="post-preview">
        <img v-if="post.imgUrl" :src="post.imgUrl" alt="" />
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
            <router-link :to="'/post/' + post._id" class="post-title">{{
                post.title
            }}</router-link>
            <PostTags :tags="tagsToShow" />
            <section class="post-stats">
                <span>{{ post.comments.length }} comments</span>
                <span>{{ post.likes }} likes</span>
            </section>
        </section>
    </section>
</template>

<script>
import { computed, toRefs } from "vue"
import PostTags from "./PostTags.vue"
export default {
    props: {
        post: Object,
    },
    components: {
        PostTags,
    },
    setup(props) {
        const { post } = toRefs(props)
        const tagsToShow = computed(() => {
            return post.value.tags.slice(0, 3)
        })

        const formattedDate = computed(() => {
            const date = new Date(post.value.createdAt)
            const options = { month: "short", day: "numeric" }
            return new Intl.DateTimeFormat("en-US", options).format(date)
        })
        return { post, tagsToShow, formattedDate }
    },
}
</script>

<style lang="scss" scoped></style>
