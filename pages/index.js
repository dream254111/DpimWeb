import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { maxWidth } from '../helpers/breakpoint'

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

const IndexPage = () => {
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
          hello
        </Container>
      </Wrapper>
    </MainLayout>
	)
}

export default IndexPage
