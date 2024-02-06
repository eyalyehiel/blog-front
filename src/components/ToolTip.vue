<template>
    <div class="tooltip">
        {{ text }}
    </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
    props:{
        text: String
    },
    setup (props) {
        const {text} = toRefs(props)

        return {text}
    }
}
</script>

<style lang="scss" scoped>
.tooltip{
    display: none;
    position: absolute;
    transform: translateY(5px);
    border-radius: 6px;
    background-color: rgba(23 23 23/0.9);
    font-size: 16px;
    padding: 10px;
    color: white;
    font-weight: 300;
}
</style>