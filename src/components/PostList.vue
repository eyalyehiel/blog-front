<template>
    <section class="post-list">
        <PostPreview @likePost="likePost" :post="post" v-for="post in posts" :key="post.id"/>
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
        const likePost = (id) =>{
            context.emit('likePost',id)
        }
        return { posts,likePost }
    },
    components: { PostPreview },
}
</script>

<style lang="scss" scoped></style>
