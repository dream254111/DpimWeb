import MainLayout from '../../../layouts/main'
import styled from 'styled-components'
import { PROFILE_PAGE } from '../../../constants'
import { useState, useEffect } from 'react'
import { Row, Col, Avatar, Divider, Button, message, Select} from 'antd'
import Container from '../../../components/Container'
import { UserOutlined } from '@ant-design/icons'
import font from '../../../helpers/font'
import Router from 'next/router'
import { connect } from 'react-redux'
import axios from 'axios'
import API from '../../../helpers/api'
import CourseCard from '../../../components/CourseCard'
import { maxWidth } from '../../../helpers/breakpoint'
const { Option } = Select

const Wrapper = styled('div')`
  
`

const Card = styled('div')`
  background-color: white;
  border: 1px solid #F2F2F2;
  border-radius: 4px;
`

const CardHeader = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 12px 24px 24px 24px;
`

const CardName = styled('div')`
  margin-top: 8px;
  font-size: 14px;
  font-family: ${font.bold};
`

const Menus = styled('div')`
  margin-top: 12px;
  margin-bottom: 24px;
`

const Menu = styled('div')`
  color: #828282;
  padding: 12px 12px 12px 24px;
  font-size: 14px;
  cursor: pointer;
  ${props => props.isActive && `
    color: #00937B;
    font-family: ${font.bold};
    background-color: rgba(0, 147, 123, 0.08);
  `}
`

const PageTitle = styled('div')`
  color: #00937B;
  font-size: 24px;
  font-family: ${font.bold};
`

const CertImage = styled('img')`
  margin-top: 22px;
  width: 100%;
`

const CertDetailWrapper = styled('div')`
  width: 80%;
  ${maxWidth.xs`
    width: 100%;
  `}

`

const LeftContent = styled('div')`
  float: right;
  margin-top: 24px;
  ${maxWidth.sm`
  float: none;
  `}
`

const CertButtonWrapper = styled('div')`
  display: flex;
  align-items: center;
  ${maxWidth.sm`
    flex-direction: column;

  `}

`

const PrintCount = styled('div')`
  display: block;
  margin-top: 12px;
  text-align: right;
`

const MobileCard = styled(Card)`
  margin-bottom: 24px;
`

const StyledSelect = styled(Select)`
.ant-select-arrow {
  color: #00937B;
  padding-right: 30.2px;
}
&&& {
  background-color: rgba(0, 147, 123, 0.08);
  padding: 8px 0;
}
`

const StyledButton = styled(Button)`
  margin-left: 16px;
  width: 100%;
  ${maxWidth.sm`
    margin-left: 0;
    margin-top: 10px;
  `}
`


const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const CertificateIdPage = ({
  memberDetail,
  master,
  certId,
  memberToken
}) => {
  const [certDetail, setCertDetail] = useState({})
  const [courseDetail, setCourseDetail] = useState({}) 
  const onMenuChange = (tabs) => {
    switch (tabs) {
      case PROFILE_PAGE.BASIC_INFORMATION:
        Router.push(`/profile/${PROFILE_PAGE.BASIC_INFORMATION}`)
        break
      case PROFILE_PAGE.COURSES:
        Router.push(`/profile/${PROFILE_PAGE.COURSES}`)
        break
      case PROFILE_PAGE.CERTIFICATE:
        Router.push(`/profile/${PROFILE_PAGE.CERTIFICATE}`)
        break
      default: null
    }
  }

  useEffect(() => {
    fetchCertById()
  }, [])
    
  const fetchCertById = async () => {
    try {
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Student/CertificateRead?certificate_id=${certId}`,
      })
      const responseWithData = response.data
      console.log('responseWithData', responseWithData.data)
      if (responseWithData.success) {
        setCertDetail(responseWithData.data.data)
        const courseId = responseWithData.data.data.course_id
        fetchCourseDetail(courseId)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const fetchCourseDetail = async (courseId) => {
    try {
      console.log('courseId', courseId)
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Course/course_info?course_id=${courseId}`,
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        console.log('courseDetail', responseWithData)
        setCourseDetail(responseWithData.data)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleSendCertToEmail = async () => {
    try {
      await axios({
          headers: {
            'Authorization': memberToken
          },
          method: 'POST',
          url: `${API.url}/Student/send_email_cert`,
          data : {
            course_id :courseDetail.course.id
          }
      })
      message.success('ใบประกาศได้ส่งไปที่อีเมล์ของท่านเรียบร้อยแล้ว')
    } catch (error) {
      message.error(error.message)
    }
  }
      
  const handleDownloadCert = async () => {
    try {
      await axios({
          headers: {
            'Authorization': memberToken
          },
          method: 'GET',
          url: `${API.url}/Student/PrintCertificate`,
          params : {
              course_id : courseDetail.course.id
          }
      })

      const a = document.createElement('a'); // Create <a>
      a.href = certDetail.cert_path; // Image Base64 Goes here
      a.download = 'Image'; // File name Here
      a.click(); // Downloaded file

    } catch (error) {
        message.error(error.message)
    }
  }

  return (
    <MainLayout>
      <Wrapper>
        <Container paddingTop='32px' paddingBottom='153px'>
          <Row gutter={{ lg: 16 }}>
            <Col lg={7} xs={0}>
              <Card>
                <CardHeader>
                  <Avatar size={48} icon={<UserOutlined />} src={memberDetail.profile_path} />
                  <CardName>{memberDetail.firstname} {memberDetail.lastname}</CardName>
                </CardHeader>
                <Divider style={{margin: 0 }} />
                <Menus>
                  <Menu
                      // isActive={profilePageSlug === PROFILE_PAGE.BASIC_INFORMATION}
                      onClick={() => onMenuChange(PROFILE_PAGE.BASIC_INFORMATION)}
                    >โปรไฟล์ของฉัน</Menu>
                  <Menu
                      // isActive={profilePageSlug === PROFILE_PAGE.COURSES}
                      onClick={() => onMenuChange(PROFILE_PAGE.COURSES)}
                    >คอร์สของฉัน</Menu>
                  <Menu
                      isActive={true}
                      onClick={() => onMenuChange(PROFILE_PAGE.CERTIFICATE)}
                  >ใบประกาศนียบัตร</Menu>
                </Menus>
              </Card>
            </Col>
            <Col sm={24} xs={24} lg={0}>
            <MobileCard>
                <CardHeader>
                  <Avatar size={48} icon={<UserOutlined />} src={memberDetail.profile_path} />
                  <CardName>{memberDetail.firstname} {memberDetail.lastname}</CardName>
                </CardHeader>
                <Divider style={{margin: 0 }} />
                <StyledSelect
                  style={{
                    margin: '12px 0',
                    width: '100%', 
                    color:'#00937B', 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                  }}
                  bordered={false}
                  value='ใบประกาศนียบัตร'
                  onChange={(value) => onMenuChange(value)}
                >
                  <Option style={{padding: '8px 12px'}} value={PROFILE_PAGE.BASIC_INFORMATION}>โปรไฟล์ของฉัน</Option>
                  <Option style={{padding: '8px 12px'}} value={PROFILE_PAGE.COURSES}>คอร์สของฉัน</Option>
                  <Option style={{padding: '8px 12px'}} value={PROFILE_PAGE.CERTIFICATE}>ใบประกาศนียบัตร</Option>
                </StyledSelect>
              </MobileCard>
            </Col>
            <Col lg={17}>
              <CertDetailWrapper>
                <PageTitle>ใบประกาศนียบัตรนะ</PageTitle>
                <CertImage src={certDetail.cert_path} />
                <LeftContent>
                  <CertButtonWrapper>
                    <Button onClick={handleSendCertToEmail} style={{width: '100%'}}>ส่งไปที่อีเมล</Button>
                    <StyledButton 
                      type='primary' 
                      onClick={handleDownloadCert}>
                        ดาวน์โหลดใบประกาศ
                    </StyledButton>
                  </CertButtonWrapper>
                  <PrintCount>จำนวนครั้งที่พิมพ์ {certDetail.print_count}</PrintCount>
                </LeftContent>
                <CourseDetail>
                  <CourseDetailTitle>สำหรับคอร์ส</CourseDetailTitle>
                  <CourseCard
                    style={{marginTop: '20px'}}
                    type='cert'
                    id={courseDetail?.course?.id}
                    name={courseDetail?.course?.name}
                    cover={courseDetail?.course?.cover}
                    totalLesson={courseDetail?.course?.count_lesson}
                    lessonTime={courseDetail?.course?.lesson_time}
                  />
                </CourseDetail>
              </CertDetailWrapper>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}


const CourseDetail = styled('div')`
  margin-top: 24px;
`

const CourseDetailTitle = styled('div')`
  font-size: 16px;
`

CertificateIdPage.getInitialProps = ({ query }) => {
  return {
    profilePageSlug: query.profilePageSlug,
    certId: query.certId
  }
}

export default connector(CertificateIdPage)

