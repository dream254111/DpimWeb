import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { maxWidth } from '../helpers/breakpoint'
import Slider from "react-slick"
import { Button, Tag } from '../components'
import Router from 'next/router'

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
  background-color: #E5E5E5;
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

const IndexPage = () => {
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
              <select>
                แสดงทุกหมวดหมู่
              </select>
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
                <select>
                  แสดงทุกหมวดหมู่
                </select>
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

          </Container>
        </CourseOnlineContent>
      </Wrapper>
    </MainLayout>
	)
}

const VideoOnDemandContent = styled('div')`
  margin-top: 48px;
`

export default IndexPage
