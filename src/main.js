// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import App from '~/App.vue';
import DefaultLayout from '~/layouts/Default.vue'
import { store } from '~/store/store.js';
import lodash from '~/mixins/globals/lodash.js';
import '~/assets/styles/_base.scss'

export default function (Vue, {
    router,
    head,
    isClient,
    appOptions,
}) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    appOptions.render = h => h(App);

    // Initialize store
    appOptions.store = store;

    // Add fonts
    head.link.push({
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&display=swap'
    });

    Vue.mixin(lodash);
}