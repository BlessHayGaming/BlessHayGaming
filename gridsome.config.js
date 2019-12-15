// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
        patterns: [
            path.resolve(__dirname, './src/assets/styles/_variables.scss'),
        ],
    })
}

module.exports = {
    siteName: 'Bless Hay Gaming',
    siteDescription: 'The home of Bless Hay Gaming.',
    siteUrl: 'https://blesshaygaming.github.io/BlessHayGaming',
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                name: 'LearnPost',
                path: 'content/learn/**/*.md',
                typeName: 'LearnPost',
            },
        },
        // {
        //     use: '~/plugins',
        //     options: {},
        // },
    ],
    templates: {
        LearnPost: '/learn/:fileInfo__name'
    },
    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            anchorClassName: 'icon icon-link',
            plugins: [
            ]
        },
    },
    chainWebpack (config) {
        // Load variables for all vue-files
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];

        types.forEach(type => {
            addStyleResource(config.module.rule('scss').oneOf(type))
        });
    }
}
