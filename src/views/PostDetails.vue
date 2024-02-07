<template>
    <main class="post-details" v-if="post">
        <section class="post-display">
            <img v-if="post.imgUrl" :src="post.imgUrl" alt="" />
            <div class="wrapper">
                <h2>{{ post.title }}</h2>
                <PostTags class="preview" :tags="post.tags" />
                <p v-html="editedBody"></p>
            </div>
            <div class="add-comment">
                <h2>Comments</h2>
                <form>
                    <img :src="user.imgUrl" alt="" />
                    <div class="mini-wrapper">
                        <textarea
                            placeholder="Add to the discussion"
                            @blur="setRows(2)"
                            @focus="setRows(4)"
                            :rows="rows"
                        ></textarea>
                        <button>Submit</button>
                    </div>
                </form>
                <section class="comments-list">
                    <CommentPreview v-for="i in 3" :key="i"/>
                </section>
            </div>
        </section>
        <section class="post-author"></section>
    </main>
</template>

<script>
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
import { postService } from "@/services/post-service.js"
import PostTags from "@/components/PostTags.vue"
import { userService } from "@/services/user-service"
import CommentPreview from '../components/CommentPreview.vue'
export default {
    setup() {
        const { id } = useRoute().params
        const post = ref(null)
        const rows = ref(2)
        const user = ref(null)
        onMounted(async () => {
            post.value = await postService.getById(id)
            user.value = userService.getLoggedinUser()
        })

        const editedBody = computed(() => {
            return postService.manageBody(post.value.body)
        })
        const setRows = (r) => {
            rows.value = r
        }
        return { post, editedBody, rows, setRows, user }
    },
    components: { PostTags,CommentPreview },
}
</script>

<style lang="scss" scoped></style>
