<template>
    <section class="post-filter">
        <div class="order">
            <span
                @click="filterBy.order = 'likes'"
                :class="{ selected: filterBy.order === 'likes' }"
                >Most Liked</span
            >
            <span
                @click="filterBy.order = 'new'"
                :class="{ selected: filterBy.order === 'new' }"
                >Newest</span
            >
            <span
                @click="filterBy.order = 'old'"
                :class="{ selected: filterBy.order === 'old' }"
                >Oldest</span
            >
        </div>
        <div class="tags-wrapper">
            <span class="tags-header">Popular Tags:</span>
            <PostTags @filter="setFilterBy" :tags="tags" class="filter" />
        </div>
    </section>
</template>

<script>
import { onMounted, watch, ref } from "vue"
import PostTags from "./PostTags.vue"
export default {
    components: {
        PostTags,
    },
    props: {
        tags: Array,
    },
    setup(props, context) {
        const { tags } = props
        const filterBy = ref({
            tag: "",
            order: "new",
        })

        watch(filterBy.value, () => {
            context.emit("filter", filterBy.value)
        })

        const setFilterBy = (tag) => {
            filterBy.value.tag = tag
        }
        return { tags, filterBy, setFilterBy }
    },
}
</script>

<style lang="scss" scoped></style>
