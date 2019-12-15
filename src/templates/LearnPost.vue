<template>
    <div class="learn-post">
        <aside
            class="learn-post__aside"
        >
            <div
                class="learn-post__aside-content"
            />
        </aside>
        <div
            class="learn-post__post"
        >
            <header class="learn-post__header">
                <g-link
                    class="learn-post__breadcrumb-link"
                    to="/"
                    title="Home"
                >
                    B:
                </g-link>
                <span
                    class="learn-post__breadcrumb-text"
                    v-html="'&nbsp;/&nbsp;'"
                />
                <g-link
                    class="learn-post__breadcrumb-link"
                    to="/Learn/"
                    title="Learn more"
                >
                    Learn
                </g-link>
                <span
                    class="learn-post__breadcrumb-text"
                    v-html="'&nbsp;/ '+page.title+'.'"
                />
                <g-link
                    class="learn-post__breadcrumb-link"
                    to="/Learn/"
                    title="More on GameMaker"
                >
                    gml
                </g-link>
            </header>
            <main
                class="learn-post__content"
                v-html="pageContent"
            />
        </div>
    </div>
</template>

<page-query>
query Post($path: String!) {
    learnPost(path: $path) {
        id
        title
        content
    }
}
</page-query>

<script src="./LearnPost.js"></script>
<style src="./LearnPost.scss" lang="scss"></style>