import Footer from './components/Footer'
import Header from './components/Header'
import styled from 'styled-components'

const Wrapper = styled('div')`
  background-color: #F9F9F9;
`

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Wrapper>
        {children}
      </Wrapper>
      <Footer />
    </>
  )
}

export default MainLayout
