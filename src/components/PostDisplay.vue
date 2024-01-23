<template>
    <section class="post-display">
        <h3>{{ post.title }}</h3>
        <span>{{ post.isDraft ? "Draft" : "Published" }}</span>
        <div class="display-wrapper">
            <span>Edit</span>
            <span>Delete</span>
        </div>
    </section>
</template>

<script>
import { toRefs } from "vue"

export default {
    props: {
        post: Object,
    },
    setup(props) {
        const { post } = toRefs(props)
        return { post }
    },
}
</script>

<style lang="scss" scoped>
.post-display {
    display: grid;
    grid-template-columns: 1fr 0.1fr 0.5fr;
    background-color: white;
    padding-block: 20px;
    padding-inline: 15px;
    &:hover {
        background-color: rgb(213, 213, 213);
    }
    .display-wrapper {
        display: flex;
        justify-content: end;
        gap: 10px;
        span{
            cursor: pointer;
        }
    }
}
</style>
