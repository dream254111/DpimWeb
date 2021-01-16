import { createGlobalStyle, ThemeProvider } from 'styled-components'
import font from '../helpers/font'
import { wrapper } from '../stores'
import { checkMemberAlreadyLogin } from '../stores/memberReducer'
import axios from 'axios'
import API from '../helpers/api'
import { useEffect } from 'react'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${font.regular};
  }
  
  button {
    outline: none;
  }
`

const theme = {
  colors: {
    primary: '#28d2af'
  }
}

const App = ({ Component, pageProps, master }) => {
  useEffect(() => {
    axios({
      method: 'PUT',
      url: `${API.url}/Management/VisitUpdate`,
    })
  }, [])

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} master={master} />
      </ThemeProvider>
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