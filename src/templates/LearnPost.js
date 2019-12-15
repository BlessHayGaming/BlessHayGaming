export default {
    metaInfo() {
        return {
            title: this.page.title,
        }
    },
    computed: {
        page() {
            return this.$page.learnPost;
        },
        pageContent() {
            let title = '';
            if (this.page.title) {
                title += '<h1>'+this.page.title+'</h1>'
            }
            return title + this.page.content;
        },
    },
}