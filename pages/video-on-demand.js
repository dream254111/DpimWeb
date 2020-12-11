import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { Tag } from '../components'

const Wrapper = styled('div')`
  background-color: #E5E5E5;
`

const Content = styled('div')`
  display: flex;
  align-items: flex-start;
`

const FilterWrapper = styled('div')`
  flex: 1;
`

const CourseWrapper = styled('div')`
  flex: 4;
  display: flex;
  flex-direction: column;
`

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
`

const CourseCard = styled('div')`
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
`

const CourseImage = styled('div')`
  width: 275px;
  height: 150px;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const CourseTitle = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
`

const CourseContent = styled('div')`
  margin-left: 12px;
`

const VideoOnDemandPage = () => {
  return (
    <MainLayout>
      <Wrapper>
        <Container paddingTop='32px'>
          <Content>
            <FilterWrapper>
              <Title>Video on demand</Title>
            </FilterWrapper>
            <CourseWrapper>
              {
                new Array(6).fill(null).map(item => (
                  <CourseCard>
                    <CourseImage src='/static/images/deep-learning.png' />
                    <CourseContent>
                      <CourseTitle>เทคโนโลยีรีไซเคิลฝุ่นสังกะสีจากอุตสาหกรรมชุบเคลือบ สังกะสีแบบจุ่มร้อน (Hot-Dip</CourseTitle>
                    </CourseContent>
                  </CourseCard>
                ))
              }
            </CourseWrapper>
          </Content>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}

export default VideoOnDemandPage
