const pkg = require('./package')
import path from 'path'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || []
  }
}

module.exports = {
  mode: 'spa',
  // router: {
  //   linkPrefetchedClass: 'nuxt-link-prefetched'
  // },

  /*
   ** Headers of the page
   */
  head: {
    script: [],
    htmlAttrs: {
      lang: 'en',
    },
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#1f9d55'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firestore.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',

  ],

  /*
   ** Build configuration
   */
  build: {
    //  analyze: true,
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve('./tailwind.js')
      },
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    },
    extend(config, {
      isDev
    }) {
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [{
              extractor: TailwindExtractor,
              extensions: ['vue']
            }],
            whitelist: ['html', 'body', 'nuxt-progress']
          })
        )
      }
    }
  },
  css: ['~/assets/css/tailwind.css']
}