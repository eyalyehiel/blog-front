<template>
    <section v-if="msgToShow" class="user-msg" :class="msgToShow?.type">
        {{ msgToShow?.txt }}
    </section>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue"
import {eventBus, SHOW_MSG } from '../services/event-bus.service.js'
export default {
    setup(props) {
        const msgToShow = ref(null)
        onMounted(() => {
            eventBus.on(SHOW_MSG, (msg) => {
                msgToShow.value = msg
                var delay = msg.delay || 3000
                setTimeout(() => {
                    msgToShow.value = null
                }, delay)
            })
        })

        return { msgToShow }
    },
}
</script>

<style lang="scss" scoped>
.user-msg {
    position: fixed;
    // display: flex;
    right: 10px;
    bottom: 10px;
    // max-width: 1100px;
    padding: 20px 35px;
    border-radius: 5px;
    background-color: #ddd;

    &.success {
        color: green;
    }
    &.error {
        color: red;
    }
}
</style>
