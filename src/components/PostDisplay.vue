<template>
    <section class="post-display">
        <div class="first-wrapper">
            <h3>{{ post.title }}</h3>
            <span class="draft">{{
                post.isDraft ? "Draft" : "Published"
            }}</span>
        </div>
        <div class="display-wrapper">
            <span @click="router.push(`/edit/${post._id}`)">Edit</span>
            <span class="delete" @click="removePost">Delete</span>
        </div>
    </section>
</template>

<script>
import { toRefs } from "vue"
import { useRouter } from "vue-router"
export default {
    props: {
        post: Object,
    },
    setup(props) {
        const router = useRouter()
        const { post } = toRefs(props)
        const removePost = () => {}
        return { post, router, removePost }
    },
}
</script>

<style lang="scss" scoped>
.post-display {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: white;
    padding: 16px;
    &:hover {
        background-color: #f9f9f9;
    }
    h3 {
        // font-size: xx-large;
        // text-decoration: none;
        // color: rgb(65, 65, 65);
        // font-weight: 700;
        &:hover {
            cursor: pointer;
            color: #3b49df;
        }
    }
    .first-wrapper{
        grid-row: 1/-1;
        display: grid;
    }
    .draft {
        background-color: #fcd34d;
        display: flex;
        align-items: center;
        padding: 3px;
        font-size: 14px;
        border-radius: 5px;
        width: min-content;
    }
    .display-wrapper {
        grid-row: 2;
        display: flex;
        justify-content: end;
        gap: 10px;
        span {
            font-size: 15px;
            cursor: pointer;
            border-radius: 5px;
            padding: 7px;
            &.delete {
                color: #dc2626;
            }
            &:hover {
                background-color: #00000009;
            }
        }
    }
}
@media (min-width: 500px) {
    .post-display {
        grid-template-columns: 1fr 0.5fr;
        grid-template-rows: 1fr;
        .first-wrapper {
            align-items: center;
            display: grid;
            grid-template-columns: 1fr 0.1fr;
        }
        .display-wrapper{
            grid-row: 1;
        }
    }
}
</style>
