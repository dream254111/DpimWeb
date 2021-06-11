import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import font from '../../helpers/font'
import { InteractiveQuestionModal } from '../../components/modals'
import moment from 'moment'
import ReactPlayer from 'react-player'
import { Dropdown, Menu } from 'antd'
import { VIDEO_QUALITY } from '../../constants'
import { SettingOutlined, CheckOutlined } from '@ant-design/icons'

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

const DescriptionTitle = styled('div')`
  font-family: ${font.bold};
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  padding: 12px 24px;
  text-align: left;
`

const DescriptionValue = styled('div')`
  min-height: 200px;
  max-height: 500px;
  padding: 24px;
  overflow-y: scroll;
`

const MenuHeader = styled('div')`
  width: 100%;
  background-color: #00937B;
  padding: 12px 0;
  text-align: center;
  color: white;
  box-shadow: 0px 4px 16px rgba(8, 53, 106, 0.08);
  font-family: ${font.bold};
`

const Attachment = styled('div')`
  margin-top: 32px;
`

const AttachmentTitle = styled('div')`
  font-size: 18px;
  margin-top: 32px;
`

const VideoLesson = ({
  title,
  description,
  mainVideo,
  videoPosition,
  handleStampVideoLesson,
  isInteractive,
  interactive,
  fetchCourseDetail,
  attachmentFile,
  order,
  onFinishedVideo = () => {}
}) => {
  const videoRef = useRef(null)
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false)
  const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [interactiveDetail, setInteractiveDetail] = useState({})
  const [opendedInteractive, setOpendedIntereactive] = useState([])
  const [currentVideoQuality, setCurrentVideoQuality] = useState(VIDEO_QUALITY['Original'])
  const [ct, setCt] = useState(0)

  useEffect(() => {
    if (isInteractiveModalOpen === true) {
      setPlaying(false)
    }
  }, [isInteractiveModalOpen])
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

  const htmlDecode = (content) => {
    if (process.browser) {
      const e = document.createElement('div')
      e.innerHTML = content
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
    return 'loading...'
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (videoPosition) {
        video.seekTo(videoPosition)
        setPlaying(true)
      }
    }
  }, [mainVideo])

  useEffect(() => {
    console.log('playing', playing)
  }, [playing])

  const videoOnProgressHandle = async (e) => {
    const playedSeconds = Math.floor(e.playedSeconds)
    setTimeout(() => {
      setCt(e.playedSeconds)
    }, 1000)
    setVideoCurrentTime(playedSeconds)
    const video = videoRef.current
    const duration = video.getDuration()
    const currentTime = video.getCurrentTime()
    const percent = (currentTime / duration) * 100
    if (playedSeconds > 0 && +playedSeconds.toFixed() % 5 === 0) {
      if (currentTime.toFixed(2) > videoPosition) {
        handleStampVideoLesson(currentTime.toFixed(2), percent.toFixed(2))
      }
    }
    if (percent > 99) {
      setPlaying(false)
      await handleStampVideoLesson(currentTime.toFixed(2), 100)
      onFinishedVideo()
    }
    if (isInteractive) {
      const currentTimeWithFormat = moment(currentTime * 1000).format('mm:ss')
      const interactiveDetail = interactive.find(item => moment(item.interactive_time, 'HH:mm:ss').format('mm:ss') === currentTimeWithFormat)
      console.log('interactiveDetail', interactiveDetail)
      if (interactiveDetail && !opendedInteractive.includes(interactiveDetail.id)) {
        setInteractiveDetail(interactiveDetail)
        setIsInteractiveModalOpen(true)
        const _opendedInteractive = JSON.parse(JSON.stringify(opendedInteractive))
        _opendedInteractive.push(interactiveDetail.id)
        setOpendedIntereactive(_opendedInteractive)
        setPlaying(false)
        document.querySelectorAll('video').forEach(vid => vid.pause())
      }
    }
  }
  return (
    <>
      <InteractiveQuestionModal
        isOpen={isInteractiveModalOpen}
        interactive={interactiveDetail}
        pauseVideo={() => setPlaying(false)}
        onSubmit={() => {
          setIsInteractiveModalOpen(false)
          setPlaying(true)
        }}
      />
      <MenuHeader>บทที่ {order} {title}</MenuHeader>
      <PlayerWrapper>
        <ReactPlayer
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          ref={videoRef}
          onContextMenu={e => e.preventDefault()}
          playsinline
          autoPlay
          playing={playing}
          url={mainVideo[currentVideoQuality]}
          width='100%'
          height='600px'
          controls={true}
          loop={false}
          onProgress={(e) => videoOnProgressHandle(e)}
          onSeek={e => {
            const currentTime = videoRef.current.getCurrentTime()
            if (videoPosition > videoCurrentTime) {
            } else if (currentTime > videoCurrentTime) {
              videoRef.current.seekTo(ct, 'seconds')
            }
          }}
        />
        <ControllsWrapper>
          <Dropdown overlay={qualityMenu} placement="topRight" trigger={['click']}>
            <SettingOutlined />
          </Dropdown>
        </ControllsWrapper>

      </PlayerWrapper>
      <DescriptionTitle>คำอธิบาย</DescriptionTitle>
      <DescriptionValue>
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
      </DescriptionValue>
      {
        attachmentFile &&
          <Attachment>
            <AttachmentTitle>เอกสารประกอบการเรียน</AttachmentTitle>
            <a href={attachmentFile} target='_blank' rel='noreferrer'>Download</a>
          </Attachment>
      }
    </>
  )
}

export default VideoLesson
