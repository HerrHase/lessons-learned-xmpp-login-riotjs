const mix = require('laravel-mix')
const path = require('path')

require('laravel-mix-purgecss')

// plugins
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.webpackConfig({
    module: {
        rules: [{
 		    test: /\.riot$/,
 			use: [{
 				loader: '@riotjs/webpack-loader',
                options: {
                    hot: false
                }
 			}]
 		}
    ]},
    plugins: [
        new SvgSpritemapPlugin('./node_modules/@tiny-components/plain-ui/src/icons/mono-icons/svg/*.svg', {
            output: {
                filename: 'public/symbol-defs.svg',
                chunk: {
                    keep: true
                },
                svgo: {
                    plugins: [{
                        name: 'convertStyleToAttrs',
                        active: true
                    },{
                        name: 'removeStyleElement',
                        active: true
                    }, {
                        name: 'removeAttrs',
                        params: {
                            attrs: 'fill'
                        }
                    }]
                }
            },
            sprite: {
                prefix: 'icon-'
            }
        })
    ]
})

mix
    .setPublicPath('./')
    .js('src/js/script.js', 'public/js')
    .sass('src/scss/styles.scss', 'public/css')
    .purgeCss({
        extend: {
            content: [
                path.join(__dirname, 'public/index.html'),
                path.join(__dirname, 'src/js/**/*.riot')
            ]
        }
    })
    .options({
        terser: {
            extractComments: false,
        },
        processCssUrls: false
    })
    .copyDirectory('node_modules/@tiny-components/plain-ui/src/fonts/IBM*', 'public/css')
    .version()
