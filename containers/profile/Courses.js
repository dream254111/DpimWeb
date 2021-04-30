import styled from 'styled-components'
import font from '../../helpers/font'
import { Tabs, message } from 'antd'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'
import { CourseCard } from '../../components'
import { maxWidth } from '../../helpers/breakpoint'

const { TabPane } = Tabs

const PageTitle = styled('div')`
  color: #00937B;
  font-size: 24px;
  font-family: ${font.bold};
`

const Wrapper = styled('div')`

`

const CourseGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 32px;
  padding: 16px 0 32px 16px;
  ${maxWidth.sm`
    grid-template-columns: repeat(1, 1fr);
  `}
`

const CourseGridItem = styled('div')`
`

const CourseCardX = styled(CourseCard)`
  width: 285px !important;
  ${maxWidth.sm`
    width: 315px !important;
  `}
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
          Authorization: memberToken
        },
        method: 'GET',
        url: `${API.url}/Course/my_course`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        setCourses((responseWithData && responseWithData.data) || [])
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
      <Tabs defaultActiveKey='1'>
        <TabPane tab={`กำลังเรียนอยู่(${courses.filter(item => item.progress !== 100).length})`} key='1'>
          <CourseGrid>
            {
              courses.filter(item => item.progress !== 100).map((item, index) => (
                <CourseGridItem key={index}>
                  <CourseCardX
                    type='progress'
                    batch={item.batch}
                    id={item.id}
                    name={item.name}
                    cover={item.cover}
                    totalLesson={item.count_lesson}
                    lessonTime={item.course_time}
                    progress={item.progress}
                    endDate={item.learning_end_date}
                  />
                </CourseGridItem>
              ))
            }
          </CourseGrid>
        </TabPane>
        <TabPane tab={`จบหลักสูตร(${courses.filter(item => item.progress === 100).length})`} key='2'>
          <CourseGrid>
            {
              courses.filter(item => item.progress === 100).map((item, index) => (
                <CourseGridItem key={index}>
                  <CourseCardX
                    id={item.id}
                    type='progress'
                    key={index}
                    name={item.name}
                    cover={item.cover}
                    totalLesson={item.count_lesson}
                    lessonTime={item.course_time}
                    progress={item.progress}
                    endDate={item.learning_end_date}
                    style={{ width: '100%' }}
                  />
                </CourseGridItem>
              ))
            }
          </CourseGrid>
        </TabPane>
      </Tabs>
    </Wrapper>
  )
}

export default connector(CoursesContainer)
