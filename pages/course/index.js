import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import Container from '../../components/Container'
import font from '../../helpers/font'
import { Tag } from '../../components'
import Router from 'next/router'

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
  align-items: center;
  cursor: pointer;
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

const CourseDescription = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CourseDescriptionText = styled('div')`
  font-size: 14px;
  width: 80%;
`


const CourseCardDetailText = styled('div')`
  margin-left: 7.33px;
  color: #828282;
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

`

const CourseCardDetail = styled('div')`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const CourseFooter = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  font-size: 14px;
`

const FooterRight = styled('div')`
  text-align: right;
`


const CoursePrice = styled('div')`
  font-size: 20px;
  font-family: ${font.bold};
  color: #00937B;
`

const CourseTime = styled('div')`
  margin-top: 8px;
  font-size: 14px;
`


const CoursePage = () => {
  return (
    <MainLayout>
      <Wrapper>
        <Container paddingTop='32px'>
          <Content>
            <FilterWrapper>
              <Title>คอร์สเรียน</Title>
            </FilterWrapper>
            <CourseWrapper>
              {
                new Array(6).fill(null).map(item => (
                  <CourseCard onClick={() => Router.push('/course/หลักสูตรขุดเจาะเหมืองแร่')}>
                    <CourseImage src='/static/images/deep-learning.png' />
                    <CourseContent>
                      <CourseTitle>หลักสูตร ขุดเจาะเหมืองแร่</CourseTitle>
                      <CourseDescription>
                        <CourseDescriptionText>เนื่องจากองค์ความรู้ทางด้านวิทยาศาสตร์และสุขภาพนั้น เป็นองค์ความรู้ที่มีการเปลี่ยนแปลงอย่างรวดเร็ว</CourseDescriptionText>
                        <Tag color='#34495E'>เทคโนโลยี</Tag>
                      </CourseDescription>
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
                      <CourseFooter>
                        <AuthorContent>
                          <AuthorAvatar src='/static/images/avatar.png' />
                          <AuthorName>ณัฐวุฒิ พึงเจริญพงศ์ (หมู)</AuthorName>
                        </AuthorContent>
                        <FooterRight>
                          <CoursePrice>
                            ฟรี
                          </CoursePrice>
                          <CourseTime>
                          เริ่ม 1 ม.ค. 2021
                          </CourseTime>
                        </FooterRight>
                      </CourseFooter>
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

export default CoursePage
