import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { useEffect } from 'react'
import axios from 'axios'
import { message } from 'antd'
import API from '../helpers/api'

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
`

const SubTitle = styled('div')`
  font-size: 14px;
  margin-top: 12px;
`

const Card = styled('div')`
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
  border-radius: 8px;
  padding: 32px 48px;
  margin-top: 24px;
`

const HowtoItem = styled('div')`
  background: #F9F9F9;
  border-radius: 4px;
  padding: 32px;
  :not(:first-child) {
    margin-top: 32px;
  }
`

const ItemTitleWrapper = styled('div')`
  display: flex;
  align-items: center;
`

const ItemNumber = styled('div')`
  font-size: 32px;
  color: #00937B;
  font-family: ${font.bold};
`

const ItemTitle = styled('div')`
  font-size: 18px;
  margin-left: 16px;
`

const HowtoPage = () => {
  useEffect(() => {
    fetchHowTo()
  }, [])

  const fetchHowTo = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/TutorialReadList`
      })
      console.log('response', response)
    } catch (error) {
        message.error(error.message)
    }
  }
  return (
    <MainLayout>
      <Container paddingTop='32px' paddingBottom='142px'>
        <Title>วิธีการใช้งาน</Title>
        <Card>
          <Title>ปรึกษาผ่าน LINE Official Account</Title>
          <SubTitle>ผู้เรียนสามารถแอด LINE ID จาก @dpimedlearning เพื่อสอบถามปัญหาด้านการเรียนต่าง ๆ</SubTitle>
        </Card>
      </Container>
    </MainLayout>
  )
}

HowtoPage.getInitialProps = () => {
  return {}
}

export default HowtoPage
