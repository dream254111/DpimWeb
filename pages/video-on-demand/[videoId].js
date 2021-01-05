import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import MainLayout from '../../layouts/main'
import font from '../../helpers/font'
import { message } from 'antd'
import axios from 'axios'
import API from '../../helpers/api'

const Title = styled('div')`
  background-color: #00937B;
  color: white;
  width: 100%;
  text-align: center;
  padding: 12px;
`

const Video = styled('video')`
  width: 100%;
  height: 70vh;
  border: unset;
  line-height: 0;
`


const DescriptionTitle = styled('div')`
  background-color: white;
  padding: 12px 24px;
  font-family: ${font.bold};
`

const DescriptionContent = styled('div')`
  padding: 24px;
  background-color: #F9F9F9;
`

const SubTitle = styled('div')`
  font-family: ${font.bold};
`


const VideoIdPage = ({ videoId }) => {
  const [videoDetail, setVideoDetail] = useState({})

  useEffect(() => {
    fetchVideoDetailById()
  }, [])

  const fetchVideoDetailById = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetVideo?id=${videoId}`
      })
      setVideoDetail(response.data.data.data)
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <MainLayout>
      <Container>
        <Title>{videoDetail.name}</Title>
        {/** ตรงนี้เป็นลิ้งก์ youtube นะ */}
        <Video id="video" controls autoplay>
          <source src={videoDetail.video} type="video/mp4" />
        </Video>
        <DescriptionTitle>รายละเอียด</DescriptionTitle>
        <DescriptionContent>
          <SubTitle>- คำอธิบาย</SubTitle>
          <p dangerouslySetInnerHTML={{ __html: videoDetail.description }} />
          <SubTitle>- ผู้จัดทำ</SubTitle>
          <div>{videoDetail.producer_name}</div>
          {
            videoDetail.attachment && <div>
              <SubTitle>- ไฟล์แนบ</SubTitle>
              <a href={videoDetail.attachment} target='_blank'>
                เอกสารแนบ
              </a>
            </div>
          }
        </DescriptionContent>
      </Container>
    </MainLayout>
  )
}

VideoIdPage.getInitialProps = (ctx) => {
  const { videoId } = ctx.query
  return { videoId }
}

export default VideoIdPage