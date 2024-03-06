<template>
    <main class="post-details" v-if="post">
        <section class="post-display">
            <img v-if="post.imgUrl" :src="post.imgUrl" alt="" />
            <div class="wrapper">
                <h2>{{ post.title }}</h2>
                <PostTags class="preview" :tags="post.tags" />
                <p v-html="editedBody"></p>
            </div>
            <div ref="comments" id="comments" class="add-comment">
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
        <section class="post-options">
            <section class="post-author">
                <div class="info">
                    <img :src="post.author.imgUrl" alt="" />
                    <span>{{ post.author.username }}</span>
                </div>
                <div class="joined">
                    <span>JOINED</span>
                    <span>Nov 9</span>
                </div>
            </section>
            <section class="options-wrapper">
                <a href="#comments">
                    <button>Add comment</button>
                </a>
                <button class="like-post">Like</button>
            </section>
        </section>
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
        const route = useRoute()
        const params = route.params
        const post = ref(null)
        const rows = ref(2)
        const user = ref(null)
        const body = ref("")
        const textarea = ref(null)
        const height = ref(64)
        const comments = ref(null)
        onMounted(async () => {
            post.value = await postService.getById(params.id)
            console.log(post.value)
            user.value = userService.getLoggedinUser()
            if (route.hash === "#comments") {
                await nextTick()
                comments.value.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                })
            }
        })

        const editedBody = computed(() => {
            return postService.manageBody(post.value.body)
        })
        const addComment = async () => {
            try {
                await postService.addComment(post.value, body.value)
                post.value = await postService.getById(params.id)
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
            comments,
        }
    },
    components: { PostTags, CommentPreview },
}
</script>

<style lang="scss" scoped></style>
