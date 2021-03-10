import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import Container from '../../components/Container'
import font from '../../helpers/font'
import { maxWidth } from '../../helpers/breakpoint'
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
import { FilterModal, ArrangeModal } from '../../components/modals/index'
import { Banner } from '../../components/index'

const Wrapper = styled('div')`
  .ant-checkbox-wrapper {
    display: block;
  }
`

const Title = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
  display: none;
  ${maxWidth.sm`
    display: block;
  `}
`

const CourseCard = styled('div')`
  position: relative;
  background-color: white;
  border-radius: 16px;
  padding: 12px;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${maxWidth.sm`
    flex-direction: column;
  `}
`

const CourseImage = styled('div')`
  min-width: 275px;
  min-height: 150px;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 16px;
  ${maxWidth.sm`
   
  `}
`

const CourseTitle = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
  display: flex;
  align-items: center;
  justify-content: space-between;

    div&:nth-child(1) {
      width: 75%;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 4.8em;
    }
  
  ${maxWidth.sm`
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    order: 2;

  `}
`

const CourseContent = styled('div')`
  margin-left: 12px;
  width: 100%;
  ${maxWidth.sm`
    margin-top: 12px;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
  `}
`

const CourseDescription = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${maxWidth.md`
    order: 3;
  `}
`

const CourseDescriptionText = styled('div')`
  font-size: 18px;
  width: 80%;
  margin-top: 4px;
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
   ${maxWidth.md`
     width: 100%;
   `}
   ${maxWidth.xs`
     display: none;
   `}
`


const CourseCardDetailText = styled('div')`
  margin-left: 7.33px;
  color: #828282;
  font-size: 18px;
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
  ${maxWidth.sm`
  `}
`

const CourseFooter = styled('div')`
  display: flex;
  flex-direction: row;

  ${maxWidth.sm`
  flex-direction: column;
    order: 4;
  `}
`

const AuthorContent = styled('div')`
  margin-top: 12px;
  display: flex;
  align-items: center;
  flex: 1;
  ${maxWidth.sm`
    margin-bottom: 60px;
  `}
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
  font-size: 18px;
`

const FooterRight = styled('div')`
  text-align: right;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${maxWidth.sm`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `}
`

const CoursePrice = styled('div')`
  font-size: 20px;
  font-family: ${font.bold};
  color: #00937B;
  margin-top: 12px;
  ${maxWidth.sm`
    margin-top: 0;
    order: 2
  `}
`

const CourseTime = styled('div')`
  margin-top: 8px;
  font-size: 18px;
  ${maxWidth.sm`
    margin-top: 0;
    order: 1;
    text-align: left;
`}
`

const BoldTitle = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
  color: #333333;
  margin-top: 24px;
`

const FilterTitle = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
`

const FilterItem = styled('div')`
  margin: 16px 0;
`

const LeftTag = styled(Tag)`
  position: absolute;
    top: 12px;
    right: 12px;
  ${maxWidth.sm`
    position: absolute;
    top: initial;
    right: initial;
    bottom: 53px;
    left: 12px;
  `}
`

const RightTag = styled(Tag)`
  position: absolute;
  right: 12px;
  top: 48px;
  ${maxWidth.sm`
    top: initial;
    position: absolute;
    left: initial;
    right: 12px;
    bottom: 53px;
`}
`

const HorizontalLine = styled('div')`
  width: 100%;
  height: 1px;
  background-color: #F2F2F2;
  display: none;
  margin 12px 0;
  ${maxWidth.sm`
    display: block;
  `}
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

const CourseContainer = styled(Container)`
  &&& {
    max-width: 1440px;
    width: 93%;
  }
`

const CoursePage = ({
  master,
  search
}) => {
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState(null)
  const courseCategoryKey = _.groupBy(master.course_category, 'name')

  useEffect(() => {
    if (filter !== null) {
      fetchCourseList()
    }
  }, [filter])

  useEffect(() => {
    setFilter(JSON.parse(JSON.stringify({
      ...filter,
      search
    })))
  }, [search])

  const fetchCourseList = async () => {
    try {
      let _filter = JSON.parse(JSON.stringify(filter))
      if (_filter.is_free === true) {
        delete _filter.price_gte
        delete _filter.price_lte
      }
      let params = (Object.keys(_filter).filter(key => _filter[key]).map((key, index) => {
        return `${key}=${_filter[key]}`
      })).join('&')
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Course/list_course?${params}`
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
    lineHeight: '30px'
  }

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isArrangeModalOpen, setIsArrangeModalOpen] = useState(false)
  return (
    <MainLayout>
      <Wrapper>
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          learningOnline={filter?.learning_online}
          onSubmit={(value) => {
            setFilter({
              ...filter,
              learning_online: value.toString()
            })
          }}
        />
        <ArrangeModal
          isOpen={isArrangeModalOpen}
          onClose={() => setIsArrangeModalOpen(false)}
          sort={filter?.sort}
          onSubmit={(value) => {
            setFilter({
              ...filter,
              sort: value
            })
          }}
        />
        <Banner IconImage='/static/images/courseicon.svg'>คอร์สเรียน</Banner>
        <CourseContainer paddingTop='32px'>
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
                <Option value='cheapest'>ราคาต่ำสุด</Option>
                <Option value='expensive'>ราคาแพงสุด</Option>
                <Option value='newest'>หลักสูตรใหม่</Option>
                <Option value='letters'>ลำดับตัวอักษร</Option>
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
              <Divider style={{margin: 0}} />
              <FilterItem>
                <FilterTitle>รูปแบบการเรียน</FilterTitle>
                <Radio.Group
                  style={{marginTop: '8px'}}
                  onChange={(event) => {
                  setFilter({
                    ...filter,
                    learning_online: event.target.value.toString()
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
                    hasCertificate: event.target.value.toString()
                  })
                }}>
                  <Radio style={radioStyle} value={1}>
                    มี
                  </Radio>
                  <Radio style={radioStyle} value={0}>
                    ไม่มี
                  </Radio>
                </Radio.Group>
              </FilterItem>
            </Col>
            <Col xs={24} md={0}>
              <MobileContainer>
                <Title>คอร์สเรียน</Title>
                <TitleEventHandler>
                  <TitleEventHandlerItem>
                    <Icon src='/static/images/Filter.svg' />
                    <TitleEventHandlerText onClick={() => setIsFilterModalOpen(true)}>ตัวกรอง</TitleEventHandlerText>
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
                  <CourseCard
                    key={index}
                    onClick={() => Router.push(`/course/${item.id}`)}
                  >
                    <CourseImage src={item.cover} />
                    <CourseContent>
                      <CourseTitle>
                        <div>
                          {item.name}&nbsp;(รุ่น {item.batch})
                        </div>
                        {
                          item.hasCertificate &&
                            <RightTag outline>มีใบประกาศฯ</RightTag>
                        }
                      </CourseTitle>
                      <CourseDescription>
                        <LeftTag color={item.category_color}>{item.category_name}</LeftTag>
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
                      <HorizontalLine />
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
        </CourseContainer>
      </Wrapper>
    </MainLayout>
  )
}

CoursePage.getInitialProps = (ctx) => {
  const { search } = ctx.query
  return { search }
}

export default CoursePage
