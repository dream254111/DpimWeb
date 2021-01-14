import { Menu, Row, Col, message, Progress, Popover } from 'antd'
import { Button, Container } from '../../../components'
import { useState, useEffect } from 'react'
import {
  FileTextOutlined,
  ArrowLeftOutlined,
  PlayCircleOutlined,
  FormOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import font from '../../../helpers/font'
import MainLayout from '../../../layouts/main'
import styled from 'styled-components'
import API from '../../../helpers/api'
import axios from 'axios'
import { connect } from 'react-redux'
import { PreExamSummary, PreExam, PostExam, VideoLesson, Exercise, PostExamSummary } from '../../../components/learn'
import Router from 'next/router'
import ReactPlayer from 'react-player'
import { timeConvert } from '../../../helpers/util'
import dynamic from 'next/dynamic'
const QierPlayer = dynamic(() => import('qier-player'), { ssr: false })
// import QierPlayer from 'qier-player'
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

  const fetchCourseDetail = async () => {
    try {
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Course/course_by_id?course_id=${courseId}`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
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
  const courseLessons = courseDetail.course_lesson || []
  const courseLessonOne = courseDetail.course_lesson && courseDetail.course_lesson.length > 0 && courseDetail.course_lesson[0].name || ''  
  const examPreTests = courseDetail.exam_pre_test || []
  const examPostTests = courseDetail.exam_post_test || []
  const isPreTestPass = courseDetail.pre_test_pass
  const isPostTestPass = courseDetail.post_test_pass

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
          percent={obj.video_position || 0}
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
                <CourseInstructure>โดย ณัฐวุฒิ พึงเจริญพงศ์ (หมู)</CourseInstructure>
              </CourseDetail>
            </CourseDetailWrapper>
            <Menu
              defaultSelectedKeys={[1]}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
              onClick={({key}) => {
                fetchCourseDetail()
                setMenu(key)
                window.scrollTo({ top: 0, behavior: 'smooth' })
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
                  <SubMenu key={`sub${index}`} title={renderLessonTitle(item, index + 1)}>
                    <Menu.Item
                      style={{height: '65px'}}
                      key={item.id}
                      // icon={<PlayCircleOutlined />}
                      disabled={courseDetail.can_use_pre_test}
                    >{renderVideoTitle(item)}</Menu.Item>
                    {
                      item && item.exercise && item.exercise.length > 0 &&
                      <Menu.Item
                        key={(item.id).toString() + '0'}
                        icon={<FormOutlined />}
                        disabled={courseDetail.can_use_pre_test}
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
                    <ReactPlayer
                      url={courseDetail.course.video.original}
                      width='100%'
                      height='600px'
                      controls={true}
                      config={{
                        file: {
                          // forceHLS: true,
                          // forceFLV: true,
                          // forceDASH: true,
                          attributes: {
                            poster: courseDetail.course.video.thumbnail,
                          },
                          // hlsOptions: {
                          //   media: courseDetail.course.video.original,
                          //   levels: [courseDetail.course.video.original, courseDetail.course.video.p_480, courseDetail.course.video.p_720, courseDetail.course.video.p_1080],
                          //   // currentLevel: 1,
                          //   // nextLevel: 1
                          // }
                        }
                      }}
                    />
                    // <QierPlayer
                    //   width='100%'
                    //   height={600}
                    //   showVideoQuality={true}
                    //   srcOrigin={courseDetail.course.video.original}
                    //   src480p={courseDetail.course.video.p_480}
                    //   src720p={courseDetail.course.video.p_720}
                    //   src1080p={courseDetail.course.video.p_1080}
                    // />
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
