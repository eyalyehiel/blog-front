<template>
    <section class="body-options">
        <button @click.prevent="customText('addBold')"><BoldIcon /></button>
        <button @click.prevent="customText('addItalic')"><ItalicIcon /></button>
        <button @click.prevent="customText('addUrl')"><LinkIcon /></button>
        <button @click.prevent="customText('addHeading')"><HeadingIcon /></button>
        <button @click.prevent="customText('addQuote')"><QuoteIcon /></button>
        <button @click.prevent="customText('addCode')"><CodeIcon /></button>
        <button><ImageIcon /></button>
    </section>
</template>

<script>
import BoldIcon from "../assets/svgs/bold.vue"
import ItalicIcon from "../assets/svgs/italic.vue"
import LinkIcon from "../assets/svgs/link.vue"
import HeadingIcon from "../assets/svgs/heading.vue"
import QuoteIcon from "../assets/svgs/quote.vue"
import CodeIcon from "../assets/svgs/code.vue"
import ImageIcon from "../assets/svgs/image.vue"
export default {
    components: {
        BoldIcon,
        CodeIcon,
        HeadingIcon,
        ImageIcon,
        ItalicIcon,
        LinkIcon,
        QuoteIcon,
    },
    setup(props, context) {
        const customText = (type) => {
            context.emit(type)
        }
        return { customText }
    },
}
</script>

<style lang="scss" scoped>
.body-options {
    align-self: stretch;
    padding-inline: 0;
    background-color: #f9f9f9;
    padding-inline-start: 12px;
    padding-block: 5px;
    button {
        margin-inline-end: 4px;
        padding: 8px;
        background-color: transparent;
        font-size: x-large;
        width: 40px;
        height: 40px;
        border: 0;
        border-radius: 4px;
        &:hover {
            background-color: rgb(230 231 247);
            svg {
                fill: rgb(47 58 178);
            }
        }
    }
}
</style>
