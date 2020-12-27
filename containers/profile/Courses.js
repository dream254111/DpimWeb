import styled from 'styled-components'
import font from '../../helpers/font'
import { Tabs, Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'
import { CourseCard } from '../../components'

const { TabPane } = Tabs

const PageTitle = styled('div')`
  color: #00937B;
  font-size: 24px;
  font-family: ${font.bold};
`

const Wrapper = styled('div')`

`
const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const CoursesContainer = ({
  memberToken
}) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Course/my_course`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        setCourses(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <Wrapper>
      <PageTitle>คอร์สของฉัน</PageTitle>
      <Tabs defaultActiveKey="1">
        <TabPane tab="กำลังเรียนอยู่" key="1">
          <Row gutter={16}>
            {
              courses.filter(item => item.progress !== 100).map((item, index) => (
                <Col lg={8} style={{margin: '6px 0'}}>
                  <CourseCard
                    type='progress'
                    key={index}
                    name={item.name}
                    cover={item.cover}
                    totalLesson={item.count_lesson}
                    lessonTime={item.course_time}
                    progress={item.progress}
                    endDate={item.learning_end_date}
                  />
                </Col>
              ))
            }
          </Row>
        </TabPane>
        <TabPane tab="จบหลักสูตร" key="2">
        <Row gutter={16}>
            {
              courses.filter(item => item.progress === 100).map((item, index) => (
                <Col lg={8} style={{margin: '6px 0'}}>
                  <CourseCard
                    type='progress'
                    key={index}
                    name={item.name}
                    cover={item.cover}
                    totalLesson={item.count_lesson}
                    lessonTime={item.course_time}
                    progress={item.progress}
                    endDate={item.learning_end_date}
                  />
                </Col>
              ))
            }
          </Row>
        </TabPane>
      </Tabs>
    </Wrapper>
  )
}

export default connector(CoursesContainer)
