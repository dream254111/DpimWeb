import styled, { css } from 'styled-components'
import { Container } from '../../components/index'
import { maxWidth } from '../../helpers/breakpoint'
import Router from 'next/router'

const FooterContainer = styled('div')`
  box-sizing: border-box;
  max-width: 1376px;
  width: 94%;
  display: flex;
  white-space: no-wrap;
  flex-direction: column;
  margin: 0 auto;

`
const FooterLogo = styled('div')`
`

const Logo = styled('img')`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center;
`

const ContactContainer = styled('div')`
  width: 100%;
`

const ContactTitle = styled('div')`
  margin-top: 16px;
  color: #FFFFFF;
  font-size: 12px;
`

const Contact = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
`

const ContactItem = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 8px;
  div {
    margin-left: 14px;
    color: #FFFFFF;
    font-size: 12px;
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
  margin-top: 8px;
  margin-bottom: 24px;
  div {
    color: #FFFFFF;
    font-size: 12px;
    margin-left: 14px;
    cursor: pointer;
    text-decoration: underline;
  }
`

const FooterBackground = styled('div')`
  width: 100%;
  background-color: #222639;
  padding: 32px 0;
`

const CopyRight = styled('div')`
font-size: 12px;
color: #FFFFFF; 
`

const Footer = () => {
  return (
    <>
      <FooterBackground>
          <FooterContainer>
            <FooterLogo>
              <Logo src='/static/images/newDPIMLogo.svg' />
            </FooterLogo>
            <ContactContainer>
              <ContactTitle>ติดต่อเรา</ContactTitle>
              <Contact>
                <ContactItem>
                  <Icon src='/static/images/newFacebook.svg' />
                  <div>DPIM Academy</div>
                </ContactItem>
                <ContactItem>
                  <Icon src='/static/images/newMail.svg' />
                  <div>dpimacademy@gmail.com</div>
                </ContactItem>
              </Contact>
              <Report onClick={() => Router.push('/feedback')}>
                <Icon src='/static/images/newReport.svg' />
                <div>แจ้งปัญหาการใช้งาน</div>
              </Report>
              <CopyRight>Copyright © 2021 DPIMACADEMY. Created by Department of Primary Industries and Mines (DPIM)</CopyRight>
            </ContactContainer>
          </FooterContainer>
      </FooterBackground>
    </>
  )
}

export default Footer
