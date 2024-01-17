<template>
    <p class="post-tags">
        <span class="post-tag" v-for="tag in tags" :key="tag" v-if="tags.length"
            >{{ tag }}
            <button @click="deleteTag(tag)" v-if="route.path === '/edit'">
                X
            </button>
        </span>
    </p>
</template>

<script>
import { useRoute } from "vue-router"
import { onMounted, watch, watchEffect } from "vue"
export default {
    props: {
        tags: Array,
    },
    setup(props) {
        const { tags } = props
        const route = useRoute()

        const deleteTag = (tag) => {
            console.log('tag',tag)
        }
        return { tags, route,deleteTag }
    },
}
</script>

<style lang="scss" scoped>
.post-tags {
    display: flex;
    gap: 15px;

    .post-tag {
        background-color: #ddd;
        padding: 5px 10px;
        border-radius: 3px;
        font-size: 13px;

        &::before {
            content: "#";
        }

        button {
            border: 0;
            // font-size: 15px;
            background-color: transparent;
        }
    }
}
</style>
