<template>
    <section class="post-list">
        <PostPreview @toggleLike="toggleLike" :post="post" v-for="post in posts" :key="post.id"/>
    </section>
</template>

<script>
import { toRefs } from "vue"
import PostPreview from "./PostPreview.vue"

export default {
    props:{
        posts: Array
    },
    setup(props,context) {
        const { posts } = toRefs(props)
        const toggleLike = (id) =>{
            context.emit('toggleLike',id)
        }
        return { posts,toggleLike }
    },
    components: { PostPreview },
}
</script>

<style lang="scss" scoped></style>
