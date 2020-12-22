import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { Checkbox } from '../components'
import Router from 'next/router'
import { Divider, Select, Row, Col } from 'antd'
const { Option } = Select

const Wrapper = styled('div')`
  background-color: #E5E5E5;
`

const Content = styled('div')`
  display: flex;
  align-items: flex-start;
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

const BoldTitle = styled('div')`
  font-size: 16px;
  font-family: ${font.bold};
  color: #333333;
  margin-top: 24px;
`

const FilterTitle = styled('div')`
  font-size: 16px;
`

const FilterItem = styled('div')`
  margin: 16px 0;
`

const VideoOnDemandPage = () => {
  return (
    <MainLayout>
      <Wrapper>
        <Container paddingTop='32px'>
          <Row gutter={24}>
            <Col xs={0} md={6}>
              <Title>คอร์สเรียน</Title>
              <BoldTitle>การจัดเรียง</BoldTitle>
              <Select defaultValue='desc' style={{marginTop: '8px', width: '100%'}}>
                <Option value='desc'>ใหม่สุด</Option>
                <Option value='asc'>เก่าสุด</Option>
              </Select>
              <BoldTitle>คัดกรอง</BoldTitle>
              <FilterTitle>รูปแบบการเรียน</FilterTitle>
                <Checkbox>คอร์สเรียนที่สถาบัน</Checkbox> <br />
                <Checkbox>คอร์สออนไลน์</Checkbox>
              <Divider style={{marginTop: '16px', marginBottom: '0'}}/>
              <FilterItem>
                <FilterTitle>หมวดหมู่</FilterTitle>
                <Checkbox>เหมืองแร่</Checkbox> <br />
                <Checkbox>อุตสาหกรรม</Checkbox>
              </FilterItem>
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>รับรองใบประกาศนียบัตร</FilterTitle>
                <Checkbox>รับรอง</Checkbox> <br />
                <Checkbox>ไม่รับรอง</Checkbox>
              </FilterItem>
            </Col>
            <Col xs={24} md={18}>
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
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}

export default VideoOnDemandPage
