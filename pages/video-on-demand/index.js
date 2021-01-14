import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import Container from '../../components/Container'
import font from '../../helpers/font'
import { Divider, Select, Row, Col, Slider, DatePicker, Space, Checkbox, Radio, message, Avatar } from 'antd'
import Router from 'next/router'
const { Option } = Select
import { useState, useEffect } from 'react'
import API from '../../helpers/api'
import moment from 'moment'
import _ from 'lodash'
import axios from 'axios'
import { CategoryModal, ArrangeModal } from '../../components/modals/index'

const CheckboxGroup = Checkbox.Group

const Wrapper = styled('div')`
  .ant-checkbox-wrapper {
    display: block;
  }
`

const Content = styled('div')`
  display: flex;
  align-items: flex-start;
`

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
  font-weight: 700;
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
  font-size: 18px;
  font-family: ${font.bold};
  color: #333333;
  margin-top: 24px;
`

const FilterTitle = styled('div')`
  font-size: 18px;
`

const FilterItem = styled('div')`
  margin: 16px 0;
`

const MobileContainer = styled('div')`
  margin-bottom: 16px;
`

const TitleEventHandler = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 12px;
  align-items: center;
`

const TitleEventHandlerItem = styled('div')`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const TitleEventHandlerText = styled('div')`
  color: #41A0FC;
  font-size: 18px;
`

const Icon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 8px;
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
      const params = (Object.keys(filter).map((key, index) => {
        return `${key}=${filter[key]}`
      })).join('&')
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetAllVideo?${params}`
      })
      const data = response.data.data
      setCourses(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const [isCategoryModdalOpen, setIsCategoryModalOpen] = useState(false)
  const [isArrangeModalOpen, setIsArrangeModalOpen] = useState(false)
  return (
    <MainLayout>
      <Wrapper>
        <CategoryModal
          isOpen={isCategoryModdalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
        />
        <ArrangeModal
          isOpen={isArrangeModalOpen}
          onClose={() => setIsArrangeModalOpen(false)}
        />
        <Container paddingTop='32px'>
          <Row gutter={24}>
            <Col xs={0} md={6}>
              <Title>Video on demand</Title>
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
                <Option value='oldest'>เก่าสุด</Option>
              </Select>
              <BoldTitle>คัดกรอง</BoldTitle>
              <FilterItem>
                <FilterTitle>หมวดหมู่</FilterTitle>
                <Space direction='vertical' size={6} style={{ marginTop: '10px' }}>
                  <CheckboxGroup
                    options={master.course_category.map(item => item.name)}
                    onChange={(categoryDetails) => {
                      const categoryIds = categoryDetails.map(item => courseCategoryKey[item][0].id)
                      setFilter({
                        ...filter,
                        category_id: categoryIds.length === 0 ? 0 : categoryIds
                      })
                    }}
                  />
                </Space>
              </FilterItem>
            </Col>
            <Col xs={24} md={0}>
              <MobileContainer>
                <Title>Video on demand</Title>
                <TitleEventHandler>
                  <TitleEventHandlerItem>
                    <Icon src='/static/images/Filter.svg' />
                    <TitleEventHandlerText onClick={() => setIsCategoryModalOpen(true)}>ตัวกรอง</TitleEventHandlerText>
                  </TitleEventHandlerItem>
                  <TitleEventHandlerItem>
                    <Icon src='/static/images/Arrange.svg' />
                    <TitleEventHandlerText onClick={() => setIsArrangeModalOpen(true)}>จัดเรียง</TitleEventHandlerText>
                  </TitleEventHandlerItem>
                </TitleEventHandler>
              </MobileContainer>
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
