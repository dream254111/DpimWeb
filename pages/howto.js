import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { message } from 'antd'
import API from '../helpers/api'
import ReactPlayer from 'react-player'

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
`

const SubTitle = styled('div')`
  font-size: 18px;
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
  :first-child {
    margin-top: 16px;
  }
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
  font-size: 32px;
  margin-left: 16px;
`

const Image = styled('img')`
  max-width: 100%;
  margin-top: 12px;
`

const DetailTitle = styled('div')`
  font-size: 18px;
  margin-top: 12px;
`

const DetailItem = styled('div')`

`

const HowtoPage = () => {
  useEffect(() => {
    fetchHowTo()
  }, [])

  const [tutorials, setTutorials] = useState([])
  const fetchHowTo = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/TutorialReadList`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        setTutorials(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
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
          <SubTitle>ผู้เรียนสามารถแอด LINE ID จาก @dpimedlearning <br /> เพื่อสอบถามปัญหาด้านการเรียนต่าง ๆ</SubTitle>
          {
            tutorials.map((item, index) => (
              <HowtoItem key={index}>
                <ItemTitleWrapper>
                  <ItemNumber>{index + 1}.</ItemNumber>
                  <ItemTitle>{item.tutorial_text}</ItemTitle>
                </ItemTitleWrapper>
                {item.image ? <Image src={item.image} /> : null}
                {
                  item.link &&
                    <ReactPlayer
                      playsinline
                      url={item.link}
                      width='100%'
                      height='600px'
                      style={{ marginTop: '20px' }}
                      controls={true}
                    />
                  }
                {
                  item.detail.map((detail, index) => (
                    <DetailItem
                      key={index}
                    >
                      <DetailTitle>{index + 1}. {detail.title}</DetailTitle>
                      {detail.img_path ? <Image src={detail.img_path} /> : null}
                    </DetailItem>
                  ))
                }
              </HowtoItem>
            ))
          }
        </Card>
      </Container>
    </MainLayout>
  )
}

HowtoPage.getInitialProps = () => {
  return {}
}

export default HowtoPage
