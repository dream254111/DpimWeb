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
import API, { url } from '../helpers/api'
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
  padding-bottom: 72px;
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

const BannerImage = styled('img')`
  max-width: 95%;
  height: auto;
  cursor: pointer;
`

const CourseOnlineContent = styled('div')`
  margin-top: 47px;
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
  flex-wrap: wrap;
`

const CourseListContent = styled('div')`
  margin-top: 21px;

`

const CourseCardX = styled('div')`
  background-color: white;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  width: 290px !important;
  margin-right: 16px;
  cursor: pointer;
  transition: .5s ease;
  z-index: 99;
  :hover {
    z-index: 999;
    transform: scale(1.1);
  }
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
  line-height: 24px;
  font-size: 18px;
  white-space: nowrap;
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
  font-size: 14px;
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
  margin-top: 72px;
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
  font-size: 24px;
  color: #41A0FC;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 8px;
  width: 100%;
  transition: .5s ease;
  :hover {
    background-color: #41A0FC;
    color: white;
  }
  div {
    text-align: left;
    
  }
`

const VideoOnDemandContent = styled('div')`
  margin-top: 47px;
`

const Stats = styled('div')`
  margin-top: 72px;
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
  font-size: 18px;
`

const RecommentWebsiteRow = styled(Row)`
  margin-top: 63px;
  ${maxWidth.md`
    margin-top: 16px;
  `};
`

const BannerSlideWrapper = styled('div')`
  background-color: white;
  padding-top: 32px;
`

const BannerContainer = styled('div')`
  padding: 0 0 0 32px;
`

const BannerImageContainer = styled('div')`
`

const Div = styled('div')` 
  padding: 22px 0px;
  padding-left: 14px;
`

const CourseCardY = styled(CourseCard)`
  width: 293px !important;
`

const StyledSlider = styled(Slider)`
.slick-slide {
  height: auto
}

.slick-slide img {
  height: auto;
}
`

const StyledSelect = styled(Select)`
  position: relative;
  &&& {
    .ant-select-selection-search-input {
      padding: 20px !important;
  }
}
`
const CircleIcon = styled('div')`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor};
  display: inline-block;
  margin-right: 8px;
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
  const [isMouseEnter, setIsMouseEnter] = useState(false)
  const [isMouseEnter2, setIsMouseEnter2] = useState(false)
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
    fetchCourseList()
  }, [selectedCourseCategory])

  useEffect(() => {
    fetchVideoOnDemandList()
  }, [selectedVDOCategory])

  const fetchSpecialDay = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/special_days`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        const data = responseWithData.data
        if (responseWithData.data) {
          const startDate = data.start_date
          const endDate = data.end_date
          const inRange = moment().range(startDate, endDate)
          if (moment().within(inRange)) {
            setSpecialDay(data)
            setIsOpenSpecialDayModal(true)
            setSpecialDay(data)
          }
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
        url: `${API.url}/Student/GetAllBanner`
      })
      const data = response.data.data
      setBanners(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchCourseList = async () => {
    try {
      const request = {
        method: 'GET',
        url: `${API.url}/Course/list_course`,
        params: {
          category_id: selectedCourseCategory
        }
      }
      if (memberToken) {
        request.headers = {
          Authorization: memberToken
        }
      }
      const response = await axios(request)
      const data = response.data.data
      setCourses(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchVideoOnDemandList = async () => {
    try {
      const request = {
        method: 'GET',
        url: `${API.url}/Student/GetAllVideo`,
        params: {
          category_id: selectedVDOCategory, // 0 คือ เอาทุก category หรือไม่ก็ส่ง categoryId มา
        }
      }
      if (memberToken) {
        request.headers = {
          Authorization: memberToken
        }
      }
      const response = await axios(request)
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
    autoplay: true,
    autoplaySpeed: 15000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 730,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
    ]
  }

  const courseSliderSettings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 3,
    lazyLoad: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 730,
        settings: {
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
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
        <Banner src='/static/images/banner.png' style={{paddingTop: '64px'}}>
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
        <BannerSlideWrapper>
        {
          banners &&
          <BannerContainer>
              <Slider {...bannerSliderSettings}>
                {
                  banners.map((item, index) => (
                    <BannerImageContainer
                      key={index}
                    >
                      <BannerImage
                        src={isMobile ? item.image_mobile : item.image_pc}
                        onClick={() => window.open(item.link, '_href')}
                      />
                      
                    </BannerImageContainer>
                  ))
                }
              </Slider>
              </BannerContainer>
        }
        </BannerSlideWrapper>
        <CourseOnlineContent>
          <Container>
            <Title>คอร์สเรียนออนไลน์</Title>
            <CategoryWrapper>
              <StyledSelect 
                placeholder='แสดงหมวดหมู่' 
                style={{ width: '208px'}} 
                onChange={(e) => setSelectedCourseCategory(e)} 
                open={isMouseEnter} 
                onMouseOver={() => setIsMouseEnter(true)}
                onMouseLeave={() => setIsMouseEnter(false)}
              >
                {
                  master.course_category.map((item, index) => (
                    <Option value={item.id} key={index}><CircleIcon backgroundColor={item.color} />{item.name}</Option>
                  ))
                }
              </StyledSelect>
              <Button
                type='primary'
                onClick={() => Router.push('/course')}
              >ดูทั้งหมด
              </Button>
            </CategoryWrapper>
            <CourseListContent>
              <StyledSlider
                {...courseSliderSettings}
              >
                {
                  courses.map((item, index) => (
                    <Div key={index}>
                      <CourseCardY
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
                      >
                        </CourseCardY>
                        </Div>
                  ))
                }
              </StyledSlider>
            </CourseListContent>
            <VideoOnDemandContent>
              <Title>Streaming Video</Title>
              <CategoryWrapper>
                <StyledSelect 
                  placeholder='แสดงหมวดหมู่' 
                  style={{ width: '208px' }} 
                  onChange={(e) => setSelectedVDOCategory(e)} 
                  open={isMouseEnter2} 
                  onMouseOver={() => setIsMouseEnter2(true)}
                  onMouseLeave={() => setIsMouseEnter2(false)}
                >
                  {
                    master.course_category.map((item, index) => (
                      <Option value={item.id} key={index}><CircleIcon backgroundColor={item.color} />{item.name}</Option>
                    ))
                  }
                </StyledSelect>
                <Button
                  type='primary'
                  onClick={() => Router.push('/streaming-video')}
                >ดูทั้งหมด</Button>
              </CategoryWrapper>
              <CourseListContent>
                <Slider {...courseSliderSettings}>
                  {
                    vdo.map((item, index) => (
                      <Div key={index}>
                      <CourseCardX onClick={() => Router.push(`/streaming-video/${item.id}`)}>
                        <CourseCardHeader>
                          <CourseCardImage src={item.cover_thumbnail} />
                          <CourseCardTitle style={{marginTop: '12px'}}>{item.name}</CourseCardTitle>
                          <CourseTypeContent>
                            <Tag color={item.category_color}>{item.category_nane}</Tag>
                          </CourseTypeContent>
                        </CourseCardHeader>
                      </CourseCardX>
                      </Div>
                    ))
                  }
                </Slider>
              </CourseListContent>
            </VideoOnDemandContent>
            <RecommentWebsite>
              <RecommentWebsiteTitle>เว็บไซต์แนะนำ</RecommentWebsiteTitle>
              <RecommentWebsiteRow  justify='space-between' gutter={{lg: 100, md: 16, xs: 16}}>
                {
                  recommendWeb.map((item, index) => (
                    <Col lg={6} md={12} xs={12} key={index}>
                      <RecommendWeb>
                        <RecommendWebCover src={item.cover} />
                        <WebsiteButton onClick={() => window.open(item.link, '_href')}>
                          <div>{item.name}</div>
                          <ArrowRightOutlined  />
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

const RecommendWebCover = styled('img')`
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
  margin-top: 72px;
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
