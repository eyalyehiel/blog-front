<template>
    <main class="home">
        <PostList v-if="posts.length" :posts="posts" />
        <section v-else class="post-list">
            <section v-for="i in 4" :key="i" class="skeleton-8qepc0ou7sv"></section>
        </section>
        <PostFilter @filter="setFilter" :tags="postTags" />
    </main>
</template>

<script>
import { onMounted, ref } from "vue"
import { postService } from "../services/post-service.js"
import PostList from "@/components/PostList.vue"
import PostFilter from "@/components/PostFilter.vue"

export default {
    setup() {
        const postTags = ref([])
        const posts = ref([])
        const filterBy = ref({
            tag: "",
            order: "likes",
        })

        onMounted(async () => {
            try {
                await loadPosts()
                loadTags()
            } catch (err) {
                console.log("error", err)
            }
        })
        const loadPosts = async () => {
            const res = await postService.query(filterBy.value)
            posts.value = res.posts
        }
        const loadTags = () => {
            posts.value.forEach((post) => {
                post.tags.forEach((tag) => {
                    if (!postTags.value.includes(tag)) postTags.value.push(tag)
                })
            })
        }
        const setFilter = async (newFilter) => {
            filterBy.value = newFilter
            await loadPosts()
        }

        return { posts, postTags, setFilter }
    },
    components: { PostList, PostFilter },
}
</script>

<style lang="scss" scoped></style>
