import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { maxWidth } from '../helpers/breakpoint'
import Slider from 'react-slick'
import { Tag, CourseCard } from '../components'
import Router from 'next/router'
import { Select, Row, Col, message, Button } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import API from '../helpers/api'
import { connect } from 'react-redux'
import { ArrowRightOutlined } from '@ant-design/icons'
import {
  isMobile
} from 'react-device-detect'
import { SpecialDayModal } from '../components/modals'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
const commaNumber = require('comma-number')
const { Option } = Select

const Wrapper = styled('div')`

`

const Banner = styled('div')`
  width: 100%;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const BannerContent = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  flex-wrap: wrap-reverse;
  padding: 26px 0;
`

const BannerContentLeft = styled('div')`
  width: 50%;
  font-size: 24px;
  ${maxWidth.xs`
    width: 100%;
  `};
`

const BannerContentRight = styled(BannerContentLeft)`
  line-height: 1;
  text-align: right;
  ${maxWidth.xs`
    text-align: left;
  `};
`

const BannerTitle = styled('div')`
  font-family: ${font.bold};
  ${maxWidth.xs`
    margin-top: 16px;
  `};
`

const BannerSubtitle = styled('div')`
  margin-top: 16px;
  font-size: 20px;
  font-family: ${font.light};
`

const BannerHeadline = styled('div')`
  font-size: 60px;
  font-family: ${font.bold};
`

const BannerSliderContent = styled('div')`
  margin-top: 32px;
  margin-bottom: 60px;
`

const BannerImage = styled('img')`
  width: 100%;
  cursor: pointer;

`

const CourseOnlineContent = styled('div')`
  padding-bottom: 68px;
`

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
`

const CategoryWrapper = styled('div')`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CourseListContent = styled('div')`
  margin-top: 46px;
`

const CourseCardX = styled('div')`
  background-color: white;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  width: 320px !important;
  margin-right: 16px;
  cursor: pointer;
`

const CourseCardHeader = styled('div')`
  padding: 12px;
`

const CourseCardImage = styled('div')`
  height: 170px;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`

const CourseCardContent = styled('div')`
  padding: 12px;
`

const CourseCardTitle = styled('div')`
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 3em;
  line-height: 24px;
  font-size: 16px;
  font-family: ${font.bold};
`


const CourseCardDetail = styled('div')`
  margin-top: 12px;
  display: flex;
  align-items: center;
`

const CourseCardIcon = styled('span')`

`

const CourseCardDetailText = styled('div')`
  margin-left: 7.33px;
  font-size: 12px;
`

const CourseCardItem = styled('div')`
  display: flex;
  align-items: center;
  :not(:first-child){
    margin-left: 14px;
  }
`


const CourseTypeContent = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`

const RecommentWebsite = styled('div')`
  margin-top: 100px;
  text-align: center;
  width: 100%;

`

const RecommentWebsiteTitle = styled('div')`
  font-family: ${font.bold};
  font-size: 24px;
  ${maxWidth.md`
    text-align: left;
  `};
`

const WebsiteButton = styled('div')`
  padding: 16px 12px;
  font-size: 12px;
  color: #41A0FC;
  border: 1px solid #41A0FC;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  cursor: pointer;
  margin: 8px;
  width: 100%;
`

const VideoOnDemandContent = styled('div')`
  margin-top: 48px;
`

const Stats = styled('div')`
  margin-top: 177px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${maxWidth.md`
    margin-top: 72px;
  `};
`

const StatsItem = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px;
`

const StatsValue = styled('div')`
  font-family: ${font.bold};
  font-size: 48px;
`

const StatsTitle = styled('div')`
  font-family: ${font.bold};
  white-space: nowrap;
  font-size: 16px;
`

const RecommentWebsiteRow = styled(Row)`
  margin-top: 63px;
  ${maxWidth.md`
    margin-top: 16px;
  `};
`

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token
}))

const IndexPage = ({
  memberToken,
  master
}) => {
  const [banners, setBanners] = useState([])
  const [courses, setCourses] = useState([])
  const [vdo, setVdo] = useState([])
  const [recommendWeb, setRecommendWeb] = useState([])
  const [webStat, setWebStat] = useState({})
  const [selectedCourseCategory, setSelectedCourseCategory] = useState(0)
  const [selectedVDOCategory, setSelectedVDOCategory] = useState(0)
  const [specialDay, setSpecialDay] = useState({})
  const [isOpenSpecialDayModal, setIsOpenSpecialDayModal] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchBannerList(),
      fetchCourseList(),
      fetchWebRecommendList(),
      fetchWebOverviewStat(),
      fetchVideoOnDemandList(),
      fetchSpecialDay()
    ])
  }, [])

  useEffect(() => {
    if (memberToken) {
      // fetchMyCourseProgess()
    }
  }, [memberToken])

  useEffect(() => {
    fetchCourseList()
  }, [selectedCourseCategory])

  useEffect(() => {
    fetchVideoOnDemandList()
  }, [selectedVDOCategory])

  const fetchMyCourseProgess = async () => {
    try {
      const response = await axios({
        headers: {
          Authorization: `${memberToken}`
        },
        method: 'GET',
        url: `${API.url}/Course/my_course_progress`,
      })
      const data = response.data.data
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchSpecialDay = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/special_days`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        const data = responseWithData.data
        const startDate = data.start_date
        const endDate = data.end_date
        const inRange = moment().range(startDate, endDate)
        if (moment().within(inRange)) {
          setSpecialDay(data)
          setIsOpenSpecialDayModal(true)
          setSpecialDay(data)
        }
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchBannerList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetAllBanner`,
      })
      const data = response.data.data.data
      setBanners(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchCourseList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Course/list_course`,
        params : {
          category_id : selectedCourseCategory
        }
      })
      const data = response.data.data
      setCourses(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchVideoOnDemandList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetAllVideo`,
        params : {
          category_id : selectedVDOCategory, // 0 คือ เอาทุก category หรือไม่ก็ส่ง categoryId มา
        }
      })
      const data = response.data.data
      setVdo(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchWebRecommendList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetAllSite`,
      })
      const data = response.data.data
      setRecommendWeb(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchWebOverviewStat = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Reporting/overview_website`,
      })
      const data = response.data.data
      setWebStat(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const bannerSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  const courseSliderSettings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    // initialSlide: 0,
    arrows: true,
    // variableWidth: true,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1340,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
	return (
    <MainLayout>
      <SpecialDayModal
        isOpen={isOpenSpecialDayModal}
        onClose={() => setIsOpenSpecialDayModal(false)}
        imageUrl={specialDay.cover}
      />
      <Wrapper>
        <Banner src='/static/images/banner.png'>
          <Container style={{height: '100%'}}>
            <BannerContent>
              <BannerContentLeft>
                <BannerTitle>
                  ระบบการเรียนออนไลน์ภายใต้การพัฒนาของกรมอุตสาหกรรมพื้นฐานและการเหมืองแร่
                </BannerTitle>
                <BannerSubtitle>คอร์สเรียนออนไลน์ พร้อมใบประกาศนียบัตร สำหรับผู้ประกอบการและบุคคลทั่วไป</BannerSubtitle>
              </BannerContentLeft>
              <BannerContentRight>
                <BannerHeadline>DPIM</BannerHeadline>
                <BannerHeadline>Academy</BannerHeadline>
              </BannerContentRight>
            </BannerContent>
          </Container>
        </Banner>
        <Container>
          <BannerSliderContent>
            <Slider {...bannerSliderSettings}>
              {
                banners.map((item, index) => (
                  <div
                    key={index}
                  >
                    <BannerImage
                      src={isMobile ? item.image_mobile : item.image_pc}
                      onClick={() => window.open(item.link, '_href')}
                    />
                  </div>
                ))
              }
            </Slider>
          </BannerSliderContent>
        </Container>
        <CourseOnlineContent>
          <Container paddingTop='72px' paddingBottom='72px'>
            <Title>คอร์สเรียนออนไลน์</Title>
            <CategoryWrapper>
              <Select placeholder='แสดงหมวดหมู่' style={{ width: '208px' }} onChange={(e) => setSelectedCourseCategory(e)} >
                {
                  master.course_category.map((item, index) => (
                    <Option value={item.id} key={index}>{item.name}</Option>
                  ))
                }
              </Select>
              <Button
                type='primary'
                fontSize='12px'
                onClick={() => Router.push('/course')}
              >ดูคอร์สออนไลน์ทั้งหมด
              </Button>
            </CategoryWrapper>
            <CourseListContent>
              <Slider
                {...courseSliderSettings}
              >
                {
                  courses.map((item, index) => (
                    <div
                      key={index}
                    >
                      <CourseCard
                        id={item.id}
                        name={item.name}
                        batch={item.batch}
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
                    </div>
                  ))
                }
              </Slider>
            </CourseListContent>
            <VideoOnDemandContent>
              <Title>Video on demand</Title>
              <CategoryWrapper>
                <Select placeholder='แสดงหมวดหมู่' style={{ width: '208px' }} onChange={(e) => setSelectedVDOCategory(e)} >
                  {
                    master.course_category.map((item, index) => (
                      <Option value={item.id} key={index}>{item.name}</Option>
                    ))
                  }
                </Select>
                <Button
                  type='primary'
                  fontSize='12px'
                  onClick={() => Router.push('/video-on-demand')}
                >Video on demand ทั้งหมด</Button>
              </CategoryWrapper>
              <CourseListContent>
                <Slider {...courseSliderSettings}>
                  {
                    vdo.map((item, index) => (
                      <CourseCardX key={index} onClick={() => Router.push(`/video-on-demand/${item.id}`)}>
                        <CourseCardHeader>
                          <CourseCardImage src={item.cover_thumbnail} />
                          <CourseCardTitle style={{marginTop: '12px'}}>{item.name}</CourseCardTitle>
                          <CourseTypeContent>
                            <Tag color='#34495E'>{item.category_nane}</Tag>
                          </CourseTypeContent>
                        </CourseCardHeader>
                      </CourseCardX>
                    ))
                  }
                </Slider>
              </CourseListContent>
            </VideoOnDemandContent>
            <RecommentWebsite>
              <RecommentWebsiteTitle>เว็บไซต์แนะนำ</RecommentWebsiteTitle>
              <RecommentWebsiteRow align='middle' justify='space-between' gutter={{lg: 100, md: 16, xs: 16}}>
                {
                  recommendWeb.map((item, index) => (
                    <Col lg={6} md={12} xs={12} key={index}>
                      <RecommendWeb>
                        <RecommendWebCover src={item.cover} />
                        <WebsiteButton onClick={() => window.open(item.link, '_href')}>
                          <div>{item.name}</div>
                          <ArrowRightOutlined />
                        </WebsiteButton>
                      </RecommendWeb>
                    </Col>
                  ))
                }
              </RecommentWebsiteRow>
            </RecommentWebsite>
            <Stats>
              <Row align='middle' justify='space-between' gutter={{lg: 200, md: 0, xs: 0}}>
                <Col lg={8} md={24} xs={24}>
                  <StatsItem>
                    <StatsValue>+{commaNumber(webStat.total_course)}</StatsValue>
                    <StatsTitle>จำนวนหลักสูตร</StatsTitle>
                  </StatsItem>
                </Col>
                <Col lg={8} md={24} xs={24}>
                  <StatsItem>
                    <StatsValue>{commaNumber(webStat.total_student)}</StatsValue>
                    <StatsTitle>จำนวนสมาชิก</StatsTitle>
                  </StatsItem>
                </Col>
                <Col lg={8} md={24} xs={24}>
                  <StatsItem>
                    <StatsValue>+{commaNumber(webStat.total_visit_website)}</StatsValue>
                    <StatsTitle>จำนวนผู้เข้าชม</StatsTitle>
                  </StatsItem>
                </Col>
              </Row>
            </Stats>
          </Container>
          <Panal>
            <PanalTitle>หลักสูตรที่ช่วยต่อยอดธุรกิจคุณ</PanalTitle>
            <PanalDesc>บทเรียนที่เราคิดค้นมาแล้วว่าจะช่วยผลักดันศักยภาพของผู้ประกอบการให้เกิดประโยชน์สูงสุด</PanalDesc>
            {
              memberToken ?
                <PanelButton
                  onClick={() => Router.push('/course')}
                >
                  เริ่มต้นคอร์สเรียน
                </PanelButton>
                :
                <PanelButton
                  onClick={() => Router.push('/register')}
                >
                  สมัครสมาชิก
                </PanelButton>
            }
          </Panal>
        </CourseOnlineContent>
      </Wrapper>
    </MainLayout>
	)
}

const RecommendWeb = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RecommendWebCover = styled('div')`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  height: 140px;
  width: 100%;
  border-radius: 8px;
`

const Panal = styled('div')`
  background-color: #00937B;
  padding: 72px 50px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-top: 48px;
  border-radius: 32px;
  ${maxWidth.md`
    width: 100%;
    border-radius: unset;
    padding: 48px 23px;
  `};
`

const PanelButton = styled(Button)`
  margin-top: 48px;
  color: black;
  width: 240px;
  ${maxWidth.md`
    margin-top: 32px;
  `};
`

const PanalTitle = styled('div')`
  font-size: 48px;
  font-family: ${font.bold};
`

const PanalDesc = styled('div')`
  margin-top: 24px;
  font-size: 18px;;
`

IndexPage.getInitialProps = () => {
  return { }
}

export default connector(IndexPage)
