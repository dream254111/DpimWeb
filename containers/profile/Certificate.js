import styled from 'styled-components'
import font from '../../helpers/font'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'
import { Row, Col, message } from 'antd'

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
        console.log('cert', responseWithData.data.data)
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
      <PageTitle>ใบประกาศนียบัตร</PageTitle>
      <Row gutter={16}>
        {
          certs.map((item, index) => (
            <Col lg={8} style={{margin: '6px 0'}}>
              <CourseCard
                type='cert'
                key={index}
                name={item.name}
                cover={item.cover}
                totalLesson={item.count_lesson}
                lessonTime={item.course_time}
              />
            </Col>
          ))
        }
      </Row>
    </Wrapper>
  )
}

export default connector(Certificate)
