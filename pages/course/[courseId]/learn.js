import { Menu, Row, Col, message, Progress, Popover, Dropdown } from 'antd'
import { Button, Container } from '../../../components'
import { useState, useEffect, useRef } from 'react'
import {
  FileTextOutlined,
  ArrowLeftOutlined,
  PlayCircleOutlined,
  FormOutlined,
  CheckOutlined,
  SettingOutlined
} from '@ant-design/icons'
import font from '../../../helpers/font'
import MainLayout from '../../../layouts/main'
import styled from 'styled-components'
import API from '../../../helpers/api'
import axios from 'axios'
import { connect } from 'react-redux'
import { PreExamSummary, PreExam, PostExam, VideoLesson, Exercise, PostExamSummary } from '../../../components/learn'
import Router, { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import { timeConvert } from '../../../helpers/util'
import dynamic from 'next/dynamic'
import { VIDEO_QUALITY } from '../../../constants'
import {
  isMobile
} from 'react-device-detect'

const { SubMenu } = Menu
const Wrapper = styled('div')`
  width: 100%;
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

const CourseDetailWrapper = styled('div')`
  padding: 16px 18px;
  display: flex;
  align-items: center;
  background: #F2F2F2;
`

const CourseDetail = styled('div')`
  margin-left: 15px;
`

const CourseTitle = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
`

const CourseInstructure = styled('div')`
`


const TitleLesson = styled('div')`
  display: flex;
  align-items: center;
`

const TitleLessonText = styled('div')`
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
`

const VideoTitleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

const VideoTitle = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const VideoTitleLeft = styled('div')`
  display: flex;
  align-items: center;
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

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const LearnPage = ({
  memberToken,
  courseId
}) => {
  useEffect(() => {
    fetchCourseDetail(true)
  }, [])

  const [collapsed, setCollapsed] = useState(false)
  const [courseDetail, setCourseDetail] = useState({})
  const [menu, setMenu] = useState('1')
  const videoRef = useRef(null)
  const courseName = courseDetail.course && courseDetail.course.name
  const courseObjective = courseDetail.course && courseDetail.course.objective_course
  const courseLessons = courseDetail.course_lesson || []
  const courseLessonOne = courseDetail.course_lesson && courseDetail.course_lesson.length > 0 && courseDetail.course_lesson[0].name || ''  
  const examPreTests = courseDetail.exam_pre_test || []
  const examPostTests = courseDetail.exam_post_test || []
  const isPreTestPass = courseDetail.pre_test_pass
  const isPostTestPass = courseDetail.post_test_pass
  const isTrialClass = courseDetail.trial_class
  let lessonSelected = courseLessons.find(item => (item.id + '00') == menu)


  const fetchCourseDetail = async (isFirst = false) => {
    try {
      const request = {
        method: 'GET',
        url: `${API.url}/Course/course_by_id?course_id=${courseId}`
      }
      if (memberToken) {
        request.headers = {
          'Authorization': memberToken
        }
      }
      const response = await axios(request)
      const responseWithData = response.data
      if (responseWithData.success) {
        setCourseDetail(responseWithData.data)
        if (isFirst === true && responseWithData.data.continue_learning && responseWithData.data.continue_learning.continue_lern === true) {
          const menu = responseWithData.data.continue_learning.id + '00'
          const _courseLessons = responseWithData.data.course_lesson
          setMenu(menu)
          lessonSelected = _courseLessons.find(item => (item.id + '00') == menu)
          if (responseWithData.data.not_yet_learn === true) {
            message.error('ยังไม่ถึงเวลาเรียน')
            Router.push(`/course/${courseId}`)
          }
        }
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const [currentVideoQuality, setCurrentVideoQuality] = useState(VIDEO_QUALITY['Original'])
  const qualityMenu = (
    <Menu>
      {
        Object.keys(VIDEO_QUALITY).map(key => (
          <Menu.Item onClick={() => {
            const currentTime = videoRef.current.getCurrentTime()
            setCurrentVideoQuality(VIDEO_QUALITY[key])
            setTimeout(() => {
              videoRef.current.seekTo(currentTime)
              setPlaying(true)
            }, 500)
          }}>
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

  const onFinishedExercise = async (courseLessonId) => {
    try {
      const request = {
        headers: {
          'Authorization': memberToken
        },
        method: 'PUT',
        url: `${API.url}/Course/stamp_exercise`,
        data : {
          course_id: courseId,
          course_lesson_id: courseLessonId
        }
      }
      const response = await axios(request)
      await fetchCourseDetail()
      const responseWithData = response.data
      if (responseWithData.success) {
        const courselessonIndex = courseLessons.findIndex(item => item.id === courseLessonId)
        if (courseLessons.length - 1 === courselessonIndex) {
          if (courseDetail.can_use_post_test) {
            setMenu('999')
          } else {
            message.error('คุณยังไม่ผ่านเงื่อนไขการทำแบบทดสอบท้ายบท')
          }
        } else {
          setMenu(courseLessons[courselessonIndex + 1].id)
        }
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  
  const handleStampVideoLesson = async (courseLessonId, videoPosition, videoProgress) => {
    try {
      const request = {
        headers: {
          'Authorization': memberToken
        },
        method: 'PUT',
        url: `${API.url}/Course/stamp_video_lesson`,
        data : {
          course_id: courseId,
          course_lesson_id: courseLessonId,
          video_position: videoPosition,
          video_progress: videoProgress
        }
      }
      const response = await axios(request)
      const responseWithData = response.data
      if (responseWithData.success) {
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const renderLesson = () => {
    if (lessonSelected) {
      return (
        <VideoLesson
          title={lessonSelected.name}
          description={lessonSelected.description}
          mainVideo={lessonSelected.main_video}
          handleStampVideoLesson={(videoPosition, videoProgress) => handleStampVideoLesson(lessonSelected.id, videoPosition, videoProgress)}
          interactiveTime={lessonSelected.interactive_time}
          interactiveVideo1={lessonSelected.interactive_video_1}
          interactiveVideo2={lessonSelected.interactive_video_2}
          videoPosition={lessonSelected.video_position}
          isInteractive={lessonSelected.is_interactive}
          attachmentFile={lessonSelected.attachment}
          interactive={lessonSelected.interactive}
          fetchCourseDetail={() => fetchCourseDetail()}
        />
      )
    } else {
      const examSelected = courseLessons.find(item => (item.id).toString() + '0' == menu)
      const examIndex = courseLessons.findIndex(item => (item.id).toString() + '0' == menu)
      const isLatest = courseLessons.length - 1 === examIndex
      if (examSelected) {
        return (
          <Exercise
            exercises={examSelected.exercise}
            onSubmit={() => onFinishedExercise(examSelected.id)}
            canUsePostTest={courseDetail.can_use_post_test}
            isLatest={isLatest}
          />
        )
      }
    }
  }

  const renderLessonTitle = (obj, lessonNo) => {
    const title = `บทที่ ${lessonNo} : ${obj.name}`
    return (
      <TitleLesson>
        {
          obj.done_exercise && obj.done_lesson &&
          <CheckOutlined style={{ color: 'green' }} />
        }
        <Popover content={title}>
          <TitleLessonText>{title}</TitleLessonText>
        </Popover>
      </TitleLesson>
    )
  }

  const renderVideoTitle = (obj) => {
    return (
      <VideoTitleWrapper>
        <VideoTitle>
          <VideoTitleLeft>
            <PlayCircleOutlined />
            <div>วีดีโอ</div>
          </VideoTitleLeft>
        <div>{timeConvert(obj.time)}</div>
        </VideoTitle>
        <Progress
          percent={obj.done_lesson ? 100 : obj.video_position || 0}
          showInfo={false}
          strokeWidth={2}
          strokeColor={{
            '0%': '#00937B',
            '100%': '#00937B',
            }}
        />
      </VideoTitleWrapper>
    )
  }
  return (
    <MainLayout>
      <Wrapper>
        <Row>
          <Col xs={24} lg={6} style={{ backgroundColor: 'white' }}>
            <CourseDetailWrapper>
              <ArrowLeftOutlined
                style={{ fontSize: '18px' }}
                onClick={() => Router.push('/course')}
              />
              <CourseDetail>
                <CourseTitle>{courseName}</CourseTitle>
                {
                  lessonSelected &&
                    <CourseInstructure>โดย {lessonSelected.instructor.firstname} {lessonSelected.instructor.lastname}</CourseInstructure>
                }
              </CourseDetail>
            </CourseDetailWrapper>
            <Menu
              selectedKeys={[menu]}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
              onClick={({key}) => {
                fetchCourseDetail()
                setMenu(key)
                if(!isMobile) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
            >
              <Menu.Item key={1} icon={<FileTextOutlined />}>
                ภาพรวมคอร์ส
              </Menu.Item>
              <Menu.Item key={2} icon={<FileTextOutlined />}
                disabled={!courseDetail.can_use_pre_test}
              >
                แบบทดสอบก่อนเรียน
              </Menu.Item>
              {
                courseLessons.map((item, index) => (
                  <SubMenu key={`sub${item.id + '00'}`} title={renderLessonTitle(item, index + 1)}>
                    <Menu.Item
                      style={{height: '65px'}}
                      key={item.id + '00'}
                      // icon={<PlayCircleOutlined />}
                      disabled={courseDetail.can_use_pre_test || (isTrialClass === true && index !== 0)}
                    >{renderVideoTitle(item)}</Menu.Item>
                    {
                      item && item.exercise && item.exercise.length > 0 &&
                      <Menu.Item
                        key={(item.id).toString() + '0'}
                        icon={<FormOutlined />}
                        disabled={courseDetail.can_use_pre_test || (isTrialClass === true && index !== 0)}
                      >คำถามท้ายบท {index + 1}</Menu.Item>
                    }
                  </SubMenu>
                ))
              }
              <Menu.Item
                key={999}
                icon={<FileTextOutlined />}
                disabled={!courseDetail.can_use_post_test}
              >
                แบบทดสอบหลังเรียน
              </Menu.Item>
            </Menu>
          </Col>
          <Col xs={24} lg={18}>
            {
              menu === '1' &&
              <>
                <MenuHeader>
                  {courseName}
                </MenuHeader>
                {
                  process.browser && courseDetail && courseDetail.course &&
                  <PlayerWrapper>
                    <ReactPlayer
                      playsinline
                      ref={videoRef}
                      url={courseDetail.course.video[currentVideoQuality]}
                      width='100%'
                      height='600px'
                      controls={true}
                      onContextMenu={e => e.preventDefault()}
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload',
                            poster: courseDetail.course.video.thumbnail,
                          },
                        }
                      }}
                    />
                    <ControllsWrapper>
                      <Dropdown overlay={qualityMenu} placement="topRight" trigger={['click']}>
                        <SettingOutlined />
                      </Dropdown>
                    </ControllsWrapper>
                  </PlayerWrapper>
                }
                <DescriptionTitle>คำอธิบาย</DescriptionTitle>
                <DescriptionValue>
                  {/* https://github.com/cure53/DOMPurify */}
                  <p dangerouslySetInnerHTML={{ __html: courseObjective }} />
                </DescriptionValue>
              </>
            }
            {
              menu === '2' &&
              isPreTestPass &&
              <>
                <MenuHeader>
                  {courseName}
                </MenuHeader>
                <PreExamSummary
                  score={courseDetail.score_pre_test}
                  maxScore={courseDetail.total_exam}
                  percent={courseDetail.percent_post_test}
                  nextChapterName={courseLessonOne}
                  onClickNextChapter={() => setMenu('3')}
                  isShowNextChapterButton={false}
                />
              </>
            }
            {
              menu === '2' && courseDetail.can_use_pre_test &&
                <>
                  <MenuHeader>{courseName}</MenuHeader>
                  <PreExam
                    courseId={courseDetail.course.id}
                    exams={examPreTests}
                    onSelectChoice={(value) => console.log('onSelectChoice', value)}
                    nextChapterName={courseLessonOne}
                    isFinished={courseDetail.can_use_pre_test}
                    onSubmit={() => fetchCourseDetail()}
                  />
                </>
            }
            {
              renderLesson()
            }
             {
              menu == 999 &&
              isPostTestPass &&
              <>
                <MenuHeader>
                  {courseName}
                </MenuHeader>
                <PostExamSummary
                  courseId={courseId}
                  score={courseDetail.score_post_test || 0}
                  maxScore={courseDetail.total_exam || 0}
                  percent={courseDetail.percent_post_test || 0}
                  isShowEvaluationButton={courseDetail.can_use_evaluation}
                />
              </>
            }
            {
              menu == 999 && !isPostTestPass &&
              <>
                <MenuHeader>
                  {courseName}
                </MenuHeader>
                <PostExam
                  courseId={courseDetail.course.id}
                  exams={examPostTests}
                  onSelectChoice={(value) => console.log('onSelectChoice', value)}
                  nextChapterName={courseLessonOne}
                  onSubmit={(values) => onSubmitPostExam(values)}
                />
              </>
            }
          </Col>
        </Row>
      </Wrapper>
    </MainLayout>
  )
}

LearnPage.getInitialProps = ({ query }) => {
  const { courseId } = query
  return {
    courseId
  }
}

export default connector(LearnPage)
