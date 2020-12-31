import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { Divider, Select, Row, Col, Slider, DatePicker, Space, Checkbox, Radio, message, Avatar } from 'antd'
import Router from 'next/router'
const { Option } = Select
import { useState, useEffect } from 'react'
import API from '../helpers/api'
import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'

const CheckboxGroup = Checkbox.Group

const Wrapper = styled('div')`
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

const VideoOnDemandPage = ({
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
        url: `${API.url}/Student/GetAllVideo?${params}`,
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
              <FilterTitle>รูปแบบการเรียน</FilterTitle>
                <Checkbox>คอร์สเรียนที่สถาบัน</Checkbox> <br />
                <Checkbox>คอร์สออนไลน์</Checkbox>
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
                <CourseCard key={index}>
                  <CourseImage src={item.cover_thumbnail} />
                  <CourseContent>
                    <CourseTitle>{item.name}</CourseTitle>
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

VideoOnDemandPage.getInitialProps = () => {
  return {}
}

export default VideoOnDemandPage
