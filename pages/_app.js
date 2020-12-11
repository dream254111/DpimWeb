import { createGlobalStyle, ThemeProvider } from 'styled-components'
import font from '../helpers/font'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '../public/static/font-awesome-4.7.0/css/font-awesome.css'

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

const App = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default App
