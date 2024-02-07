<template>
    <section class="body-options">
        <button @click.prevent="customText('addBold')"><BoldIcon />
            <ToolTip text="Bold"/>
        </button>
        <button @click.prevent="customText('addItalic')"><ItalicIcon />
            <ToolTip text="Italic"/></button>
        <button @click.prevent="customText('addUrl')"><LinkIcon />
            <ToolTip text="Link"/></button>
        <button @click.prevent="customText('addHeading')"><HeadingIcon />
            <ToolTip text="Heading"/></button>
        <button @click.prevent="customText('addQuote')"><QuoteIcon />
            <ToolTip text="Quote"/></button>
        <button @click.prevent="customText('addCode')"><CodeIcon />
            <ToolTip text="Code"/></button>
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
import ToolTip from "./ToolTip.vue"
export default {
    components: {
    BoldIcon,
    CodeIcon,
    HeadingIcon,
    ImageIcon,
    ItalicIcon,
    LinkIcon,
    QuoteIcon,
    ToolTip
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
    // background-color: #f9f9f9;
    background-color: var(--options-color);
    padding-inline-start: 12px;
    padding-block: 5px;
    button {
        position: relative;
        margin-inline-end: 4px;
        padding: 8px;
        background-color: transparent;
        font-size: x-large;
        width: 40px;
        height: 40px;
        border: 0;
        border-radius: 4px;
        svg {
            fill: var(--color1);
        }
        &:hover {
            cursor: pointer;
            background-color: var(--svg-hover);
            svg {
                fill: var(--svg-color);
            }
            .tooltip{
                display: block;
            }
        }
    }
}
</style>
