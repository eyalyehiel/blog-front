<template>
    <p class="post-tags">
        <span class="post-tag" @click="filter(tag)" v-for="tag in tags" :key="tag" v-if="tags.length"
            >{{ tag }}
            <button @click="deleteTag(tag)" v-if="route.path === '/edit'">
                X
            </button>
        </span>
    </p>
</template>

<script>
import { useRoute } from "vue-router"
import { onMounted, toRefs, watch, watchEffect } from "vue"
export default {
    props: {
        tags: Array,
    },
    setup(props,context) {
        const { tags } = toRefs(props)
        const route = useRoute()

        const deleteTag = (tag) => {
            console.log("tag", tag)
        }
        const filter = (tag) => {
            context.emit('filter',tag)
        }
        return { tags, route, deleteTag ,filter}
    },
}
</script>

<style lang="scss" scoped>
.post-tags {
    display: flex;

    &.preview {
        .post-tag {
            cursor: pointer;
            font-size: 14px;
            padding: clamp(0.25rem,0.25em,0.5em) .5em;
            transition: all cubic-bezier(0.17, 0.67, 0.5, 0.71) 100ms;
            &::before {
                content: "#";
            }
            &:hover {
                background-color: rgb(243 243 243);
                box-shadow: inset 0 0 0 1px rgba(23, 23, 23, 0.05),
                    inset 0 0 0 1px rgba(23, 23, 23, 0.05),
                    inset 0 0 0 1px rgba(23, 23, 23, 0.05);
                    border-radius: 0.375rem;
            }
        }
    }
    &.filter {
        display: flex;
        flex-direction: column;
        max-height: 42vh;
        overflow: hidden;
        .post-tag{
            padding: 8px 16px 8px 1.25rem;
            line-height: 24px;
            &::before {
                content: "#";
            }
            &:hover {
                cursor: pointer;
                text-decoration: underline;
                background-color: #e2e3f3;
                border-radius: 6px;
                color: #2f3ab2;
            }
        }
    }
    &.edit {
        gap: 5px;
        .post-tag{
            height: 32px;
            align-items: center;
            border-radius: 6px;
            padding: 4px;
            display: flex;
            // gap: 4px;
            line-height: 21px;
            background-color: #f3f3f3;
            &::before {
                content: "#";
                font-size: 14px;
                padding-inline-end: 4px;
            }
            button{
                all: unset;
                widows: 24px;
                height: 24px;
                padding-inline: 8px;
                font-weight: 600;
                font-size: 18px;
                &:hover{
                    cursor: pointer;
                    color: red;
                }
            }
        }
    }
    // gap: 15px;

    // .post-tag {
    //     background-color: #ddd;
    //     padding: 5px 10px;
    //     border-radius: 3px;
    //     font-size: 13px;

    //     &::before {
    //         content: "#";
    //     }

    //     button {
    //         border: 0;
    //         // font-size: 15px;
    //         background-color: transparent;
    //     }
    // }
}
</style>
