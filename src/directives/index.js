export const clickOutsideDirective = {
    mounted(el, { value: cb }) {
        el.clickOutside = ({ clientX, clientY }) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            if (
                !(
                    clientX > left &&
                    clientX < left + width &&
                    clientY > top &&
                    clientY < top + height
                )
            ) {
                cb(2);
                // console.log("outside");
            } else {
                cb(4);
                // console.log("inside");
            }
        };
        setTimeout(() => {
            document.addEventListener("click", el.clickOutside);
        }, 0);
    },
    unmounted(el) {
        document.removeEventListener("click", el.clickOutside);
    },
};