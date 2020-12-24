import MainLayout from '../../../layouts/main'
import styled from 'styled-components'
import Container from '../../../components/Container'
import font from '../../../helpers/font'
import { Tag } from '../../../components'

const Wrapper = styled('div')`
`

const Header = styled('div')`
  background-color: cadetblue;
  width: 100%;
  padding: 12px;
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


const CourseSlugPage = ({ courseSlug }) => {
  return (
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
      </Wrapper>
    </MainLayout>
  )
}

CourseSlugPage.getInitialProps = ({ query }) => {
  const courseSlug = query.courseSlug
  return {
    courseSlug
  }
}

export default CourseSlugPage