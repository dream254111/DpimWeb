import { Menu, Row, Col, message } from 'antd'
import { Button, Container } from '../../../components'
import { useState, useEffect, useRef } from 'react'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  FormOutlined
} from '@ant-design/icons'
import font from '../../../helpers/font'
import MainLayout from '../../../layouts/main'
import styled from 'styled-components'
import API from '../../../helpers/api'
import axios from 'axios'
import { connect } from 'react-redux'
import { PreExamSummary, PreExam, PostExam, VideoLesson, Exercise } from '../../../components/learn'
import Router from 'next/router'
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
  font-size: 16px;
  font-family: ${font.bold};
`

const CourseInstructure = styled('div')`
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
    fetchCourseDetail()
  }, [])
  let menuKey = 0
  const [collapsed, setCollapsed] = useState(false)
  const [courseDetail, setCourseDetail] = useState({})
  const [menu, setMenu] = useState(1)
  // const [menuKey, setMenuKey] = useState(0)
  const videoRef = useRef(null)
  let supposedCurrentTime = 0
  const isPlayed = (time, video) => {
    var start = 0, end = 0;
    for (var i = 0; i < video.played.length; i++) {
      start = video.played.start(i);
      end = video.played.end(i);
      if (end - start < 1) {
        continue;
      }
      if (time >= start && time <= end) {
        return true
      }
    }
    return false
  }
  
  // const countMenuKey = () => {
  //   const newMenuKey = menuKey + 1
  //   setMenuKey(newMenuKey)
  //   console.log('newMenuKey', newMenuKey)
  //   return newMenuKey
  // }

  const countMenuKey = () => {
    menuKey = menuKey + 1
    return menuKey
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


  const htmlDecode = (content) => {
    if (process.browser) {
      const e = document.createElement('div')
      e.innerHTML = content
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
    return 'loading...'
  }

  const fetchCourseDetail = async () => {
    try {
      console.log('courseId', courseId)
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Course/course_by_id?course_id=${courseId}`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        console.log('courseDetail', responseWithData.data)
        setCourseDetail(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const onSubmitPreExam = async (values) => {
    console.log('values', values)
    const answer = values.map(item => {
      return {
        course_exam_id: item.course_exam_id,
        answer: item.answer
      }
    })
    console.log('answer, answer')
    try {
      console.log('courseId', courseId)
      const request = {
        headers: {
          'Authorization': memberToken
        },
        method: 'POST',
        url: `${API.url}/Course/send_answer_exam`,
        data: {
          is_pretest: true,
          course_id: courseId,
          answer
        }
      }
      const response = await axios(request)
      const responseWithData = response.data
      console.log('responseWithData', responseWithData)
      if (responseWithData.success) {
        await fetchCourseDetail()
        // setMenu('3')
        // setCourseDetail(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const onSubmitPostExam = async (values) => {
    console.log('values', values)
    const answer = values.map(item => {
      return {
        course_exam_id: item.course_exam_id,
        answer: item.answer
      }
    })
    try {
      const request = {
        headers: {
          'Authorization': memberToken
        },
        method: 'POST',
        url: `${API.url}/Course/send_answer_exam`,
        data: {
          is_pretest: true,
          course_id: courseId,
          answer
        }
      }
      const response = await axios(request)
      const responseWithData = response.data
      console.log('responseWithData', responseWithData)
      if (responseWithData.success) {
        // setCourseDetail(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }




  const courseName = courseDetail.course && courseDetail.course.name
  const courseObjective = courseDetail.course && courseDetail.course.objective_course
  const courseVideoUrl = courseDetail.course && courseDetail.course.video.original
  const courseLessons = courseDetail.course_lesson || []
  const courseLessonOne = courseDetail.course_lesson && courseDetail.course_lesson.length > 0 && courseDetail.course_lesson[0].name || ''  
  const examPreTests = courseDetail.exam_pre_test || []
  const examPostTests = courseDetail.exam_post_test || []
  const isPreTestPass = courseDetail.pre_test_pass

  
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
      const responseWithData = response.data
      console.log('responseWithData', responseWithData)
      if (responseWithData.success) {
        const courselessonIndex = courseLessons.findIndex(item => item.id === courseLessonId)
        if (courseLessons.length - 1 === courselessonIndex) {
          setMenu('999')
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
      console.log('handleStampVideoLesson', responseWithData)
      if (responseWithData.success) {

      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const renderLesson = () => {
    const lessonSelected = courseLessons.find(item => +item.id === +menu)
    console.log('lessonSelected', lessonSelected)
    if (lessonSelected) {
      return (
        <VideoLesson
          title={lessonSelected.name}
          description={lessonSelected.description}
          mainVideo={lessonSelected.main_video}
          handleStampVideoLesson={(videoPosition, videoProgress) => handleStampVideoLesson(lessonSelected.id, videoPosition, videoProgress)}
        />
      )
    } else {
      const examSelected = courseLessons.find(item => (item.id).toString() + '0' == menu)
      console.log('examSelected', examSelected)
      if (examSelected) {
        return (
          <Exercise
            exercises={examSelected.exercise}
            onSubmit={() => onFinishedExercise(examSelected.id)}
          />
        )
      }
    }
  }
  return (
    <MainLayout>
      <Wrapper>
        <Row>
          <Col lg={6} style={{ backgroundColor: 'white' }}>
            <CourseDetailWrapper>
              <ArrowLeftOutlined
                style={{ fontSize: '18px' }}
                onClick={() => Router.push('/course')}
              />
              <CourseDetail>
                <CourseTitle>{courseName}</CourseTitle>
                <CourseInstructure>โดย ณัฐวุฒิ พึงเจริญพงศ์ (หมู)</CourseInstructure>
              </CourseDetail>
            </CourseDetailWrapper>
            <Menu
              defaultSelectedKeys={[1]}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
              onClick={({key}) => {
                setMenu(key)
              }}
            >
              <Menu.Item key={1} icon={<FileTextOutlined />}>
                ภาพรวมคอร์ส
              </Menu.Item>
              
              <Menu.Item key={2} icon={<FileTextOutlined />}
                // disabled={!courseDetail.can_use_pre_test}
              >
                แบบทดสอบก่อนเรียน
              </Menu.Item>
              {
                courseLessons.map((item, index) => (
                  <SubMenu key="sub1" title={`บทที่ ${index + 1} : ${item.name}`}>
                    <Menu.Item key={item.id} icon={<PlayCircleOutlined />}>วีดีโอ</Menu.Item>
                    {
                      item && item.exercise && item.exercise.length > 0 &&
                      <Menu.Item key={(item.id).toString() + '0'} icon={<FormOutlined />}>คำถามท้ายบท {index + 1}</Menu.Item>
                    }
                  </SubMenu>
                  // <Menu.Item
                  //   key={index + 3}
                  // >
                  //   บทที่&nbsp;{index + 1}&nbsp;:&nbsp;{item.name}
                  // </Menu.Item>
                ))
              }
              <Menu.Item key={999} icon={<FileTextOutlined />} disabled={!courseDetail.can_use_post_test}>
                แบบทดสอบหลังเรียน
              </Menu.Item>
              
            </Menu>
          </Col>
          <Col lg={18}>
            {
              menu === '1' &&
              <>
                <MenuHeader>
                  {courseName}
                  <Button type="primary" onClick={() => setCollapsed(collapsed => !collapsed)} >
                    {
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                  </Button>
                </MenuHeader>
                <Video id="video" controls autoplay muted ref={videoRef}>
                  <source src='https://dpimproject.ddns.net/DpimProjectV2/File/Stream?filename=20201227182144284988_original.mp4' type="video/mp4" />
                </Video>
                <DescriptionTitle>คำอธิบาย</DescriptionTitle>
                <DescriptionValue>
                {/* https://github.com/cure53/DOMPurify */}
                  <p dangerouslySetInnerHTML={{ __html: htmlDecode(courseObjective) }} />
                </DescriptionValue>
              </>
            }
            {
              menu === '2' &&
              isPreTestPass &&
              <>
                <MenuHeader>
                  {courseName}
                  <Button type="primary" onClick={() => setCollapsed(collapsed => !collapsed)} >
                    {
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                  </Button>
                </MenuHeader>
                <PreExamSummary
                  score={courseDetail.score_pre_test}
                  maxScore={courseDetail.total_exam}
                  percent={courseDetail.percent_pre_test}
                  nextChapterName={courseLessonOne}
                  onClickNextChapter={() => setMenu('3')}
                  isShowNextChapterButton={false}
                />
              </>
            }
            {
              menu === '2' &&
              isPreTestPass === false &&
                <>
                  <MenuHeader>
                    {courseName}
                    {/* <Button type="primary" onClick={() => setCollapsed(collapsed => !collapsed)} >
                      {
                        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                      }
                    </Button> */}
                  </MenuHeader>
                  <PreExam
                    exams={examPreTests}
                    onSelectChoice={(value) => console.log('onSelectChoice', value)}
                    nextChapterName={courseLessonOne}
                    onSubmit={(values) => onSubmitPreExam(values)}
                  />
                </>
            }
            {
              renderLesson()
            }
            {
              menu == 999 &&
              <>
                <MenuHeader>
                  {courseName}
                  {/* <Button type="primary" onClick={() => setCollapsed(collapsed => !collapsed)} >
                    {
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                  </Button> */}
                </MenuHeader>
                <PostExam
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

// const PreExam = styled('div')`
//   margin-top: 32px;
//   width: 70%;
//   margin-left: auto;
//   margin-right: auto;
//   margin-bottom: 200px;
// `

const PreExamItems = styled('div')`

`

const PreExamItem = styled('div')`
  display: flex;
  flex-direction: column;
  :not(:first-child) {
    margin-top: 48px;
  }
  :first-child {
    margin-top: 16px;
  }
`

const PreExamWQuestion = styled('div')`
  font-size: 24px;
  position: relative;
  :after {
    content: '${props => props.no}';
    position: absolute;
    color: #C4C4C4;
    font-size: 18px;
    left: -6%;
    top: 7%;
  }
`

const PreExamChoices = styled('div')`
  margin-top: 48px;
`

const PreExamChoice = styled('div')`
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px;
  font-size: 20px;
  ${props => props.active === true && `
    background: rgba(0, 147, 123, 0.08);
    border: 1px solid #00937B;
    ${PreExamChoiceNo} {
      background: #00937B;
      color: white;
    }
  `}
  :not(:first-child) {
    margin-top: 16px;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
`

const PreExamChoiceNo = styled('div')`
  background: white;
  color: black;
  border-radius: 4px;
  margin-right: 22px;
  width: 32px;
  height: 32px;
  font-size: 12px;
  border: 1px solid #F2F2F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`


const PreExamTitle = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
`


LearnPage.getInitialProps = ({ query }) => {
  const { courseId } = query
  return {
    courseId
  }
}

export default connector(LearnPage)
