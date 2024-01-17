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
                <PostTags :tags="tags" />
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
            <BodyOptions @addBold="addBold" />
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
            <button class="publish" @click.prevent="addPost(false)">Publish</button>
            <button class="save" @click.prevent="addPost(true)">Save</button>
        </section>
    </form>
</template>

<script>
import { ref, nextTick } from "vue"
import { postService } from "@/services/post-service.js"
import PostTags from "@/components/PostTags.vue"
import BodyOptions from "@/components/BodyOptions.vue"
import { showErrorMsg, showSuccessMsg } from "@/services/event-bus.service.js"
import { userService } from "@/services/user-service"
export default {
    setup() {
        const textarea = ref("")
        const title = ref("")
        const body = ref("")
        const tags = ref([])
        const tag = ref("")
        const uploader = ref("")
        const addBold = async () => {
            body.value = body.value + "****"

            await nextTick()
            textarea.value.focus()
            textarea.value.selectionEnd = textarea.value.selectionEnd - 2
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
            let postBody = postService.manageBody(body.value)
            let userPosted = userService.getLoggedinUser()
            const post = {
                title: title.value,
                body: postBody,
                tags: tags.value,
                author: {
                    _id: userPosted.id,
                    username: userPosted.username,
                    imgUrl: userPosted.imgUrl,
                },
                likes: 0,
                comments: [],
                createdAt: Date.now(),
                isDraft: toDraft
            }
            // if (
            //     title.value === "" ||
            //     body.value === "" ||
            //     tags.value.length === 0
            // )
            //     return
            try {
                if (!userPosted) throw new Error("You must login first")
                if (!title.value)
                    throw new Error("Please make sure you add title")
                if (!body.value)
                    throw new Error("Please make sure you add body")
                if (!tags.value.length)
                    throw new Error("Please make sure you add at least one tag")
                await postService.save(post)
                showSuccessMsg("Post Added!")
            } catch (err) {
                showErrorMsg(err)
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
            addBold,
            textarea,
        }
    },
    components: { PostTags, BodyOptions },
}
</script>

<style lang="scss" scoped></style>
