<template>
    <section class="comments-preview">
        <img src="../assets/images/jungle.jpg" alt="" />
        <div class="mini-wrapper">
            <p>
                <span>username</span>
                <span>•</span>
                <span>Feb 2</span>
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt dolore sit quia quibusdam officiis pariatur ab
                consequuntur? Sequi deleniti minima facere, recusandae fugit
                ullam, provident, incidunt quos praesentium beatae veritatis?
            </p>
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
.comments-preview {
    display: flex;
    gap: 10px;
    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        border: 1px solid var(--tag-shadow-preview);
    }
    .mini-wrapper {
        padding: 10px;
        // border: 1px solid var(--color1);
        box-shadow: 0 0 0 1px var(--tag-shadow-preview);
        border-radius: 5px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        p {
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
