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
        <div class="tags">
            <span class="tags-header">Popular Tags:</span>
            <span
                @click="filterBy.tag = tag"
                class="tag"
                v-if="tags"
                v-for="tag in tags"
                :key="tag"
                >#{{ tag }}</span
            >
        </div>
    </section>
</template>

<script>
import { onMounted, watch, ref } from "vue"

export default {
    props: {
        tags: Array,
    },
    setup(props,context) {
        const { tags } = props
        const filterBy = ref({
            tag: '',
            order: 'likes'
        })

        watch(filterBy.value,()=> {
            context.emit('filter',filterBy.value)
        })
        return { tags, filterBy }
    },
}
</script>

<style lang="scss" scoped></style>
