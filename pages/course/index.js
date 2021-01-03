import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import Container from '../../components/Container'
import font from '../../helpers/font'
import { Tag } from '../../components'
import Router from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import API from '../../helpers/api'
import { UserOutlined } from '@ant-design/icons'
import { Divider, Select, Row, Col, Slider, DatePicker, Space, Checkbox, Radio, message, Avatar } from 'antd'
const { Option } = Select
const { RangePicker } = DatePicker
const CheckboxGroup = Checkbox.Group
import { timeConvert } from '../../helpers/util'
import moment from 'moment'
import _ from 'lodash'
const commaNumber = require('comma-number')

const Wrapper = styled('div')`
  .ant-checkbox-wrapper {
    display: block;
  }
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
  min-width: 275px;
  min-height: 150px;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const CourseTitle = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CourseContent = styled('div')`
  margin-left: 12px;
  width: 100%;
`

const CourseDescription = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CourseDescriptionText = styled('div')`
  font-size: 14px;
  width: 80%;
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
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

const CoursePage = ({
  master
}) => {
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState([])
  const courseCategoryKey = _.groupBy(master.course_category, 'name')
  useEffect(() => {
    fetchCourseList()
  }, [])

  useEffect(() => {
    fetchCourseList()
  }, [filter])

  const fetchCourseList = async () => {
    try {
      let params = (Object.keys(filter).map((key, index) => {
        return `${key}=${filter[key]}`
      })).join('&')
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Course/list_course?${params}`,
      })
      const data = response.data.data
      setCourses(data)

    } catch (error) {
      message.error(error.message)
    }
  }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }
  return (
    <MainLayout>
      <Wrapper>
        <Container paddingTop='32px'>
          <Row gutter={24}>
            <Col xs={0} md={6}>
              <Title>คอร์สเรียน</Title>
              <BoldTitle>การจัดเรียง</BoldTitle>
              <Select
                style={{marginTop: '8px', width: '100%'}}
                placeholder='เลือกการจัดเรียง'
                onChange={(value) => {
                  setFilter({
                    ...filter,
                    sort: value
                  })
                }}
              >
                <Option value='newest'>ใหม่สุด</Option>
                <Option value='cheapest'>ถูกสุด</Option>
                <Option value='expensive'>แพงสุด</Option>
              </Select>
              <BoldTitle>คัดกรอง</BoldTitle>
              <FilterTitle style={{marginTOp: '8px'}}>ช่วงเวลาเปิดคอร์ส</FilterTitle>
              <RangePicker
                placeholder={['วันเริ่มต้น', 'วันสิ้นสุด']}
                onChange={(value) => {
                  setFilter({
                    ...filter,
                    register_start_date: value ? moment(value[0]).format('YYYY-MM-DD') : null,
                    register_end_date: value ? moment(value[1]).format('YYYY-MM-DD') : null
                  })
                }}
              />
              <Divider style={{marginTop: '16px', marginBottom: '0'}}/>
              <FilterItem>
                <FilterTitle>หมวดหมู่</FilterTitle>
                <Space direction="vertical" size={6} style={{marginTop: '10px'}}>
                  <CheckboxGroup
                    options={master.course_category.map(item => item.name)}
                    onChange={(categoryDetails) => {
                      const categoryIds = categoryDetails.map(item => courseCategoryKey[item][0].id)
                      setFilter({
                        ...filter,
                        category_id: categoryIds
                      })
                    }}
                  />
                </Space>
              </FilterItem>
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>รูปแบบการเรียน</FilterTitle>
                <Radio.Group
                  style={{marginTop: '8px'}}
                  onChange={(event) => {
                  setFilter({
                    ...filter,
                    learning_online: event.target.value
                  })
                }}>
                  <Radio style={radioStyle} value={1}>
                  คอร์สเรียนที่สถาบัน
                  </Radio>
                  <Radio style={radioStyle} value={0}>
                  คอร์สออนไลน์
                  </Radio>
                </Radio.Group>
              </FilterItem>
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>ราคาคอร์ส</FilterTitle>
                <Checkbox
                  onChange={(event) => {
                    const isChecked = event.target.checked || undefined
                    setFilter({
                      ...filter,
                      is_free: isChecked
                    })
                  }}
                >ฟรี</Checkbox>
                <Slider
                  range
                  min={100}
                  max={10000}
                  step={100}
                  defaultValue={[100, 10000]}
                  marks={{ 0: '100.-' , 10000: '10,000.-'}}
                  onChange={(values) => {
                    setFilter({
                      ...filter,
                      price_gte: values[0],
                      price_lte: values[1]
                    })
                  }}
                />
              </FilterItem>
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>รับรองใบประกาศนียบัตร</FilterTitle>
                <Radio.Group onChange={(event) => {
                  setFilter({
                    ...filter,
                    hasCertificate: event.target.value
                  })
                }}>
                  <Radio style={radioStyle} value={1}>
                    รับรอง
                  </Radio>
                  <Radio style={radioStyle} value={0}>
                    ไม่รับรอง
                  </Radio>
                </Radio.Group>
              </FilterItem>
            </Col>
            <Col xs={24} md={18}>
              {
                courses.map((item, index) => (
                  <CourseCard
                    key={index}
                    onClick={() => Router.push(`/course/${item.id}`)}
                  >
                    <CourseImage src={item.cover} />
                    <CourseContent>
                      <CourseTitle>
                        <div>
                          {item.name}
                        </div>
                        {
                          item.hasCertificate &&
                          <Tag outline>รับรองใบประกาศฯ</Tag>
                        }
                      </CourseTitle>
                      <CourseDescription>
                        <CourseDescriptionText>{item.overview_course}</CourseDescriptionText>
                        <Tag color={item.category_color}>{item.category_name}</Tag>
                      </CourseDescription>
                      <CourseCardDetail>
                        <CourseCardItem>
                          <CourseCardIcon className='fa fa-book' />
                          <CourseCardDetailText>{item.total_lesson} บทเรียน</CourseCardDetailText>
                        </CourseCardItem>
                        <CourseCardItem>
                        <CourseCardIcon className='fa fa-calendar' />
                          <CourseCardDetailText>{timeConvert(item.lesson_time)}</CourseCardDetailText>
                        </CourseCardItem>
                      </CourseCardDetail>
                      <CourseFooter>
                        <AuthorContent>
                          <Avatar size={32} icon={<UserOutlined />} src={item.list_instructor[0].profile} />
                          <AuthorName>{item.list_instructor[0].firstname} {item.list_instructor[0].lastname}</AuthorName>
                        </AuthorContent>
                        <FooterRight>
                          <CoursePrice>
                            {item.is_has_cost ? commaNumber(item.cost) : 'ฟรี'}
                          </CoursePrice>
                          <CourseTime>
                            {
                              item.is_always_learning === false ? `เริ่ม ${moment(item.start_learning).format('DD MMM YYYY')}` : ''
                            }
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

CoursePage.getInitialProps = () => {
  return {}
}

export default CoursePage
