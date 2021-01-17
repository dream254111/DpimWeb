import styled, { css } from 'styled-components'
import { Container } from '../../components/index'
import { maxWidth } from '../../helpers/breakpoint'
import Router from 'next/router'

const FooterContainer = styled('div')`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 0;
  display: flex;
  white-space: no-wrap;
  ${maxWidth.md`
    flex-direction: column;
    padding: 8px 0;
  `}
`
const FooterLogo = styled('div')`
margin-right: 34px;
${maxWidth.md`
  margin 0 0 16px 0;
`}
`
const Logo = styled('img')`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
`

const ContactContainer = styled('div')`
  width: 100%;
  p {
    line-height: 18px;
    color: #333333;
    margin: 0;
  }
  p:nth-child(1)  {
    color: #BDBDBD;
    margin-bottom: 12px;
  }
`
const Contact = styled('div')`
  display: grid;
  grid-template-columns: 18% 18% 18% 18%;
  grid-auto-rows: 1fr;
  grid-column-gap: 20px;
  ${maxWidth.md`
    grid-template-columns: 100%;
  `}
`
const ContactItem = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 14px;
  div {
    margin-left: 14px;
  }
`

const Icon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat:
`

const Report = styled('div')`
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 15px;
  div {
    color: #41A0FC;
    text-decoration-line: underline;
    margin-left: 10px;
    cursor: pointer;
  }
`

const Footer = () => {
  return (
    <>
      <Container>
        <FooterContainer>
          <FooterLogo>
            <Logo src='/static/images/logo.png' />
          </FooterLogo>
          <ContactContainer>
            <div>ติดต่อเรา</div>
            <div>จันทร์ - ศุกร์ เวลา 08:30 - 16:30 น.</div>
            <Contact>
              <ContactItem>
                <Icon src='/static/images/Facebook.png' />
                <div>DPIM Academy</div>
              </ContactItem>
              <ContactItem>
                <Icon src='/static/images/Mail.png' />
                <div>dpimacademy@gmail.com</div>
              </ContactItem>
            </Contact>
            <Report onClick={() => Router.push('/feedback')}>
              <Icon src='/static/images/Exclamation.svg' />
              <div>แจ้งปัญหาการใช้งาน</div>
            </Report>
          </ContactContainer>
        </FooterContainer>
      </Container>
    </>
  )
}

export default Footer
