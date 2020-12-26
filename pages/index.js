import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { maxWidth } from '../helpers/breakpoint'
import Slider from "react-slick"
import { Button, Tag } from '../components'
import Router from 'next/router'
import { Select, Row, Col, message } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import API from '../helpers/api'
import { connect } from 'react-redux'

const { Option } = Select
import { ArrowRightOutlined } from '@ant-design/icons'
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
  width: 40%;
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
`

const CourseOnlineContent = styled('div')`
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

const CourseCard = styled('div')`
  background-color: white;
  border: 1px solid #F2F2F2;
  border-radius: 8px;
  width: 331px !important;
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


const AuthorContent = styled('div')`
  margin-top: 12px;
  display: flex;
  align-items: center;
`

const AuthorAvatar = styled('div')`
  width: 32px;
  height: 32px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: top;
  border-radius: 50%;
`

const AuthorName = styled('div')`
  margin-left: 8px;
  color: #828282;
`

const CourseTypeContent = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`

const CourseTimeContent = styled('div')`
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CourseTimeText = styled('div')`
  font-size: 14px;
`

const CoursePrice = styled('div')`
  font-size: 20px;
  font-family: ${font.bold};
  color: #00937B;
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
  margin: 8px 0;
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
  memberToken
}) => {

  const [banners, setBanners] = useState([])
  const [courses, setCourses] = useState([])
  const [recommendWeb, setRecommendWeb] = useState(null)
  const [webStat, setWebStat] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchBannerList(),
      fetchCourseList(),
      fetchWebRecommendList(),
      fetchWebOverviewStat()
    ])
  }, [])

  useEffect(() => {
    if(memberToken) {
      fetchMyCourseProgess()
    }
  }, [memberToken])

  const fetchMyCourseProgess = async () => {
    try {
      const response = await axios({
        headers: {
          'Authorization': `${`c`}`
        },
        method: 'GET',
        url: `${API.url}/Course/my_course_progress`,
      })
      const data = response.data.data

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
      })
      const data = response.data.data
      setCourses(data)

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
      const data = response.data.data.data
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
    initialSlide: 0,
    arrows: true,
    variableWidth: true,
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
              <div>
                <BannerImage
                  src='/static/images/banner-1.png'
                />
              </div>
              <div>
                <BannerImage
                  src='/static/images/banner-2.png'
                />
              </div>
              <div>
                <BannerImage
                  src='/static/images/banner-3.png'
                />
              </div>
            </Slider>
          </BannerSliderContent>
        </Container>
        <CourseOnlineContent> 
          <Container paddingTop='72px' paddingBottom='72px'>
            <Title>คอร์สเรียนออนไลน์</Title>
            <CategoryWrapper>
              <Select placeholder='เลือกหมวดหมู่' defaultValue='all'>
                <Option value='all'>แสดงทุกหมวดหมู่</Option>
              </Select>
              <Button
                type='normal'
                size='small'
                onClick={() => Router.push('/course')}
              >ดูคอร์สออนไลน์ทั้งหมด</Button>
            </CategoryWrapper>
            <CourseListContent>
              <Slider {...courseSliderSettings}>
                {
                  new Array(7).fill(null).map(item => (
                    <CourseCard onClick={() => Router.push('/course/หลักสูตรขุดเจาะเหมืองแร่')}>
                      <CourseCardHeader>
                        <CourseCardImage src='/static/images/power-bi.png' />
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
                      </CourseCardHeader>
                  <hr />
                  <CourseCardContent>
                    <CourseCardTitle>เทคโนโลยีรีไซเคิลฝุ่นสังกะสีจากอุตสาหกรรมชุบเคลือบ สังกะสีแบบจุ่มร้อน (Hot-Dip กดกดอหกดกดกดกด)</CourseCardTitle>
                    <AuthorContent>
                      <AuthorAvatar src='/static/images/avatar.png' />
                      <AuthorName>ณัฐวุฒิ พึงเจริญพงศ์ (หมู)</AuthorName>
                    </AuthorContent>
                    <CourseTypeContent>
                      <Tag color='#34495E'>เทคโนโลยี</Tag>
                      <Tag outline>รับรองใบประกาศฯ</Tag>
                    </CourseTypeContent>
                    <CourseTimeContent>
                      <CourseTimeText>เริ่มเรียน 2 พฤศจิกายน 2020</CourseTimeText>
                      <CoursePrice>ฟรี</CoursePrice>
                    </CourseTimeContent>
                  </CourseCardContent>
                </CourseCard>
                  ))
                }
              </Slider>
            </CourseListContent>

            <VideoOnDemandContent>
              <Title>Video on demand</Title>
              <CategoryWrapper>
                <Select placeholder='เลือกหมวดหมู่' defaultValue='all'>
                  <Option value='all'>แสดงทุกหมวดหมู่</Option>
                </Select>
                <Button
                  type='normal'
                  size='small'
                  onClick={() => Router.push('/video-on-demand')}
                >Video on demand ทั้งหมด</Button>
              </CategoryWrapper>
              <CourseListContent>
                <Slider {...courseSliderSettings}>
                  {
                    new Array(7).fill(null).map(item => (
                      <CourseCard>
                        <CourseCardHeader>
                          <CourseCardImage src='/static/images/power-bi.png' />
                          <CourseCardTitle style={{marginTop: '12px'}}>เทคโนโลยีรีไซเคิลฝุ่นสังกะสีจากอุตสาหกรรมชุบเคลือบ สังกะสีแบบจุ่มร้อน (Hot-Dip กดกดอหกดกดกดกด)</CourseCardTitle>
                          <CourseTypeContent>
                            <Tag color='#34495E'>เทคโนโลยี</Tag>
                            <Tag outline>รับรองใบประกาศฯ</Tag>
                          </CourseTypeContent>
                        </CourseCardHeader>
                      </CourseCard>
                    ))
                  }
                </Slider>
              </CourseListContent>
            </VideoOnDemandContent>
            <RecommentWebsite>
              <RecommentWebsiteTitle>เว็บไซต์แนะนำ</RecommentWebsiteTitle>
              <RecommentWebsiteRow align='middle' justify='space-between' gutter={{lg: 133, md: 16, xs: 16}}>
                <Col lg={6} md={12} xs={12}>
                  <WebsiteButton>
                    <div>เว็บไซต์ DPIM</div>
                    <ArrowRightOutlined />
                  </WebsiteButton>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <WebsiteButton>
                    <div>เว็บไซต์ DPIM</div>
                    <ArrowRightOutlined />
                  </WebsiteButton>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <WebsiteButton>
                    <div>เว็บไซต์ DPIM</div>
                    <ArrowRightOutlined />
                  </WebsiteButton>
                </Col>
                <Col lg={6} md={12} xs={12}>
                  <WebsiteButton>
                    <div>เว็บไซต์ DPIM</div>
                    <ArrowRightOutlined />
                  </WebsiteButton>
                </Col>
              </RecommentWebsiteRow>
            </RecommentWebsite>
            <Stats>
              <Row align='middle' justify='space-between' gutter={{lg: 200, md: 0, xs: 0}}>
                <Col lg={8} md={24} xs={24}>
                  <StatsItem>
                    <StatsValue>+20k</StatsValue>
                    <StatsTitle>จำนวนหลักสูตร</StatsTitle>
                  </StatsItem>
                </Col>
                <Col lg={8} md={24} xs={24}>
                  <StatsItem>
                    <StatsValue>4.5</StatsValue>
                    <StatsTitle>จำนวนสมาชิก</StatsTitle>
                  </StatsItem>
                </Col>
                <Col lg={8} md={24} xs={24}>
                  <StatsItem>
                    <StatsValue>+1k</StatsValue>
                    <StatsTitle>จำนวนผู้เข้าชม</StatsTitle>
                  </StatsItem>
                </Col>
              </Row>
            </Stats>
          </Container>
          <Panal>
            <PanalTitle>หลักสูตรที่ช่วยต่อยอดธุรกิจคุณ</PanalTitle>
            <PanalDesc>บทเรียนที่เราคิดค้นมาแล้วว่าจะช่วยผลักดันศักยภาพของผู้ประกอบการให้เกิดประโยชน์สูงสุด</PanalDesc>
            <PanelButton>สมัครสมาชิก</PanelButton>
          </Panal>
        </CourseOnlineContent>
      </Wrapper>
    </MainLayout>
	)
}

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

// export default connector(IndexPage)
export default IndexPage
