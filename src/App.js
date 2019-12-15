import DefaultLayout from '~/layouts/Default.vue';

export default {
    props: {
        layout: {
            type: String,
            default: 'default',
        },
    },
    data () {
        return {
            layouts: {
                default: DefaultLayout,
            },
        };
    },
    watch: {
        $route() {
            this.updatePageInfo();
        },
    },
    created() {
        this.updatePageInfo();
    },
    methods: {
        updatePageInfo() {
            let name = this.$route.name;

            if (name) {
                const map = {
                    "*": '404',
                    "home": 'frontpage',
                };

                if (map[name]) {
                    name = map[name];
                }
            } else {
                if (this.$route.path.indexOf('/learn') >= 0) {
                    name = 'learnPost';
                }
            }

            this.$store.commit('setPageType', name);
            console.log(this.$store.getters.pageType);
        },
    },
};