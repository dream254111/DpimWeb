import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Container from '../../components/Container'
import MainLayout from '../../layouts/main'
import font from '../../helpers/font'
import { message } from 'antd'

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
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <MainLayout>
      <Container>
        <Title>เทคโนโลยีรีไซเคิลฝุ่นสังกะสีจากอุตสาหกรรมชุบเคลือบ สังกะสีแบบจุ่มร้อน (Hot-Dip...</Title>
        <Video id="video" controls autoplay>
          <source src='' type="video/mp4" />
        </Video>
        <DescriptionTitle>รายละเอียด</DescriptionTitle>
        <DescriptionContent>
        <p dangerouslySetInnerHTML={{ __html: '<h2>dfdf</h2>' }} />
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
