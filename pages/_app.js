import { createGlobalStyle, ThemeProvider } from 'styled-components'
import font from '../helpers/font'
import { wrapper } from '../stores'
import { checkMemberAlreadyLogin } from '../stores/memberReducer'
import axios from 'axios'
import API from '../helpers/api'

import CookieBanner from '../components/CookieBanner'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${font.regular};
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
  
  button {
    outline: none;
  }
  .ant-progress-text {
    font-size: 12px;
  }
`

const theme = {
  colors: {
    primary: '#28d2af'
  }
}

const App = ({ Component, pageProps, master }) => {
 
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} master={master} />
      </ThemeProvider>
      <CookieBanner></CookieBanner>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  let master = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
    const masterData = await axios({
      method: 'GET',
      url: `${API.url}/Student/master_data`,
    })
    master = masterData.data.data
    master.course_category.unshift({ id: '0', name: 'ทั้งหมด' })
    console.log('master', master)
    const isLogin = await ctx.store.dispatch(checkMemberAlreadyLogin(ctx.req, ctx.res))
    const isServer = !!ctx.req
    if (isLogin && isServer && ctx.req.url === '/register') {
      ctx.res.redirect('/')
    }
  }
  return { pageProps, master }
}

export default wrapper.withRedux(App)