const next = require('next')
const isDev = process.env.NODE_ENV !== 'production'
const app = next({ dev: isDev })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT, 10) || 5000
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const path = require('path')
const cors = require('cors')
const { join } = require('path')
const { PROFILE_PAGE } = require('../constants')
let sitemap

app.prepare().then(() => {
  const server = express()
  server.use(cors())
  server.use(compression())
  server.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
  server.use(bodyParser.json({ type: 'application/json' }))

  // server.get('/robots.txt', (req, res) => {
  //   res.sendFile(path.join(__dirname, '/public/static', 'robots.txt'))
  // })
  // server.get('/sitemap.xml', async (req, res) => {
  //   res.header('Content-Type', 'application/xml')
  //   res.header('Content-Encoding', 'gzip')
  //   if (sitemap) {
  //     res.send(sitemap)
  //     return
  //   }
  //   try {
  //     const smStream = new SitemapStream({ hostname: 'https://jstopcoder.getlinks.com/' })
  //     const pipeline = smStream.pipe(createGzip())
  //     smStream.write({ url: '/', changefreq: 'daily', priority: 1 })
  //     smStream.end()

  //     // cache the response
  //     const sm = await streamToPromise(pipeline)
  //     sitemap = sm

  //     // stream the response
  //     pipeline.pipe(res).on('error', (e) => { throw e })
  //   } catch (e) {
  //     console.error(e)
  //     res.status(500).end()
  //   }
  //   res.header('Content-Type', 'application/xml')
  //   res.send(sitemap)
  // })
  
  server.get('/profile/', (req, res) => {
    return res.redirect(`/profile/${PROFILE_PAGE.BASIC_INFORMATION}`)
  })

  server.get('/profile/:profilePageSlug', (req, res) => {
    const profilePageSlug = req.params.profilePageSlug
    const isValidSlug = Object.values(PROFILE_PAGE).includes(profilePageSlug)
    if (!isValidSlug) {
      return res.redirect(`/profile/${PROFILE_PAGE.BASIC_INFORMATION}`)
    } else {
      const actualPage = '/profile'
      const queryParams = { profilePageSlug }
      return handle(req, res, actualPage, queryParams)
    }
  })

  server.get('/course/:courseSlug', (req, res) => {
    const actualPage = '/course'
    const queryParams = { type: req.params.courseSlug }
    return handle(req, res, actualPage, queryParams)
  })

  server.get('/service-worker.js', (req, res) => {
    res.sendFile(join(__dirname, '.next', 'service-worker.js'))
  })

  server.all('*', (req, res) => handle(req, res))
  server.listen(port, () => console.log('server is running on port: ', port))
})
