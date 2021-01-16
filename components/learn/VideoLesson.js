import styled from 'styled-components'
import { useRef, useEffect, useState } from 'react'
import font from '../../helpers/font'
import { InteractiveQuestionModal } from '../../components/modals'
import moment from 'moment'
import ReactPlayer from 'react-player'

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
  attachmentFile
}) => {
  const videoRef = useRef(null)
  const [isInteractiveModalOpen, setIsInteractiveModalOpen] = useState(false)
  const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [interactiveDetail, setInteractiveDetail] = useState({})
  const [opendedInteractive, setOpendedIntereactive] = useState([])

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
      video.seekTo(videoPosition)
      setPlaying(true)
    }
  }, [mainVideo])

  const videoOnProgressHandle = async (e) => {
    const playedSeconds = e.playedSeconds
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
    if (percent === 100) {
      await handleStampVideoLesson(currentTime.toFixed(2), 100)
      await fetchCourseDetail()
    }
    if (isInteractive) {
      const currentTimeWithFormat = moment(currentTime * 1000).format('mm:ss')
      const interactiveDetail = interactive.find(item => moment(item.interactive_time, 'HH:mm:ss').format('mm:ss') === currentTimeWithFormat)
      if (interactiveDetail && !opendedInteractive.includes(interactiveDetail.id)) {
        setPlaying(false)
        setInteractiveDetail(interactiveDetail)
        setIsInteractiveModalOpen(true)
        const _opendedInteractive = JSON.parse(JSON.stringify(opendedInteractive))
        _opendedInteractive.push(interactiveDetail.id)
        setOpendedIntereactive(_opendedInteractive)
      }
    }
  }
  return (
    <>]
      <InteractiveQuestionModal
        isOpen={isInteractiveModalOpen}
        interactive={interactiveDetail}
        onSubmit={() => {
          setIsInteractiveModalOpen(false)
          setPlaying(true)
        }}
      />
      <MenuHeader>{title}</MenuHeader>
      <ReactPlayer
        ref={videoRef}
        playing={playing}
        url={mainVideo.original}
        width='100%'
        height='600px'
        controls={true}
        onProgress={(e) => videoOnProgressHandle(e)}
        onSeek={e => {
          const currentTime = videoRef.current.getCurrentTime()
          if (videoPosition > videoCurrentTime) {
          } else if (currentTime > videoCurrentTime) {
            videoRef.current.seekTo(videoCurrentTime, 'seconds')
          }
        }}
      />
      <DescriptionTitle>คำอธิบาย</DescriptionTitle>
      <DescriptionValue>
        <p dangerouslySetInnerHTML={{ __html: htmlDecode(description) }} />
      </DescriptionValue>
      {
        attachmentFile &&
          <Attachment>
            <AttachmentTitle>เอกสารประกอบการเรียน</AttachmentTitle>
            {JSON.stringify(attachmentFile)}
          </Attachment>
      }
    </>
  )
}

export default VideoLesson
