import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import font from '../../helpers/font'
import { InteractiveVideoModal } from '../../components/modals'
import moment from 'moment'
import ReactPlayer from 'react-player'

const Video = styled('video')`
  width: 100%;
  height: 70vh;
  border: unset;
  line-height: 0;
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

let interval
const VideoLesson = ({
  title,
  description,
  mainVideo,
  videoPosition,
  handleStampVideoLesson,
  interactiveTime,
  interactiveVideo1,
  interactiveVideo2
}) => {
  const videoRef = useRef(null)
  const [isInteractiveVideoModalOpen, setIsInteractiveVideoModalOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState(mainVideo)
  const [videoCurrentTime, setVideoCurrentTime] = useState(0)

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
      console.log('videoPosition', videoPosition)
      videoRef.current.seekTo(videoPosition)
    }
  }, [mainVideo])

  const onOpenVideoInteractive = () => {
    videoRef.current.playing(false)
    setIsInteractiveVideoModalOpen(true)
  }

  const onSelectVideoInteractive = (key) => {
    switch (key) {
      case 1:
        setVideoSrc(interactiveVideo1)
        videoRef.current.play()
        break;
      case 2:
        setVideoSrc(interactiveVideo2)
        videoRef.current.play()
        break
      default: null
    }

    setIsInteractiveVideoModalOpen(false)
  }

  const videoOnProgressHandle = (e) => {
    const playedSeconds = e.playedSeconds
    setVideoCurrentTime(playedSeconds)
    const video = videoRef.current
    const duration = video.getDuration()
    const currentTime = video.getCurrentTime()
    if (playedSeconds > 0 && +playedSeconds.toFixed() % 5 === 0) {
      const percent = (currentTime / duration) * 100
      if (currentTime.toFixed(2) > videoPosition) {
        handleStampVideoLesson(currentTime.toFixed(2), percent.toFixed(2))
      }
    }
    if (interactiveTime && videoSrc === mainVideo) {
      const _interactiveTime = moment(interactiveTime, 'HH:mm:ss').format('mm:ss')
      const currentTimeWithFormat = moment(currentTime * 1000).format('mm:ss')
      if (_interactiveTime === currentTimeWithFormat) {
        onOpenVideoInteractive()
      }
    }
  }
  return (
    <>
      <InteractiveVideoModal
        isOpen={isInteractiveVideoModalOpen}
        onSubmit={(key) => onSelectVideoInteractive(key)}
      />
      <MenuHeader>{title}</MenuHeader>
          <ReactPlayer
            ref={videoRef}
            url={videoSrc.original}
            width='100%'
            height='600px'
            controls={true}
            onProgress={(e) => videoOnProgressHandle(e)}
            onSeek={e => {
              const currentTime = videoRef.current.getCurrentTime()
              // console.log('videoCurrentTime', videoCurrentTime)
              if (videoPosition > videoCurrentTime) {

              } else if (currentTime > videoCurrentTime) {
                videoRef.current.seekTo(videoCurrentTime, 'seconds')
                // console.log('not allow to seek')
              }
            }}
          />
        <DescriptionTitle>คำอธิบาย</DescriptionTitle>
        <DescriptionValue>
          <p dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
        </DescriptionValue> 
    </>
  )
}

export default VideoLesson
