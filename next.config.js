const localeSubpaths = {}
const withOffline = require('next-offline')

module.exports = withOffline({
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest), // add the homepage to the cache
  generateInDevMode: false,
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /\.(eot|woff|woff2|ttf|svg|png|PNG|jpg|gif|jpeg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          }
        }
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  publicRuntimeConfig: {
    localeSubpaths
  }
})
