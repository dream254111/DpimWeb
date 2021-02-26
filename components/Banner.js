import styled from 'styled-components'
import { maxWidth } from '../helpers/breakpoint'
import font from '../helpers/font'
import { Container } from './index'

const Wrapper = styled('div')`
  padding: 64px 0 0 0;
`

const Banner = styled('div')`
  width: 100%;
  height: 205.5px;
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
  width: 100%;
  ${maxWidth.xs`
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
  font-size: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  ${maxWidth.xs`
    font-size: 33px;
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

const BannerImage = styled('div')`
  width: 1024px;
  height: 390px;
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  ${maxWidth.md`
    width: 100%;
    height: 160px;
  `};
`

const BannerIcon = styled('img')`
  background-image: ${props => props.src};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 20px;
`

const BannerStyleComponent = ({
  children,
  IconImage,
}) => {
  return (
    <Wrapper>
      <Banner src='/static/images/banner.png'>
        <Container style={{ height: '100%' }}>
          <BannerContent>
            <BannerContentLeft>
              <BannerTitle
              >
                <BannerIcon src={IconImage} />{children}
                </BannerTitle>
            </BannerContentLeft>
          </BannerContent>
        </Container>
      </Banner>
    </Wrapper>
  )
}

export default BannerStyleComponent
