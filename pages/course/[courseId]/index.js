import MainLayout from '../../../layouts/main'
import styled, { css } from 'styled-components'
import font from '../../../helpers/font'
import {
  Button,
  Tag,
  Container,
  CourseCard,
} from '../../../components/index'
import { maxWidth } from '../../../helpers/breakpoint'
import { useRef, useEffect, useState, useReducer } from 'react'
import { Progress, message, Row, Col, Avatar } from 'antd'
import API from '../../../helpers/api'
import axios from 'axios'
import { timeConvert } from '../../../helpers/util' 
const commaNumber = require('comma-number')
import Router from 'next/router'
import moment from 'moment'
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { PaymentModal, LoginModal } from '../../../components/modals/index'
import constants from '../../../constants'

const Wrapper = styled('div')`
`

const Header = styled('div')`
  width: 100%;
  padding: 12px;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const PrintHere = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  cursor: pointer;
  ${maxWidth.sm`
    display: none;
  `}
`

const HeaderImage = styled('div')`
  min-height: 120px;
  min-width: 214px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  ${maxWidth.sm`
    width: 100%;
    height: 150px;
  `}
`

const HeaderContent = styled('div')`
  display: flex;
  align-items: flex-start;
  ${maxWidth.sm`
    flex-wrap: wrap;
  `}
`

const HeaderDescription = styled('div')`
  margin-left: 12px;
`

const HeaderTitle = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
  color: white;
  ${maxWidth.sm`
    font-size: 22px;
    margin-top: 16px;
  `}
`


const CourseCardDetailText = styled('div')`
  margin-left: 7.33px;
  color: white;
  font-size: 18px;
`

const CourseCardItem = styled('div')`
  display: flex;
  align-items: center;
  :not(:first-child){
    margin-left: 14px;
  }
`

const CourseCardIcon = styled('span')`
  color: white;
`

const CourseCardDetail = styled('div')`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const CourseGroup = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 12px;
`

const TabBar = styled('div')`
  box-sizing: border-box;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
`

const TabMenu = styled('ul')`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  ${maxWidth.md`
    display: none;
  `}
`

const TabItem = styled('div')`
  font-size: 18px;
  line-height: 24px;
  color: #333333;
  cursor: pointer;
`

const Line = styled('div')`
  width: 2px;
  height: 24px;
  background-color: #F2F2F2;
`

const PageColor = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #F9F9F9;
  padding-top: 24px;
`
const CourseOverview = styled('div')`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 4px;
  p {
    font-size: 18px;
    color: #333333;
    margin: 0;
  }
`

const CourseOverviewDetail = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  p {
    margin-bottom: 12px;
    font-size: 18px;
  }
`

const CourseOverviewImageContainer = styled('div')`
  display: flex;
  align-items: center;
`

const CourseOverviewImage = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat:
  background-size: cover;
  width: 100%;
  height: auto;
`

const CourseContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  ${maxWidth.md`
    flex-direction: column;
  `}
`

const LeftContainer = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: 3;
  gap: 16px;
  ${maxWidth.md`
    order: 2;
    flex: 1;
  `}
`

const RightContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1.23;
  gap: 16px;
  ${maxWidth.md`
    order: 1;
    flex: 1;
  `}
`

const CourseTitle = styled('div')`
  margin: 0;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: bold;
`

const CourseExample = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
`

const CourseExampleDetail = styled('div')`
  padding: 16px;
`

const ExampleFont = styled('div')`
  font-size: 14px;
  margin: 0;
  color: #828282;
`

const CoursePrice = styled('div')`
  Padding: 16px;
  h2 {
    margin: 0 0 16px 0;
    font-size: 20px;
    color: #00937B;
    font-weight: bold;
  }
`

const HorizontalLine = styled('div')`
  width: 100%;
  height: 1px;
  background-color: #F2F2F2;
`

const Purpose = styled('div')`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 4px;
`
const PurposeDetail = styled('div')`
  padding: 16px;
  p {
    font-size: 18px;
    margin: 0;
  }
`

const CourseContent = styled('div')`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 4px;
`

const CourseContentDetail = styled('div')`
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
`

const Lesson = styled('div')`
  width: 100%;
  margin-bottom: 28px;
  &:last-child {
    margin-bottom: 0;
  }
  
`
const ChapterTitle = styled('div')`
  color: #333333;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`

const ChapterDetail = styled('div')`
  width:100%;
`
const LessonTopic = styled('div')`
  display: flex;
  flex-direction: row;
`

const LessonName = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  flex: 1;
`

const LessonNameText = styled('div')`
  margin: 0 0 0 8px;
  font-size: 18px;
`

const VideoTime = styled('div')`
  font-size: 18px;
  color: #828282;
  text-align: right;
`

const ChapterItem = styled('div')`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`

const EndofChapterQuestion = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`

const QuestionTitle = styled('div')`
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  margin: 18px 0 8px 0;
`

const QuestionIcon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat:
`

const QuestionName = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`

const QuestionNameText = styled('div')`
  margin-left: 8px;
  font-size: 18px;
  color: #333333;
`

const TotalQuestion = styled('div')`
  font-size: 18px;
  color: #828282;
  text-align: right;
`

const QuestionTopic = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`

const LessonIcon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  backgroun-repeat: no-repeat;
`

const CourseQuiz = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`

const CourseQuizTopic = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 20px;
&:last-child {
  margin-bottom: 0;
}
`

const CourseQuizTitle = styled('div')`
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  margin: 18px 0 8px 0;
`

const CourseQuizName = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`

const QuizIcon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  backgroun-repeat: no-repeat;
`

const CourseQuizNameText = styled('div')`
  margin-left: 8px;
  font-size: 18px;
  color: #333333;
`

const TotalQuiz = styled('div')`
  font-size: 18px;
  color: #828282;
  text-align: right;
`

const Instructors = styled('div')`
  max-height: 300px;
  overflow-y: scroll;
`

const Instructor = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
  :not(:first-child) {
    margin-top: 16px
  }
`
const InstructorDetail = styled('div')`
  padding: 16px;
  h2 {
    margin: 0;
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
  }
`
const InstructorProfile = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }
`
const PicProfile = styled('div')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat:
  border-radius: 50%;
  min-width: 72px;
  min-height: 72px;
  margin-right: 12px;
`
const InstructorInformation = styled('div')`
  padding: 16px;
  p {
    margin: 0;
    font-size: 18px;
    color: #333333;
  }
`

const MoreInfo = styled('div')`
  font-size: 18px;
  margin-top: 8px;
  color: #00937B;
  cursor: pointer;
`

const Advantage = styled('div')`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 4px;
`
const AdvantageDetail = styled('div')`
  padding: 16px;
`

const Benefit = styled('ul')`
  list-style-image: url('/static/images/checkmark.svg');
  padding-left: 16px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  ${maxWidth.md`
    flex-direction: column;
    flex-wrap: nowrap;
  `}
`
const BenefitItem = styled('li')`
  flex-basis: 45%;
  flex-grow: 1;
  margin: 4px 0;
  font-size: 18px;
  color: #333333;
  :nth-child(even) {
    margin-left: 36px;
  }
  ${maxWidth.md`
    :nth-child(even) {
      margin-left: 0;
      flex-basis: 100%;
    }
  `}
`

const Contact = styled('div')`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 4px;
`

const ContactDetail = styled('div')`
  padding: 16px;
`

const ContactCourseOwner = styled('div')`
  margin: 4px 0;
  font-size: 18px;
  color: #333333;
  margin: 8px 0 16px 0;
`

const ContactOwner = styled('div')`
  margin-bottom: 8px;
`

const ContactContent = styled('div')`
  display: flex;
  flex-direction: column;
`

const ContactContentItem = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  p {
    font-size: 14px;
    color: #333333;
    margin: 0;
    margin-left: 8px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

const ContactIcon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
`

const OtherCourse = styled('div')`
  margin-top: 32px;
  margin-bottom: 101px;
`

const CourseInfo = styled('div')`
  display: flex;
  flex-direction: column;
`

const CourseInfoTitle = styled('div')`
  margin: 16px 0 4px 0;
  color: #333333;
  font-size: 18px;
  font-weight: bold;
`

const CourseInfoText = styled('div')`
  color: #333333;
  font-size: 18px;
  margin: 0;
`

const CourseExampleVideo = styled('video')`
  height: 154px;
  width: 100%;
`

const ContinueLearning = styled('div')`
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  ${maxWidth.sm`
    display: none;
  `}
`

const ContinueLearningLeft = styled('div')`
  margin-right: 18px;
`

const ContinueLearningTitle = styled('div')`
  font-size: 14px;
  font-family: ${font.bold};
`

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const CourseDetailPage = ({ courseId, memberToken, memberDetail }) => {
  const scrollRef1 = useRef(null)
  const scrollRef2 = useRef(null)
  const scrollRef3 = useRef(null)
  const scrollRef4 = useRef(null)
  const scrollRef5 = useRef(null)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  const [courseDetail, setCourseDetail] = useState(null)
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false)
  const [isRegisterCourseLoading, setIsRegisterCourseLoading] = useState(false)
  const [isExtendTimeLoading, setIsExtendTimeLoading] = useState(false)
  const executeScroll1 = () => {
    scrollRef1.current.scrollIntoView({behavior: "smooth"})
  }
  const executeScroll2 = () => {
    scrollRef2.current.scrollIntoView({behavior: "smooth"})
  }
  const executeScroll3 = () => {
    scrollRef3.current.scrollIntoView({behavior: "smooth"})
  }
  const executeScroll4 = () => {
    scrollRef4.current.scrollIntoView({behavior: "smooth"})
  }
  const executeScroll5 = () => {
    scrollRef5.current.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    fetchCourseInfo()
    window.scrollTo(0, 0)
  }, [courseId])

  const fetchCourseInfo = async () => {
    try {
      const headers = memberToken ?  {
        'Authorization': memberToken
      } : undefined
      const response = await axios({
        headers,
        method: 'GET',
        url: `${API.url}/Course/course_info?course_id=${courseId}`
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

  const registerCourse = async () => {
    if (memberToken) {
      if (courseDetail.course.is_has_cost) {
        switch(memberDetail.student_account_type_id) {
          case constants.ACCOUNT_TYPE.FREE_USER:
            Router.push('/profile')
          break
          case constants.ACCOUNT_TYPE.VERIFIED_USER:
            setIsPaymentModalOpen(true)
            break
          case constants.ACCOUNT_TYPE.CERTIFIED_USER:
            setIsPaymentModalOpen(true)
          break
        }
      } else {
        registerCourseFree()
      }
    } else {
      setIsModalLoginOpen(true)
    }
  }

  const registerCourseFree = async () => {
    try {
      setIsRegisterCourseLoading(true)
       const headers = memberToken ?  {
        'Authorization': memberToken
      } : undefined
      const response = await axios({
        headers,
        method: 'POST',
        url: `${API.url}/Course/register_course_free`,
        data : {
          course_id: courseId
        }
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        message.success('สำเร็จ')
        fetchCourseInfo()
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
    setIsRegisterCourseLoading(false)
  }

  const extendStudyTime = async () => {
    try {
      setIsExtendTimeLoading(true)
      const headers = memberToken ?  {
        'Authorization': memberToken
      } : undefined
      const response = await axios({
        headers,
        method: 'PUT',
        url: `${API.url}/Course/extend_study_time?course_id=${courseId}`,
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        message.success('สำเร็จ')
        fetchCourseInfo()
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
    setIsExtendTimeLoading(false)
  }
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const onPrintPage = async () => {
    await axios({
      method: 'PUT',
      url: `${API.url}/Course/print_course`,
      params : {
          course_id : courseId
      }
    })

    window.print()
  }

  return (
    <>
    <MainLayout>
      <Wrapper>
        <PaymentModal 
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
        />
        <LoginModal
          isOpen={isModalLoginOpen}
          onClose={() => setIsModalLoginOpen(false)}
        />
        <Header src='/static/images/header.png'>
          <Container>
            <PrintHere onClick={() => onPrintPage()}><span className='fa fa-print' style={{marginRight: '7.3px'}}/>พิมพ์หน้านี้</PrintHere>
            <HeaderContent>
              <HeaderImage src={courseDetail && courseDetail.course.cover} />
              <HeaderDescription>
                <HeaderTitle>{courseDetail && courseDetail.course.name}</HeaderTitle>
                <CourseCardDetail>
                  <CourseCardItem>
                    <CourseCardIcon className='fa fa-book' />
                    <CourseCardDetailText>{courseDetail && courseDetail.course.total_lesson} บทเรียน</CourseCardDetailText>
                  </CourseCardItem>
                  <CourseCardItem>
                  <CourseCardIcon className='fa fa-calendar' />
                    <CourseCardDetailText>{courseDetail && timeConvert(courseDetail.course.lesson_time)}</CourseCardDetailText>
                  </CourseCardItem>
                </CourseCardDetail>
                <CourseGroup>
                  <Tag color={courseDetail && courseDetail.course.category.color}>{courseDetail && courseDetail.course.category.name}</Tag>
                  {
                    courseDetail && courseDetail.course.hasCertificate &&
                    <Tag outline style={{marginLeft: '8px'}}>มีใบประกาศฯ</Tag>
                  }
                  {
                    courseDetail && courseDetail.continue_learning &&
                    <ContinueLearning>
                      <ContinueLearningLeft>
                        <ContinueLearningTitle>เรียนต่อ : {courseDetail.continue_learning.name}</ContinueLearningTitle>
                        <Progress
                          percent={courseDetail.continue_learning.progress || 0}
                          showInfo={true}
                          strokeWidth={6}
                          strokeColor={{
                            '0%': '#00937B',
                            '100%': '#00937B',
                            }}
                        />
                      </ContinueLearningLeft>
                      <Button 
                        type='primary'
                        style={{ height: '100%' }}
                        onClick={() => Router.push(`/course/${courseId}/learn`)}
                      >เรียนต่อ <ArrowRightOutlined /></Button>
                    </ContinueLearning>
                  }
                </CourseGroup>
              </HeaderDescription>
            </HeaderContent>
          </Container>
        </Header>
        
        <TabBar>
          <Container>
          <TabMenu>
            <TabItem onClick={executeScroll1}>ภาพรวมคอร์ส</TabItem>
            <Line />
            <TabItem onClick={executeScroll2}>วัตถุประสงค์</TabItem>
            <Line />
            <TabItem onClick={executeScroll3}>เนื้อหาในคอร์ส</TabItem>
            <Line />
            <TabItem onClick={executeScroll4}>ประโยชน์ที่ผู้เรียนจะได้รับ</TabItem>
            <Line />
            <TabItem onClick={executeScroll5}>สอบถามเกี่ยวกับหลักสูตร</TabItem>
          </TabMenu>
          </Container>
        </TabBar>
        <PageColor>
          <Container>
            <CourseContainer>
            <LeftContainer>
            <CourseOverview ref={scrollRef1}>
              <CourseOverviewDetail>
                <CourseTitle>ภาพรวมคอร์ส</CourseTitle>
                {
                  courseDetail &&
                  <p dangerouslySetInnerHTML={{ __html: courseDetail.course.overview }} />
                }
              </CourseOverviewDetail>
            </CourseOverview>

            <Purpose ref={scrollRef2}>
              <PurposeDetail>
                <CourseTitle>วัตถุประสงค์</CourseTitle>
                {
                  courseDetail &&
                  <p dangerouslySetInnerHTML={{ __html: courseDetail.course.objective_course }} />
                }
              </PurposeDetail>
            </Purpose>

            <CourseContent ref={scrollRef3}>
              <CourseContentDetail>
                <CourseTitle>เนื้อหาในคอร์ส</CourseTitle>
                {
                  courseDetail && courseDetail.is_own_course === false ?
                  <>
                    {
                      courseDetail && courseDetail.course_lesson.map((item, index) => (
                        <p key={index}>บทที่&nbsp;{index + 1}&nbsp;:&nbsp;{item}</p>
                      ))
                    }
                  </>
                  :
                  <>
                  {
                  courseDetail && courseDetail.course_lesson.map((item, index) => (
                    <Lesson key={index}>
                      <ChapterTitle>บทที่ {index + 1 } : {item.name}</ChapterTitle>
                      <ChapterDetail>
                        <ChapterItem>
                          <LessonTopic>
                          <LessonName>
                          <LessonIcon src='/static/images/playbutton.svg' />
                          <LessonNameText>{item.name}</LessonNameText>
                          </LessonName>
                          <VideoTime>{timeConvert(item.time)}</VideoTime>
                          </LessonTopic>
                          <Progress
                            percent={item.progress || 0}
                            showInfo={false}
                            strokeWidth={2}
                            strokeColor={{
                              '0%': '#00937B',
                              '100%': '#00937B',
                              }}
                          />
                        </ChapterItem>
                      </ChapterDetail>
                    </Lesson>

                  ))
                }
                  </>
                }
              </CourseContentDetail>
            </CourseContent>

            <Advantage ref={scrollRef4}>
              <AdvantageDetail>
                <CourseTitle>ประโยชน์ที่ผู้เรียนจะได้รับ</CourseTitle>
              <Benefit>
                {
                  courseDetail && courseDetail.course.benefits.split(',').map((item, index) => (
                    <BenefitItem
                      key={index}
                    >{item}</BenefitItem>
                  )) 
                }
              </Benefit>
              </AdvantageDetail>
            </Advantage>

            <Contact ref={scrollRef5}>
              <ContactDetail>
                <CourseTitle>สอบถามเกี่ยวกับหลักสูตร</CourseTitle>
                <ContactCourseOwner>ติดต่อผู้ดูแลหลักสูตร</ContactCourseOwner>
                <ContactContent>

                <ContactContentItem>{courseDetail && courseDetail.course.contact_name}</ContactContentItem>

                <ContactContentItem>
                <ContactIcon src='/static/images/Tel.png' />
                <p>{courseDetail && courseDetail.course.contact_phone} ตามวันและเวลาราชการ</p>
                </ContactContentItem>

                <ContactContentItem>
                <ContactIcon src='/static/images/Mail.png' />
                <p>{courseDetail && courseDetail.course.contact_email}</p>
                </ContactContentItem>
                </ContactContent>
              </ContactDetail>
            </Contact>
            </LeftContainer>
            <RightContainer>
            <CourseExample>
              <CourseExampleDetail>
              <ExampleFont>ตัวอย่างการเรียน</ExampleFont>
              {
                courseDetail &&
                <CourseExampleVideo id="video" controls autoplay muted >
                  <source src={courseDetail.course.video.original} type="video/mp4" />
                </CourseExampleVideo>
              }
              <CourseInfo>
                <CourseInfoTitle>ช่วงเวลาลงทะเบียน</CourseInfoTitle>
                <CourseInfoText>
                  {
                    courseDetail && courseDetail.course.isAlwaysRegister === true ? '-' : `${moment(courseDetail && courseDetail.course.register_start_date).format('DD MMM YYYY')} - ${moment(courseDetail && courseDetail.course.register_end_date).format('DD MMM YYYY')}`
                  }
                </CourseInfoText>
              </CourseInfo>
              <CourseInfo>
                <CourseInfoTitle>ช่วงเวลาเปิดให้เรียน</CourseInfoTitle>
                <CourseInfoText>
                  {
                    courseDetail && courseDetail.course.is_always_learning === true ? '-' : `${moment(courseDetail && courseDetail.course.learning_start_date).format('DD MMM YYYY')} - ${moment(courseDetail && courseDetail.course.learning_end_date).format('DD MMM YYYY')}`
                  }
                </CourseInfoText>
              </CourseInfo>
              <CourseInfo>
                <CourseInfoTitle>เกณฑ์การเรียนจบ</CourseInfoTitle>
                <CourseInfoText>ผู้เรียนต้องทำคะแนนบททดสอบท้ายหลักสูตรให้ได้ร้อยละ {courseDetail && courseDetail.course.passed_percent} ขึ้นไป</CourseInfoText>
              </CourseInfo>
              </CourseExampleDetail>
              <HorizontalLine></HorizontalLine>
              <CoursePrice>
                {
                  courseDetail && courseDetail.course.is_has_cost &&
                  <h2>{commaNumber(courseDetail.course.cost)} บาท</h2>
                }
                {
                  courseDetail && courseDetail.is_own_course === true ?
                  <>
                    <Button
                      type='primary'
                      block
                      style={{margin: '0 0 8px 0'}}
                      onClick={() => Router.push(`/course/${courseId}/learn`)}
                      >
                        เรียนต่อ
                    </Button>
                    <Button
                      type='primary'
                      block
                      style={{margin: '0 0 8px 0'}}
                      disabled={courseDetail && !courseDetail.can_extend_study_time}
                      onClick={() => extendStudyTime()}
                      loading={isExtendTimeLoading}
                      >
                        ขยายเวลาเรียน +30 วัน
                    </Button>
                    {
                      courseDetail && courseDetail.student_learning_enddate &&
                      <Button
                        color='#00937B'
                        block
                        disabled={true}
                      >
                        เหลือเวลาเรียนอีก {moment(courseDetail.student_learning_enddate).diff(moment(), 'days')}
                      </Button>
                    }
                  </>
                  :
                  <>
                  <Button
                    type='primary'
                    block
                    style={{margin: '0 0 8px 0'}}
                    disabled={courseDetail && !courseDetail.can_enroll}
                    onClick={() => registerCourse()}
                    loading={isRegisterCourseLoading}
                    >
                      สมัครเรียน
                    </Button>
                    {
                      memberToken && (courseDetail && courseDetail.is_own_course === false) &&
                      <Button
                        color='#00937B'
                        block
                        disabled={courseDetail && courseDetail.is_own_course}
                        onClick={() => Router.push(`/course/${courseId}/learn`)}
                      >
                        ทดลองเข้าเรียน
                      </Button>
                    }
                  </>
                }
              </CoursePrice>
            </CourseExample>
            <Instructors>
              {
                courseDetail && courseDetail.list_instructor.map((item, index) => (
                  <Instructor>
                    <InstructorDetail>
                      {
                        index === 0 && 
                        <h2>ผู้สอน</h2>
                      }
                      <InstructorProfile>
                        <Avatar src={item.profile} size={72} icon={<UserOutlined />} />
                        <p>{item.firstname} {item.lastname}</p>
                      </InstructorProfile>
                    </InstructorDetail>
                    <HorizontalLine></HorizontalLine>
                    <InstructorInformation>
                      <p>ผู้ก่อตั้งบริษัทสตาร์ทอัพชื่อดัง Ookbee และผู้บริหารกองทุน 500 TukTuks</p>
                      <MoreInfo
                        onClick={() => Router.push(`/user/${item.id}`)}
                      >ดูประวัติเพิ่ม</MoreInfo>
                    </InstructorInformation>
                  </Instructor>
                ))
              }
            </Instructors>
            </RightContainer>

            </CourseContainer>
            <OtherCourse>
              <CourseTitle>คอร์สอื่นๆ</CourseTitle>
              <Row gutter={16}>
                  {
                    courseDetail && courseDetail.related_course.map((item, index) => (
                      <Col xs={24} lg={8} style={{margin: '12px 0'}}>
                        <CourseCard
                          key={index}
                          batch={item.batch}
                          name={item.name}
                          id={item.id}
                          categoryName={item.category_name}
                          categoryColor={item.category_color}
                          cover={item.cover}
                          isHasCost={item.is_has_cost}
                          cost={item.cost}
                          hasCertificate={item.hasCertificate}
                          instructors={item.list_instructor}
                          totalLesson={item.total_lesson}
                          lessonTime={item.lesson_time}
                          startLearning={item.start_learning}
                        />
                      </Col>
                    ))
                  }
              </Row>
            </OtherCourse>
          </Container>
        </PageColor>

      </Wrapper>
    </MainLayout>
    </>
  )
}

CourseDetailPage.getInitialProps = ({ query }) => {
  const courseId = query.courseId
  return {
    courseId
  }
}

export default connector(CourseDetailPage)
