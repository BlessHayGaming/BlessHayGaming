<script src="./Default.js"></script>
<style src="./Default.scss" lang="scss"></style>

<template>
    <div class="view view--layout--default">
        <AppHeader />
        <transition name="view__fade" mode="out-in">
            <router-view
                :key="$route.path"
                ref="view"
            />
        </transition>
    </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>