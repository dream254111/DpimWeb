import { setCookie, destroyCookie } from 'nookies'

const authTokenKey = 'dpim-web'
export const setMemberCookie = (payload, req) => setCookie(req, authTokenKey, JSON.stringify(payload), {
  maxAge: 10800, // change to 5 days
  path: '/',
})

export const resetMemberCookie = (req = null) => destroyCookie(req, authTokenKey, {
  path: '/'
})

export const getMemberCookie = (req) => {
  if (req) {
    const { cookie } = req.headers
    if (!cookie) {
      return null
    }
    const userCookie = cookie.split(';')
      .find(c =>
        c.trim().startsWith(`${authTokenKey}=`),
      )
    if (!userCookie) {
      return null
    }
    const user = decodeURIComponent(userCookie.split(`${authTokenKey}=`)[1])
    return JSON.parse(user)
  } else {
    const cookieData = require('component-cookie')(authTokenKey)
    return cookieData == undefined ? '' : JSON.parse(cookieData)
  }
}