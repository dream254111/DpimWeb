import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
import Container from '../../components/Container'
import MainLayout from '../../layouts/main'
import font from '../../helpers/font'
import { message, Dropdown, Menu } from 'antd'
import axios from 'axios'
import API from '../../helpers/api'
import ReactPlayer from 'react-player'
import { VIDEO_QUALITY } from '../../constants'
import { SettingOutlined, CheckOutlined } from '@ant-design/icons'

const Title = styled('div')`
  background-color: #00937B;
  color: white;
  width: 100%;
  text-align: center;
  padding: 12px;
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


const ControllsWrapper = styled('div')`
  position: absolute;
  right: 14%;
  bottom: 5.2%;
  cursor: pointer;
  color: white;
  transition: visibility 0.4s linear,opacity 0.4s linear;
  visibility: hidden;
  opacity: 0;
}
`

const PlayerWrapper = styled('div')`
  position: relative;
  :hover {
    ${ControllsWrapper} {
      visibility:visible;
    opacity:1;
    }
  }
`

const VideoIdPage = ({ videoId }) => {
  const [videoDetail, setVideoDetail] = useState({})
  const [playing, setPlaying] = useState(false)
  const [currentVideoQuality, setCurrentVideoQuality] = useState(VIDEO_QUALITY['Original'])
  const [temp, setTemp] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    fetchVideoDetailById()
  }, [])

  const fetchVideoDetailById = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetVideo?id=${videoId}`
      })
      console.log('response', response.data.data.data)
      setVideoDetail(response.data.data.data)
    } catch (error) {
      message.error(error.message)
    }
  }

  
  const qualityMenu = (
    <Menu>
      {
        Object.keys(VIDEO_QUALITY).map((key, index) => (
          <Menu.Item
            key={index}
            onClick={() => {
              const currentTime = videoRef.current.getCurrentTime()
              setCurrentVideoQuality(VIDEO_QUALITY[key])
              setTimeout(() => {
                videoRef.current.seekTo(currentTime)
                setPlaying(true)
              }, 500)
            }}
          >
            {
              currentVideoQuality === VIDEO_QUALITY[key] &&
                <CheckOutlined />
            }
            {key}
          </Menu.Item>
        ))
      }
    </Menu>
  )
  return (
    <MainLayout>
      <Container style={{paddingTop: '64px'}}>
        <Title>{videoDetail.name}</Title>
        {
          videoDetail && videoDetail.video &&
          <PlayerWrapper>
            <ReactPlayer
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
              ref={videoRef}
              onContextMenu={e => e.preventDefault()}
              playsinline
              playing={playing}
              url={videoDetail.video[currentVideoQuality]}
              width='100%'
              height='600px'
              controls={true}
            />
            <ControllsWrapper>
              <Dropdown overlay={qualityMenu} placement="topRight" trigger={['click']} >
                <SettingOutlined />
              </Dropdown>
            </ControllsWrapper>
          </PlayerWrapper>
        }
        <DescriptionTitle>คำอธิบาย</DescriptionTitle>
        <DescriptionContent>
          <p dangerouslySetInnerHTML={{ __html: videoDetail.description }} />
          <SubTitle>ผู้จัดทำ</SubTitle>
          <div>{videoDetail.producer_name}</div>
          <div>02 202 3904</div>
          <div>dpimacademy@gmail.com</div>
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
