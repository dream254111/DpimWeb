import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import { Container, CourseCard } from '../../components'
import font from '../../helpers/font'
import { Row, Col, Avatar, message } from 'antd'
import { useEffect, useState } from 'react'
import API from '../../helpers/api'
import axios from 'axios'

const InstructureCard = styled('div')`
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
  padding: 16px 16px 18px 16px;
  display: flex;
`

const InstructureContent = styled('div')`
  margin-left: 12px;
`

const InstructureName = styled('div')`
  font-size: 18px;
  font-family: ${font.bold};
`

const InstructurePosition = styled('div')`
  margin-top: 8px;
  font-size: 18px;
`

const InstructureWork = styled('div')`
  margin-top: 8px;
  font-size: 14px;
`

const InstructureEmail = styled('div')`
  margin-top: 16px;
  font-size: 18px;
`

const InstructurePhone = styled('div')`
  margin-top: 8px;
  font-size: 18px;
`

const  InstructureSocial = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 11px;
`

const SocialIcon = styled('img')`
  width: 21px;
  cursor: pointer;
`

const InstructureDescription = styled('div')`
  background: #FFFFFF;
  border-radius: 4px;
  padding: 16px 24px;
  min-height: 300px;
`

const CourseTitle = styled('div')`
  margin-top: 32px;
  font-size: 32px;
  font-family: ${font.bold};
`

const UserPage = ({ userId }) => {
  const [instructureDetail, setInstructureDetail] = useState({})
  const [instructureCourses, setInstructureCourses] = useState([])

  useEffect(() => {
    fetchInstructureById()
  }, [])

  const fetchInstructureById = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetInstructor?id=${userId}`,
      })
      const data = response.data.data
      setInstructureDetail(data.instructor)
      setInstructureCourses(data.course)
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <MainLayout>
      <Container paddingTop='32px' paddingBottom='302px'>
        <Row gutter={{ lg: 16, xs: 0 }}>
          <Col xs={24} lg={7}>
            <InstructureCard>
              <Avatar size={72} src={instructureDetail.profile_image} />
              <InstructureContent>
                <InstructureName>{instructureDetail.firstname} {instructureDetail.lastname}</InstructureName>
                <InstructurePosition>{instructureDetail.position || '-'}</InstructurePosition>
                <InstructureWork>{instructureDetail.work || '-'}</InstructureWork>
                <InstructureEmail>{instructureDetail.email || '-'}</InstructureEmail>
                <InstructurePhone>{instructureDetail.phone || '-'}</InstructurePhone>
                <InstructureSocial>
                  {
                    instructureDetail.facebook && <SocialIcon
                      src='/static/images/facebook.svg'
                      onClick={() => window.open(instructureDetail.facebook, '_blank')}
                    />
                  }
                  {
                    instructureDetail.twitter && <SocialIcon
                      src='/static/images/twitter.svg'
                      onClick={() => window.open(instructureDetail.twitter, '_blank')}
                      style={{ marginLeft: '20px' }}
                    />
                  }
                </InstructureSocial>
              </InstructureContent>
            </InstructureCard>
          </Col>
          <Col xs={24} lg={17}>
            <InstructureDescription>
                <p dangerouslySetInnerHTML={{ __html: (instructureDetail.description) }} />
            </InstructureDescription>
          </Col>
      </Row>
        <CourseTitle>คอร์สที่สอน</CourseTitle>
        <Row gutter={16}>
            {
              instructureCourses.map((item, index) => (
                <Col xs={24} lg={8} style={{margin: '16px 0'}}>
                  <CourseCard
                    key={index}
                    id={item.id}
                    batch={item.batch}
                    categoryName={item.category_name}
                    categoryColor={item.category_color}
                    cover={item.cover}
                    isHasCost={item.is_has_cost}
                    cost={item.cost}
                    hasCertificate={item.hasCertificate}
                    instructors={item.list_instructor}
                    totalLesson={item.total_lesson}
                    lessonTime={item.lesson_time}
                    startLearning={item.start_learning}
                  />
                </Col>
              ))
            }
        </Row>
      </Container>
    </MainLayout>
  )
}


UserPage.getInitialProps = ({ query }) => {
  const userId = query.userId
  return {
    userId
  }
}

export default UserPage
