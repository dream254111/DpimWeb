import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import font from '../../helpers/font'
import { InteractiveVideoModal } from '../../components/modals'
import moment from 'moment'

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
  handleStampVideoLesson,
  interactiveTime,
  interactiveVideo1,
  interactiveVideo2
}) => {
  const videoRef = useRef(null)
  const [isInteractiveVideoModalOpen, setIsInteractiveVideoModalOpen] = useState(false)
  const [videoSrc, setVideoSrc] = useState(mainVideo)
  const htmlDecode = (content) => {
    if (process.browser) {
      const e = document.createElement('div')
      e.innerHTML = content
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
    return 'loading...'
  }
  const addVideoEvent = (ref) => {
    useEffect(() => {
      const video = videoRef.current
      var supposedCurrentTime = 0;
      const handleTimeUpdate = () => {
        if (!video.seeking) {
          if (interactiveTime && videoSrc === mainVideo) {
            const currentTime = Math.floor(video.currentTime / 60)+':'+Math.floor(video.currentTime % 60);
            const _interactiveTime = moment(interactiveTime, 'HH:mm:ss').format('mm:ss')
            const _currentTime = moment(currentTime, 'mm:ss').format('mm:ss')
            console.log('_interactiveTime', _interactiveTime)
            console.log('_currentTime', _currentTime)
            if (_interactiveTime === _currentTime) {
              onOpenVideoInteractive()
            }
          }
        }
      }

      interval = setInterval(() => {
        const duration = video.duration;
        const buffered_percentage = (video.currentTime / duration) * 100;
        handleStampVideoLesson(video.currentTime.toFixed(2), buffered_percentage.toFixed(2))
      }, 5000)

      const handleSeeking = () => {
        var delta = video.currentTime > supposedCurrentTime
        if (Math.abs(delta) > 0.01) {
          video.currentTime = supposedCurrentTime
        }
      }

      const handleEnded = () => {
        supposedCurrentTime = 0
      }
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('seeking', handleSeeking)
      video.addEventListener('ended', handleEnded)
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('seeking', handleSeeking)
        video.removeEventListener('ended', handleEnded)
        clearInterval(interval)
      }
    }, [videoRef])
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.currentTime = 0 
    }
  }, [mainVideo])
  addVideoEvent(videoRef)

  const onOpenVideoInteractive = () => {
    clearInterval(interval)
    videoRef.current.pause()
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
  return (
    <>
      <InteractiveVideoModal
        isOpen={isInteractiveVideoModalOpen}
        onSubmit={(key) => onSelectVideoInteractive(key)}
      />
      <MenuHeader>{title}</MenuHeader>
        {
          videoSrc && videoSrc.original &&
          <Video key={videoSrc.original} id="video" controls autoplay muted ref={videoRef}>
            <source src={videoSrc.original} type="video/mp4" />
          </Video>
        }
        <DescriptionTitle>คำอธิบาย</DescriptionTitle>
        <DescriptionValue>
          <p dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
        </DescriptionValue> 
    </>
  )
}

export default VideoLesson
