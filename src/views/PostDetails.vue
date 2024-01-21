<template>
    <main class="post-details" v-if="post">
    <section class="post-display">
        <img v-if="post.imgUrl" :src="post.imgUrl" alt="">
        <div class="wrapper">
        <h2>{{ post.title }}</h2>
        <PostTags :tags="post.tags"/>
        <p v-html="editedBody"></p>
        </div>
    </section>
    <section class="post-author"></section>
    </main>
</template>

<script>
import { onMounted, ref ,computed} from 'vue';
import { useRoute } from 'vue-router';
import { postService } from '@/services/post-service.js';
import PostTags from '@/components/PostTags.vue';

export default {
    setup() {
        const { id } = useRoute().params;
        const post = ref(null);

        onMounted(async () => {
            post.value = await postService.getById(id);
        });

        const editedBody = computed(()=>{
            return postService.manageBody(post.value.body)
        })

        return { post,editedBody };
    },
    components: { PostTags }
}
</script>

<style lang="scss" scoped>

</style>