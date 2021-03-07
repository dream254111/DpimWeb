import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import font from '../../helpers/font'
import { Container } from '../../components'
import { useEffect, useState } from 'react'
import { message, Row, Col } from 'antd'
import axios from 'axios'
import API from '../../helpers/api'
import { maxWidth } from '../../helpers/breakpoint'
import Router from 'next/router'
import { stripHtml } from '../../helpers/util'
import { Banner } from '../../components/index'

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
`

const TopCard = styled('div')`
  width: 100%;
  display: flex;
  align-items: flex-start;
  background: #FFFFFF;
  margin-top: 24px;
  cursor: pointer;
  margin-bottom: 24px;
  ${maxWidth.md`
    flex-direction: column;
  `}

`

const TopCardImage = styled('img')`
  width: 50%;
  height: auto;
  ${maxWidth.md`
    width: 100%;
  `}
`

const TopCardContent = styled('div')`
  width: 50%;
  padding: 16px 24px;
  height: 100%;
  ${maxWidth.md`
    padding: 0;
    width: 100%;
    margin-top: 8px;
  `}
`

const TopCardName = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
`


const TopCardDescription = styled('div')`
  font-size: 18px;
  margin-top: 8px;
`

const NewGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`


const NewGridItem = styled('div')``

const NewsPage = () =>{
  const [news, setNews] = useState([])
  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetAllNews`
      })
      setNews(response.data.data)
    } catch (error) {
        message.error(error.message)
    }
  }
  const topNewsDetail = news?.length > 0 && news.find((item, index) => index === 0) || {}
  const removeFirstIndexNews = news?.length > 0 && news.filter((item, index) => index !== 0) || []
  return (
    <MainLayout>
      <Banner IconImage='/static/images/newsicon.svg'>ข่าวประชาสัมพันธ์</Banner>
      <Container paddingTop='32px' paddingBottom='292px'>
         <TopCard onClick={() => Router.push(`/news/${topNewsDetail.id}`)}>
           <TopCardImage src={topNewsDetail.image} />
           <TopCardContent>
             <TopCardName>{topNewsDetail.name}</TopCardName>
             <TopCardDescription>{stripHtml(topNewsDetail.description)}</TopCardDescription>
           </TopCardContent>
         </TopCard>
         <Row gutter={16}>
            {
              removeFirstIndexNews.map((item, index) => (
                <Col xs={24} lg={8} key={index}>
                  <CardContent onClick={() => Router.push(`/news/${item.id}`)}>
                    <CardImage src={item.image} />
                    <CardName>{item.name}</CardName>
                  </CardContent>
                </Col>
              ))
            }
         </Row>
      </Container>
    </MainLayout>
  )
}

const CardContent = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 12px 0;
  cursor: pointer;
`

const CardImage = styled('img')`
  max-width: 331px;
  height:auto;
  ${maxWidth.md`
    max-width: 100%;
    height: auto;
  `}

`

const CardName = styled('div')`
  font-size: 18px;
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3.2em;
`

NewsPage.getInitialProps = () => {
  return {}
}

export default NewsPage