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
import { useRef } from 'react'
import { Progress } from 'antd'

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
`

const HeaderImage = styled('img')`

`

const HeaderContent = styled('div')`
  display: flex;
  align-items: flex-start; 
`

const HeaderDescription = styled('div')`
  margin-left: 12px;
`

const HeaderTitle = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
  color: white;
`


const CourseCardDetailText = styled('div')`
  margin-left: 7.33px;
  color: white;
  font-size: 14px;
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
  font-size: 16px;
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
    font-size: 14px;
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
    font-size: 14px;
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
  font-size: 12px;
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
    font-size: 14px;
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
  font-size: 16px;
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
  font-size: 14px;
`

const VideoTime = styled('div')`
  font-size: 14px;
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
  font-size: 16px;
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
  font-size: 14px;
  color: #333333;
`

const TotalQuestion = styled('div')`
  font-size: 14px;
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
  font-size: 16px;
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
  font-size: 14px;
  color: #333333;
`

const TotalQuiz = styled('div')`
  font-size: 14px;
  color: #828282;
  text-align: right;
`

const Instructor = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
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
    font-size: 16px;
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
    font-size: 14px;
    color: #333333;
  }
`

const MoreInfo = styled('div')`
  font-size: 14px;
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
  font-size: 14px;
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
  font-size: 14px;
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
    font-size: 12px;
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
  margin: 16px 0 98px 0;
  display: flex;
  flex-direction: column;
  ${maxWidth.md`
    margin-bottom: 50px;
  `}
`

const CourseInfo = styled('div')`
  display: flex;
  flex-direction: column;
`

const CourseInfoTitle = styled('div')`
  margin: 16px 0 4px 0;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
`

const CourseInfoText = styled('div')`
  color: #333333;
  font-size: 14px;
  margin: 0;
`

const CourseExampleVideo = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
`

const CourseSlugPage = ({ courseSlug }) => {
  const scrollRef1 = useRef(null)
  const scrollRef2 = useRef(null)
  const scrollRef3 = useRef(null)
  const scrollRef4 = useRef(null)
  const scrollRef5 = useRef(null)

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

  return (
    <>
    <MainLayout>
      <Wrapper>
        <Header src='/static/images/header.png'>
          <Container>
            <PrintHere><span className='fa fa-print' style={{marginRight: '7.3px'}} />พิมพ์หน้านี้</PrintHere>
            <HeaderContent>
              <HeaderImage src='/static/images/deep-learning.png' />
              <HeaderDescription>
                <HeaderTitle>{courseSlug}</HeaderTitle>
                <CourseCardDetail>
                  <CourseCardItem>
                    <CourseCardIcon className='fa fa-book' />
                    <CourseCardDetailText>6 บทเรียน</CourseCardDetailText>
                  </CourseCardItem>
                  <CourseCardItem>
                  <CourseCardIcon className='fa fa-calendar' />
                    <CourseCardDetailText>4 ชั่วโมง 24 นาที</CourseCardDetailText>
                  </CourseCardItem>
                </CourseCardDetail>
                <CourseGroup>
                  <Tag color='#34495E'>เทคโนโลยี</Tag>
                  <Tag outline style={{marginLeft: '8px'}}>มีใบประกาศฯ</Tag>
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
              <p dangerouslySetInnerHTML=
              {
                {
                  __html: `การนำเสนอและการต่อรองเป็นเรื่องที่พวกเราทุกคนทำกันทุกวันอย่างไม่รู้ตัวแต่น้อยคนนักที่สามารถ
                  ใช้ทักษะนี้ได้อย่างช่ำชองซึ่งถือว่าเป็นเรื่องที่เสริมโอกาสมากสำหรับหลายคน
                  ข่าวดีคือทักษะนี้สามารถฝึกฝนให้เก่งได้ 
                  ด้วยความรู้ความเข้าใจและทฤษฎีที่ถูกต้อง 
                  ในคอร์สนี้คุณจะได้เรียนรู้ทักษะการนำเสนอและการต่อรองอย่างเป็นระบบ
                  คุณจะรู้ว่าจะต้องเตรียมตัวอย่างไร วางแผนกลยุทธ์อย่างไร และปฏิบัติตนอย่างไร 
                  เพื่อสร้างผลงานการนำเสนอและการต่อรองที่ดี`
                }
              } 
                />
                <CourseOverviewImageContainer>
                <CourseOverviewImage src='/static/images/CourseOverview.svg' />
                </CourseOverviewImageContainer>
                </CourseOverviewDetail>
            </CourseOverview>

            <Purpose ref={scrollRef2}>
              <PurposeDetail>
                <CourseTitle>วัตถุประสงค์</CourseTitle>
                <p dangerouslySetInnerHTML=
                {
                  {
                    __html: `การนำเสนอและการต่อรองเป็นเรื่องที่พวกเราทุกคนทำกันทุกวันอย่างไม่รู้ตัว 
                    แต่น้อยคนนักที่สามารถใช้ทักษะนี้ได้อย่างช่ำชอง ซึ่งถือว่าเป็นเรื่องที่เสริมโอกาสมากสำหรับหลายคน 
                    ข่าวดีคือทักษะนี้สามารถฝึกฝนให้เก่งได้ ด้วยความรู้ความเข้าใจและทฤษฎีที่ถูกต้อง 
                    ในคอร์สนี้คุณจะได้เรียนรู้ทักษะการนำเสนอและการต่อรองอย่างเป็นระบบ คุณจะรู้ว่าจะต้องเตรียมตัวอย่างไร 
                    วางแผนกลยุทธ์อย่างไร และปฏิบัติตนอย่างไร เพื่อสร้างผลงานการนำเสนอและการต่อรองที่ดี`
                    }
                } 
                />
              </PurposeDetail>
            </Purpose>

            <CourseContent ref={scrollRef3}>
              <CourseContentDetail>
                <CourseTitle>เนื้อหาในคอร์ส</CourseTitle>

                <Lesson>
                  <ChapterTitle>บทที่ 1 : แหล่งที่มาของฝุ่นสังกะสี</ChapterTitle>
                  <ChapterDetail>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/checkmark2.svg' />
                      <LessonNameText>Welcome</LessonNameText>
                      </LessonName>
                      <VideoTime>02:39</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={100}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>ฝุ่นสังกะสีคืออะไร</LessonNameText>
                      </LessonName>
                      <VideoTime>
                        02:39
                      </VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={100}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>จัดการอย่างไร</LessonNameText>
                      </LessonName>
                      <VideoTime>
                        02:39
                      </VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>
                  </ChapterDetail>

                  <EndofChapterQuestion>
                  <QuestionTitle>คำถามท้ายบท 1</QuestionTitle>
                  <QuestionTopic>
                  <QuestionName>
                    <QuestionIcon src='/static/images/checkmarksquare.svg' />
                    <QuestionNameText>คำถามท้ายบท 1</QuestionNameText>
                  </QuestionName>
                  <TotalQuestion>
                    5 ข้อ
                  </TotalQuestion>
                  </QuestionTopic>
                  </EndofChapterQuestion>
                </Lesson>

                <Lesson>
                  <ChapterTitle>บทที่ 2 : การประยุกต์ใช้ฝุ่นสังกะสี</ChapterTitle>
                  <ChapterDetail>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>จัดการอย่างไร</LessonNameText>
                      </LessonName>
                      <VideoTime>04:09</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>
                  </ChapterDetail>

                  <EndofChapterQuestion>
                  <QuestionTitle>คำถามท้ายบท 2</QuestionTitle>
                  <QuestionTopic>
                  <QuestionName>
                    <QuestionIcon src='/static/images/checkmarksquare.svg' />
                    <QuestionNameText>คำถามท้ายบท 2 (5ข้อ)</QuestionNameText>
                  </QuestionName>
                  <TotalQuestion>
                    5 ข้อ
                  </TotalQuestion>
                  </QuestionTopic>
                  </EndofChapterQuestion>
                </Lesson>

                <Lesson>
                  <ChapterTitle>บทที่ 3 : กระบวนการรีไซเคิลฝุ่นสังกะสี</ChapterTitle>
                  <ChapterDetail>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>ฝุ่นสังกะสีคืออะไร</LessonNameText>
                      </LessonName>
                      <VideoTime>03:47</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>จัดการอย่างไร</LessonNameText>
                      </LessonName>
                      <VideoTime>04:09</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>
                  </ChapterDetail>

                  <EndofChapterQuestion>
                  <QuestionTitle>คำถามท้ายบท 3</QuestionTitle>
                  <QuestionTopic>
                  <QuestionName>
                    <QuestionIcon src='/static/images/checkmarksquare.svg' />
                    <QuestionNameText>คำถามท้ายบท 3 (5ข้อ)</QuestionNameText>
                  </QuestionName>
                  <TotalQuestion>
                    5 ข้อ
                  </TotalQuestion>
                  </QuestionTopic>
                  </EndofChapterQuestion>
                </Lesson>

                <Lesson>
                  <ChapterTitle>บทที่ 4 : เลือกวัสดุอุปกรณ์ในการรีไซเคิล</ChapterTitle>
                  <ChapterDetail>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>จัดการอย่างไร</LessonNameText>
                      </LessonName>
                      <VideoTime>04:09</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>
                  </ChapterDetail>

                  <EndofChapterQuestion>
                  <QuestionTitle>คำถามท้ายบท 4</QuestionTitle>
                  <QuestionTopic>
                  <QuestionName>
                    <QuestionIcon src='/static/images/checkmarksquare.svg' />
                    <QuestionNameText>คำถามท้ายบท 4 (5ข้อ)</QuestionNameText>
                  </QuestionName>
                  <TotalQuestion>
                    5 ข้อ
                  </TotalQuestion>
                  </QuestionTopic>
                  </EndofChapterQuestion>
                </Lesson>

                <Lesson>
                  <ChapterTitle>บทที่ 5 : การประเมินความเป็นไปไม่ได้</ChapterTitle>
                  <ChapterDetail>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>จัดการอย่างไร</LessonNameText>
                      </LessonName>
                      <VideoTime>04:09</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>
                  </ChapterDetail>

                  <EndofChapterQuestion>
                  <QuestionTitle>คำถามท้ายบท 5</QuestionTitle>
                  <QuestionTopic>
                  <QuestionName>
                    <QuestionIcon src='/static/images/checkmarksquare.svg' />
                    <QuestionNameText>คำถามท้ายบท 5 (5ข้อ)</QuestionNameText>
                  </QuestionName>
                  <TotalQuestion>
                    5 ข้อ
                  </TotalQuestion>
                  </QuestionTopic>
                  </EndofChapterQuestion>
                </Lesson>

                <Lesson>
                  <ChapterTitle>บทที่ 6 : ทบทวนบทเรียนภาพรวม</ChapterTitle>
                  <ChapterDetail>

                    <ChapterItem>
                      <LessonTopic>
                      <LessonName>
                      <LessonIcon src='/static/images/playbutton.svg' />
                      <LessonNameText>จัดการอย่างไร</LessonNameText>
                      </LessonName>
                      <VideoTime>04:09</VideoTime>
                      </LessonTopic>
                      <Progress
                        percent={0}
                        showInfo={false}
                        strokeWidth={2}
                        strokeColor={{
                          '0%': '#00937B',
                          '100%': '#00937B',
                          }}
                      />
                    </ChapterItem>
                  </ChapterDetail>

                  <EndofChapterQuestion>
                  <QuestionTitle>คำถามท้ายบท 6</QuestionTitle>
                  <QuestionTopic>
                  <QuestionName>
                    <QuestionIcon src='/static/images/checkmarksquare.svg' />
                    <QuestionNameText>คำถามท้ายบท 6 (5ข้อ)</QuestionNameText>
                  </QuestionName>
                  <TotalQuestion>
                    5 ข้อ
                  </TotalQuestion>
                  </QuestionTopic>
                  </EndofChapterQuestion>

                  <CourseQuiz>
                    <CourseQuizTitle>แบบทดสอบหลักสูตร</CourseQuizTitle>

                    <CourseQuizTopic>
                      <CourseQuizName>
                        <QuizIcon src='/static/images/quiz.svg' />
                        <CourseQuizNameText>คำถามท้ายท้ายบท 6 (5ข้อ)</CourseQuizNameText>
                      </CourseQuizName>
                      <TotalQuiz>
                      5 ข้อ
                    </TotalQuiz>
                    </CourseQuizTopic>

                  </CourseQuiz>
                </Lesson>

              </CourseContentDetail>
            </CourseContent>

            <Advantage ref={scrollRef4}>
              <AdvantageDetail>
                <CourseTitle>ประโยชน์ที่ผู้เรียนจะได้รับ</CourseTitle>
              <Benefit>
                <BenefitItem>เข้าใจความสำคัญของการบริหารผลการปฏิบัติงาน (Performance Management)</BenefitItem>
                <BenefitItem>เรียนรู้ระบบการวัดผลองค์กรแบบสมดุล (Balanced Scorecard)</BenefitItem>
                <BenefitItem>เรียนรู้การนำเอาระบบ Balanced Scorecard ไปใช้ในทางปฏิบัติ</BenefitItem>
                <BenefitItem>วิธีารการนำ OKRs ไปใช้จริง พร้อมตัวอย่าง</BenefitItem>
                <BenefitItem>เรียนรู้กลยุทธ์และกระบวนการออกแบบระบบการวัดผลการปฏิบัติงานองค์กร</BenefitItem>
                <BenefitItem>การออกแบบ OKRs ที่ถูกต้อง พร้อมตัวอย่าง</BenefitItem>
                <BenefitItem>ต้นกำเนิด แนวคิด ของ OKRs</BenefitItem>
              </Benefit>
              </AdvantageDetail>
            </Advantage>

            <Contact ref={scrollRef5}>
              <ContactDetail>
                <CourseTitle>สอบถามเกี่ยวกับหลักสูตร</CourseTitle>
                <ContactCourseOwner>ติดต่อผู้ดูแลหลักสูตร</ContactCourseOwner>
                <ContactContent>

                <ContactContentItem>พิชญา</ContactContentItem>

                <ContactContentItem>
                <ContactIcon src='/static/images/Tel.png' />
                <p>0 2202 3904 ตามวันและเวลาราชการ</p>
                </ContactContentItem>

                <ContactContentItem>
                <ContactIcon src='/static/images/Mail.png' />
                <p>innovation.dpim@gmail.com</p>
                </ContactContentItem>

                </ContactContent>
              </ContactDetail>
            </Contact>

            <OtherCourse>
              <CourseTitle>คอร์สอื่นๆ</CourseTitle>
            <CourseCard />
            </OtherCourse>

            </LeftContainer>

            <RightContainer>
            <CourseExample>
              <CourseExampleDetail>
              <ExampleFont>ตัวอย่างการเรียน</ExampleFont>
              <CourseExampleVideo src='/static/images/examplevideo.svg' />
              <CourseInfo>
                <CourseInfoTitle>ช่วงเวลาลงทะเบียน</CourseInfoTitle>
                <CourseInfoText>29 ธันวาคม 2020 - 5 มกราคม 2021</CourseInfoText>
              </CourseInfo>
              <CourseInfo>
                <CourseInfoTitle>ช่วงเวลาเปิดให้เรียน</CourseInfoTitle>
                <CourseInfoText>1มกราคม 2021 - 31 มกราคม</CourseInfoText>
              </CourseInfo>
              <CourseInfo>
                <CourseInfoTitle>เกณฑ์การเรียนจบ</CourseInfoTitle>
                <CourseInfoText>ผู้เรียนต้องทำคะแนนบททดสอบท้ายหลักสูตรให้ได้ร้อยละ 80 ขึ้นไป</CourseInfoText>
              </CourseInfo>
              </CourseExampleDetail>
              <HorizontalLine></HorizontalLine>
              <CoursePrice>
              <h2>2900 บาท</h2>
              <Button
                type='normal'
                size='large'
                fontSize='14px'
                width='100%'
                margin='0 0 8px 0'
                >
                  สมัครเรียน
                  </Button>
              <Button
                type='normal'
                size='large'
                fontSize='14px'
                backgroundColor='#FFFFFF'
                color='#00937B'
                border='none'
                width='100%'
              >
                ทดลองเข้าเรียน
              </Button>
              </CoursePrice>
            </CourseExample>

            <Instructor>
              <InstructorDetail>
                <h2>ผู้สอน</h2>
                <InstructorProfile>
                  <PicProfile src='/static/images/instructor.svg' />
                  <p>ณัฐวุฒิ พึงเจริญพงศ์ (หมู)</p>
                </InstructorProfile>
              </InstructorDetail>
              <HorizontalLine></HorizontalLine>
              <InstructorInformation>
                <p>ผู้ก่อตั้งบริษัทสตาร์ทอัพชื่อดัง Ookbee และผู้บริหารกองทุน 500 TukTuks</p>
                <MoreInfo>ดูประวัติเพิ่ม</MoreInfo>
              </InstructorInformation>
            </Instructor>
            </RightContainer>

            </CourseContainer>
          </Container>
        </PageColor>

      </Wrapper>
    </MainLayout>
    </>
  )
}

CourseSlugPage.getInitialProps = ({ query }) => {
  const courseSlug = query.courseSlug
  return {
    courseSlug
  }
}

export default CourseSlugPage
