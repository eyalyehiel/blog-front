<template>
    <form class="edit-post">
        <section class="wrapper">
            <div class="image-upload">
                <input @change="handleFile" type="file" name="" id="uploader" />
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
                @addItalic="addItalic"
                @addBold="addBold"
                @addQuote="addQuote"
                @addUrl="addUrl"
                @addCode="addCode"
                @addHeading="addHeading"
                @addImage="addImage"
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
                {{ route.params.id ? "Update" : "Publish" }}
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
import { uploadImg } from "../services/upload-service.js"
export default {
    setup() {
        const textarea = ref("")
        const title = ref("")
        const body = ref("")
        const tags = ref([])
        const tag = ref("")
        const imgUrl = ref("")
        const isLoading = ref(false)
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
        const handleFile = async (ev) => {
            let file
            file = ev.target.files[0]

            isLoading.value = true
            imgUrl.value = await uploadImg(file)
            console.log(imgUrl.value.url)
            isLoading.value = false
        }
        const addItalic = async () => {
            body.value =
                body.value.slice(0, textarea.value.selectionStart) +
                "__" +
                body.value.slice(textarea.value.selectionStart)
            await nextTick()
            textarea.value.focus()
            let pos = body.value.indexOf("__")
            textarea.value.selectionEnd = pos + 1
        }
        const addCode = async () => {
            body.value =
                body.value.slice(0, textarea.value.selectionStart) +
                "``" +
                body.value.slice(textarea.value.selectionStart)
            await nextTick()
            textarea.value.focus()
            let pos = body.value.indexOf("``")
            textarea.value.selectionEnd = pos + 1
        }
        const addBold = async () => {
            body.value =
                body.value.slice(0, textarea.value.selectionStart) +
                "****" +
                body.value.slice(textarea.value.selectionStart)
            await nextTick()
            textarea.value.focus()
            let pos = body.value.indexOf("****")
            textarea.value.selectionEnd = pos + 2
        }
        const addUrl = async () => {
            body.value =
                body.value.slice(0, textarea.value.selectionStart) +
                "[](url)" +
                body.value.slice(textarea.value.selectionStart)
            await nextTick()
            textarea.value.focus()
            let pos = body.value.indexOf("(url)")
            textarea.value.setSelectionRange(pos + 1, pos + 4)
        }
        const addImage = async (status) => {
            if (!status) {
                body.value =
                    body.value.slice(0, textarea.value.selectionStart) +
                    "![Uploading Image](...)" +
                    body.value.slice(textarea.value.selectionStart)
            } else {
                body.value = body.value.replace(
                    "![Uploading Image](...)",
                    `![Image description](${status})`
                )
            }

        }
        const addHeading = async () => {
            textarea.value.selectionStart = body.value.length
            body.value += "\n\n##\t\n\n"
            await nextTick()
            textarea.value.focus()
            let pos = body.value.indexOf("##")
            textarea.value.selectionEnd = pos + 3
        }
        const addQuote = async () => {
            textarea.value.selectionStart = body.value.length
            body.value += "\n\n>\t\n\n"
            await nextTick()
            textarea.value.focus()
            let pos = body.value.indexOf(">")
            textarea.value.selectionEnd = pos + 1
        }
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
                imgUrl: imgUrl.value.url,
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
            route,
            title,
            body,
            tags,
            tag,
            addTag,
            addPost,
            uploader,
            browseFiles,
            addBold,
            textarea,
            addItalic,
            addUrl,
            handleFile,
            addHeading,
            addQuote,
            addCode,
            addImage,
        }
    },
    components: { PostTags, BodyOptions },
}
</script>

<style lang="scss" scoped></style>
