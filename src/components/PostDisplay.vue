<template>
    <section class="post-display">
        <h3>Post title</h3>
        <span>isDraft</span>
        <div class="display-wrapper">
            <span>Edit</span>
            <span>Delete</span>
        </div>
    </section>
</template>

<script>
export default {
    setup() {
        return {}
    },
}
</script>

<style lang="scss" scoped>
.post-display{
    display: grid;
    grid-template-columns: 1fr .1fr .5fr;
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
    }
}
</style>
