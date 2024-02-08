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
                            ref="textarea"
                            placeholder="Add to the discussion"
                            v-outside="setRows"
                            :style="{ height: height + 'px' }"
                            v-model="body"
                        ></textarea>

                        <button @click.prevent="addComment">Submit</button>
                    </div>
                </form>
                <section v-if="post.comments.length" class="comments-list">
                    <CommentPreview
                        v-for="comment in post.comments"
                        :key="comment._id"
                        :comment="comment"
                    />
                </section>
            </div>
        </section>
        <section class="post-author"></section>
    </main>
</template>

<script>
import { onMounted, ref, computed, nextTick } from "vue"
import { useRoute } from "vue-router"
import { postService } from "@/services/post-service.js"
import PostTags from "@/components/PostTags.vue"
import { userService } from "@/services/user-service"
import CommentPreview from "../components/CommentPreview.vue"
export default {
    setup() {
        const { id } = useRoute().params
        const post = ref(null)
        const rows = ref(2)
        const user = ref(null)
        const body = ref("")
        const textarea = ref(null)
        const height = ref(64)
        onMounted(async () => {
            post.value = await postService.getById(id)
            user.value = userService.getLoggedinUser()
        })

        const editedBody = computed(() => {
            return postService.manageBody(post.value.body)
        })
        const addComment = async () => {
            try {
                await postService.addComment(post.value, body.value)
                post.value = await postService.getById(id)
                body.value = ""
            } catch (err) {
                console.log(err)
            }
        }
        const setRows = (r) => {
            const computedStyle = window.getComputedStyle(textarea.value)
            const lineHeight = parseInt(
                computedStyle.getPropertyValue("line-height")
            )
            height.value = r * lineHeight + 20
        }
        return {
            post,
            editedBody,
            rows,
            addComment,
            setRows,
            user,
            body,
            textarea,
            height,
        }
    },
    components: { PostTags, CommentPreview },
}
</script>

<style lang="scss" scoped></style>
