import Logo from '../Logo/Logo.vue'

export default {
    components: {
        Logo
    },
    computed: {
        isLearnPost() {
            return this.$store.getters.pageType === 'learnPost';
        },
        is404() {
            return this.$store.getters.pageType === '404';
        },
        transformation() {
            if (this.isLearnPost) {
                return {
                    translateX: '-100%',
                    scale: '.8',
                };
            }
            return {};
        },
        haybaleTransformation() {
            if (this.is404) {
                return {rotate: '180deg', translateY: '-150%'};
            }
            return {};
        },
    },
}