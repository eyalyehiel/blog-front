<template>
    <form class="edit-post">
        <section class="wrapper">
            <div class="image-upload">
                <input type="file" name="" id="uploader" />
                <span @click="browseFiles">Add a cover image</span>
            </div>
            <input
                autocomplete="off"
                placeholder="Enter Title here"
                required
                type="text"
                name="title"
                v-model="title"
            />
            <section class="mini-wrapper">
                <PostTags :tags="tags" class="edit" />
                <input
                    autocomplete="off"
                    :required="tags.length < 0"
                    placeholder="add tag..."
                    type="text"
                    name="tags"
                    v-model="tag"
                    @keydown.enter.prevent="addTag"
                />
            </section>
            <BodyOptions
            />
            <textarea
                autocomplete="off"
                id="textarea"
                ref="textarea"
                name="body"
                placeholder="Write your post content here..."
                required
                v-model="body"
            ></textarea>
        </section>
        <section class="btns">
            <button class="publish" @click.prevent="addPost(false)">
                Publish
            </button>
            <button class="save" @click.prevent="addPost(true)">
                Save draft
            </button>
        </section>
    </form>
</template>

<script>
import { ref, nextTick, onMounted } from "vue"
import { postService } from "@/services/post-service.js"
import PostTags from "@/components/PostTags.vue"
import BodyOptions from "@/components/BodyOptions.vue"
import { showErrorMsg, showSuccessMsg } from "@/services/event-bus.service.js"
import { userService } from "@/services/user-service"
import { useRoute } from "vue-router"
export default {
    setup() {
        const textarea = ref("")
        const title = ref("")
        const body = ref("")
        const tags = ref([])
        const tag = ref("")
        const enterPositions = ref([])
        const uploader = ref("")
        const route = useRoute()
        onMounted(async () => {
            try {
                if (route.params.id) {
                    const post = await postService.getById(route.params.id)
                    title.value = post.title
                    body.value = post.body
                    tags.value = post.tags
                }
            } catch (err) {
                console.log("failed to get post in edit post")
            }
        })
        // const addItalic = async () => {
        //     body.value =
        //         body.value.slice(0, textarea.value.selectionStart) +
        //         "__" +
        //         body.value.slice(textarea.value.selectionStart)
        //     await nextTick()
        //     textarea.value.focus()
        //     let pos = body.value.indexOf("__")
        //     textarea.value.selectionEnd = pos + 1
        // }
        // const addCode = async () => {
        //     body.value =
        //         body.value.slice(0, textarea.value.selectionStart) +
        //         "``" +
        //         body.value.slice(textarea.value.selectionStart)
        //     await nextTick()
        //     textarea.value.focus()
        //     let pos = body.value.indexOf("``")
        //     textarea.value.selectionEnd = pos + 1
        // }
        // const addBold = async () => {
        //     body.value =
        //         body.value.slice(0, textarea.value.selectionStart) +
        //         "****" +
        //         body.value.slice(textarea.value.selectionStart)
        //     await nextTick()
        //     textarea.value.focus()
        //     let pos = body.value.indexOf("****")
        //     textarea.value.selectionEnd = pos + 2
        // }
        // const addUrl = async () => {
        //     body.value =
        //         body.value.slice(0, textarea.value.selectionStart) +
        //         "[](url)" +
        //         body.value.slice(textarea.value.selectionStart)
        //     await nextTick()
        //     textarea.value.focus()
        //     let pos = body.value.indexOf("(url)")
        //     textarea.value.setSelectionRange(pos + 1, pos + 4)
        // }
        // const addHeading = async () => {
        //     textarea.value.selectionStart = body.value.length
        //     addEnter()
        //     addEnter()
        //     body.value += "\n\n##\t\n\n"
        //     await nextTick()
        //     textarea.value.focus()
        //     let pos = body.value.indexOf("##")
        //     textarea.value.selectionEnd = pos + 3
        // }
        // const addQuote = async () => {
        //     textarea.value.selectionStart = body.value.length
        //     addEnter()
        //     addEnter()
        //     body.value += "\n\n-\t\n\n"
        //     await nextTick()
        //     textarea.value.focus()
        //     let pos = body.value.indexOf(">")
        //     textarea.value.selectionEnd = pos + 1
        // }
        // const addEnter = () => {
        //     let pos = textarea.value.selectionStart
        //     enterPositions.value.push(pos)
        // }
        // const addEnters = () => {
        //     let bodyToEdit = body.value.split("")
        //     let enterCount = 0
        //     enterPositions.value.forEach((enter) => {
        //         enterCount++
        //         bodyToEdit.splice(enter + enterCount, 0, "<br/>")
        //     })
        //     body.value = bodyToEdit.join("")
        // }
        const browseFiles = () => {
            document.getElementById("uploader").click()
        }
        const addTag = () => {
            if (!tags.value.includes(tag.value)) {
                tags.value.push(tag.value)
            }
            tag.value = ""
        }
        const addPost = async (toDraft) => {
            // addEnters()
            let userPosted = userService.getLoggedinUser()
            const post = {
                title: title.value,
                body: body.value,
                tags: tags.value,
                author: {
                    _id: userPosted._id,
                    username: userPosted.username,
                    imgUrl: userPosted.imgUrl,
                },
                isDraft: toDraft,
            }
            if (route.params.id) post._id = route.params.id
            try {
                if (!title.value)
                    throw new Error("Please make sure you add title")
                if (!body.value)
                    throw new Error("Please make sure you add body")
                if (!tags.value.length)
                    throw new Error("Please make sure you add at least one tag")
                const savedPost = await postService.save(post)
                const miniPost = {
                    _id: savedPost._id,
                    title: savedPost.title,
                    comments: savedPost.comments || [],
                    userLiked: savedPost.userLiked || [],
                    isDraft: savedPost.isDraft,
                    author: { _id: savedPost.author._id },
                }
                await userService.saveToUserPosts(miniPost)
                showSuccessMsg("Post Added!")
            } catch (err) {
                showErrorMsg(err)
                console.log(err)
            }
        }
        return {
            title,
            body,
            tags,
            tag,
            addTag,
            addPost,
            uploader,
            browseFiles,
            // addBold,
            textarea,
            // addItalic,
            // addUrl,
            // addEnter,
            // addHeading,
            // addQuote,
            // addCode,
        }
    },
    components: { PostTags, BodyOptions },
}
</script>

<style lang="scss" scoped></style>
