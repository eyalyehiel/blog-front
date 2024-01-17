<template>
    <section class="post-list">
        <PostPreview :post="post" v-for="post in posts" :key="post.id"/>
    </section>
</template>

<script>
import { toRefs } from "vue"
import PostPreview from "./PostPreview.vue"

export default {
    props:{
        posts: Array
    },
    setup(props) {
        const { posts } = toRefs(props)

        return { posts }
    },
    components: { PostPreview },
}
</script>

<style lang="scss" scoped></style>
