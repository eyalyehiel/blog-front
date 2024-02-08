<template>
    <section class="comments-preview">
        <img :src="comment.author.imgUrl" alt="" />
        <div class="mini-wrapper">
            <p>
                <span>{{ comment.author.username }}</span>
                <span>•</span>
                <span>{{ computedDate }}</span>
            </p>
            <p>
                {{ comment.body }}
            </p>
        </div>
    </section>
</template>

<script>
import { computed, toRefs } from "vue"

export default {
    props: {
        comment: Object,
    },
    setup(props) {
        const { comment } = toRefs(props)
        const computedDate = computed(() => {
            const date = new Date(comment.value.createdAt)
            return date.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
            })
        })
        return { comment, computedDate }
    },
}
</script>

<style lang="scss" scoped>
.comments-preview {
    display: flex;
    gap: 10px;
    img {
        margin-block-start: 10px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: 1px solid var(--tag-shadow-preview);
    }
    .mini-wrapper {
        flex: 1;
        padding: 10px;
        padding-block: 20px;
        // border: 1px solid var(--color1);
        box-shadow: 0 0 0 1px var(--tag-shadow-preview);
        border-radius: 5px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        p {
            // width: 100%;
            align-items: center;
            display: flex;
            gap: 10px;
            span {
                &:first-child {
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
