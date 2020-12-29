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
  CheckCircleOutlined
} from '@ant-design/icons'
import font from '../../../helpers/font'
import MainLayout from '../../../layouts/main'
import styled from 'styled-components'
import API from '../../../helpers/api'
import axios from 'axios'
import { connect } from 'react-redux'
import { PreExamSummary } from '../../../components/learn'

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


const { SubMenu } = Menu

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

  const [collapsed, setCollapsed] = useState(false)
  const [courseDetail, setCourseDetail] = useState({})
  const [menu, setMenu] = useState('1')
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
        console.log('responseWithData', responseWithData)
        setCourseDetail(responseWithData.data)
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              toggleCollapsed={collapsed}
              onClick={({key}) => setMenu(key)}
            >
              <Menu.Item key="1" icon={<FileTextOutlined />}>
                ภาพรวมคอร์ส
              </Menu.Item>
              
              <Menu.Item key="2" icon={<FileTextOutlined />}>
                แบบทดสอบก่อนเรียน
              </Menu.Item>
              {
                courseLessons.map((item, index) => (
                  <Menu.Item
                    key={index + 3}
                  >
                    {item.name}
                  </Menu.Item>
                ))
              }
              <Menu.Item key={courseLessons.length + 3} icon={<FileTextOutlined />}>
                แบบทดสอบหลังเรียน
              </Menu.Item>
              
            </Menu>
          </Col>
          <Col lg={18}>
            <MenuHeader>
              {courseName}
              {/* <Button type="primary" onClick={() => setCollapsed(collapsed => !collapsed)} >
                {
                  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
              </Button> */}
            </MenuHeader>
            {
              menu === '1' &&
              <>
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
              <PreExamSummary
                score='4'
                maxScore='5'
                nextChapterName={courseLessonOne}
                onClickNextChapter={() => setMenu('3')}
              />
            }
            {
              menu === '2' &&
              <PreExam>
                <PreExamTitle>แบบทดสอบก่อนเรียน</PreExamTitle>
                <PreExamItems>
                  <PreExamItem>
                    <PreExamWQuestion>วงกลมวงหนึ่ง เมื่อเพิ่มความยาวเส้นผ่านศูนย์กลางเป็น 4 เท่าพื้นที่วงกลมใหม่จะเพิ่มขึ้นกี่เท่าจากวงกลมเดิม</PreExamWQuestion>
                    <PreExamChoices>
                      <PreExamChoice active={true}><PreExamNo>1.</PreExamNo>4 เท่า</PreExamChoice>
                      <PreExamChoice><PreExamNo>2.</PreExamNo>8 เท่า</PreExamChoice>
                      <PreExamChoice><PreExamNo>3.</PreExamNo>15 เท่า</PreExamChoice>
                      <PreExamChoice><PreExamNo>4.</PreExamNo>16 เท่า</PreExamChoice>
                    </PreExamChoices>
                  </PreExamItem>
                </PreExamItems>
                <Button
                  type='primary'
                  style={{float: 'right', marginTop: '32px'}}
                  onClick={() => setMenu('3')}
                >{courseLessonOne}</Button>
              </PreExam>
            }
          </Col>
        </Row>
      </Wrapper>
    </MainLayout>
  )
}

const PreExam = styled('div')`
  margin-top: 32px;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
`

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
    ${PreExamNo} {
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

const PreExamNo = styled('div')`
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
