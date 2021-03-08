import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import font from '../../helpers/font'
import { Container } from '../../components'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import axios from 'axios'
import API from '../../helpers/api'
import { ArrowLeftOutlined } from '@ant-design/icons'
import moment from 'moment'
moment.locale('th')
import Router from 'next/router'

const TitleWrapper = styled('div')`
  display: flex;
  align-items: center;
  line-height: 1;
`

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
  margin-left: 15px;
`

const CreatedTime = styled('div')`
  margin-top: 8px;
  color: #4F4F4F;
  font-size: 14px;
  margin-left: 30px;
`

const Image = styled('div')`
  width: 50%;
  height: 275px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin: 49px auto 0 auto;
`

const Description = styled('div')`
  font-size: 18px;
  margin-top: 32px;
  word-wrap: break-word;
`

const NewsDetailPage = ({ newsId }) =>{
  useEffect(() => {
    fetchNewsById()
  }, [])
  const [newsDetail, setNewsDetail] = useState({}) 
  const fetchNewsById = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetNews`,
        params : {
          id : newsId
        }
      })
      setNewsDetail(response.data.data.data)
    } catch (error) {
        message.error(error.message)
    }
  }
  const htmlDecode = (content) => {
    if (process.browser) {
      const e = document.createElement('div')
      e.innerHTML = content
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
    return 'loading...'
  }
  return (
    <MainLayout>
      <Container paddingTop='96px' paddingBottom='399px'>
          <TitleWrapper>
          <ArrowLeftOutlined onClick={() => Router.push('/news')} />
          <Title>{newsDetail.name}</Title>
        </TitleWrapper>
        <CreatedTime>{moment(newsDetail.created_at).format('DD MMM YYYY HH:mm')}</CreatedTime>
        <Image src={newsDetail.image} />
        <Description>
          <p dangerouslySetInnerHTML={{ __html: htmlDecode(newsDetail.description) }} />
        </Description>
      </Container>
    </MainLayout>
  )
}

NewsDetailPage.getInitialProps = ({ query }) => {
  return { 
		newsId: query.newsId
	}
}

export default NewsDetailPage