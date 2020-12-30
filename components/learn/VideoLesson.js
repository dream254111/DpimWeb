import styled from 'styled-components'
import { useRef, useEffect } from 'react'
import font from '../../helpers/font'

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


const VideoLesson = ({
  videoLink,
  videoObjective
}) => {
  const videoRef = useRef(null)
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
      console.log('video', video)
      var supposedCurrentTime = 0;
      const handleTimeUpdate = () => {
        if (!video.seeking) {
          supposedCurrentTime = video.currentTime
        }
      }

      const handleSeeking = () => {
        var delta = video.currentTime > supposedCurrentTime
        if (Math.abs(delta) > 0.01) {
          video.currentTime = supposedCurrentTime
        }
      }

      const handleEnded = () => {
        supposedCurrentTime = 0
      }
      // video.addEventListener('timeupdate', handleTimeUpdate)
      // video.addEventListener('seeking', handleSeeking)
      // video.addEventListener('ended', handleEnded)
      return () => {
        // video.removeEventListener('timeupdate', handleTimeUpdate)
        // video.removeEventListener('seeking', handleSeeking)
        // video.removeEventListener('ended', handleEnded)
      }
    }, [videoRef])
  }
  addVideoEvent(videoRef)
  return (
    <>
     <Video id="video" controls autoplay muted ref={videoRef}>
        <source src={videoLink} type="video/mp4" />
      </Video>
      <DescriptionTitle>คำอธิบาย</DescriptionTitle>
      <DescriptionValue>
      {/* https://github.com/cure53/DOMPurify */}
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(videoObjective) }} />
      </DescriptionValue> 
    </>
  )
}

export default VideoLesson
