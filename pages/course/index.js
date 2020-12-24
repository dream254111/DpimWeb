import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import Container from '../../components/Container'
import font from '../../helpers/font'
import { Tag, Checkbox } from '../../components'
import Router from 'next/router'
import { Divider, Select, Row, Col, Slider } from 'antd'
const { Option } = Select

const Wrapper = styled('div')`
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

const CoursePage = () => {
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
              <FilterTitle style={{marginTOp: '8px'}}>ช่วงเวลาเปิดคอร์ส</FilterTitle>
              <Select defaultValue='jan' style={{marginTop: '8px', width: '100%'}}>
                <Option value='jan'>มกราคม</Option>
                <Option value='feb'>กุมภาพันธ์</Option>
              </Select>
              <Divider style={{marginTop: '16px', marginBottom: '0'}}/>
              <FilterItem>
                <FilterTitle>หมวดหมู่</FilterTitle>
                <Checkbox>เหมืองแร่</Checkbox> <br />
                <Checkbox>อุตสาหกรรม</Checkbox> <br />
                <Checkbox>อุตสาหกรรม</Checkbox> <br />
                <Checkbox>อุตสาหกรรม</Checkbox> <br />
                <Checkbox>อุตสาหกรรม</Checkbox>
              </FilterItem>
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>รูปแบบการเรียน</FilterTitle>
                <Checkbox>คอร์สเรียนที่สถาบัน</Checkbox> <br />
                <Checkbox>คอร์สออนไลน์</Checkbox> <br />
              </FilterItem>
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>ราคาคอร์ส</FilterTitle>
                <Checkbox>ฟรี</Checkbox>
                <Slider
                  range
                  min={100}
                  max={10000}
                  step={100}
                  defaultValue={[100, 10000]}
                  marks={{ 0: '100.-' , 10000: '10,000.-'}}
                />
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
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}

export default CoursePage
