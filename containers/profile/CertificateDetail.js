import styled from 'styled-components'
import font from '../../helpers/font'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'
import { Row, Col, message } from 'antd'
import CourseCard from '../../components/CourseCard'

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

const Certificate = ({
  memberToken
}) => {
  const [certs, setCerts] = useState([])
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
        url: `${API.url}/Student/CertificateReadList`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        setCerts(responseWithData.data.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <Wrapper>
      <PageTitle>ใบประกาศนียบัตรนะ</PageTitle>
      {/* <Row gutter={16}>
        {
          certs.map((item, index) => (
            <Col lg={8} style={{margin: '6px 0'}}>
              <CourseCard
                type='cert'
                key={index}
                id={item.course_id}
                name={item.course_name}
                cover={item.cover_pic}
                totalLesson={item.count_lesson}
                lessonTime={item.lesson_time}
              />
            </Col>
          ))
        }
      </Row> */}
    </Wrapper>
  )
}

export default connector(Certificate)
