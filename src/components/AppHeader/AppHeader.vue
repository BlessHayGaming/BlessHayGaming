<script src="./AppHeader.js"></script>
<style src="./AppHeader.scss" lang="scss"></style>

<template>
    <header class="app-header" >
        <g-link
            :class="'app-header__logo-wrap'"
            to="/"
            title="Home"
        >
            <Logo
                :class="'app-header__logo'"
                :transformAll="transformation"
                :transformHaybale="haybaleTransformation"
            />
        </g-link>
    </header>
</template>
