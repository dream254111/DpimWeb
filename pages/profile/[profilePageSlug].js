import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import BasicInformation from '../../containers/profile/BasicInformation'
import Certificate from '../../containers/profile/Certificate'
import Courses from '../../containers/profile/Courses'
import { PROFILE_PAGE } from '../../constants'
import { useState, useEffect } from 'react'
import { Row, Col, Avatar, Divider, Button } from 'antd'
import Container from '../../components/Container'
import { UserOutlined } from '@ant-design/icons'
import font from '../../helpers/font'
import Router from 'next/router'
import { connect } from 'react-redux'

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


const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const ProfileSlugPage = ({ memberDetail, master, profilePageSlug }) => {
  // useEffect(() => {
  //   switch (profilePageSlug) {
  //     case PROFILE_PAGE.BASIC_INFORMATION:
  //         console.log('fetchBasicInformation')
  //       break
  //       case PROFILE_PAGE.COURSES:
  //         console.log('fetch course')
  //       break
  //       case PROFILE_PAGE.CERTIFICATE:
  //         console.log('fetch certi')
  //       break

  //   }
  // }, [profilePageSlug])
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

  return (
    <MainLayout>
      <Wrapper>
        <Container paddingTop='32px' paddingBottom='153px'>
          <Row gutter={{ lg: 16 }}>
            <Col lg={7}>
              <Card>
                <CardHeader>
                  <Avatar size={48} icon={<UserOutlined />} src={memberDetail.profile_path} />
                  <CardName>{memberDetail.firstname} {memberDetail.lastname}</CardName>
                </CardHeader>
                <Divider style={{margin: 0 }} />
                <Menus>
                  <Menu
                      isActive={profilePageSlug === PROFILE_PAGE.BASIC_INFORMATION}
                      onClick={() => onMenuChange(PROFILE_PAGE.BASIC_INFORMATION)}
                    >โปรไฟล์ของฉัน</Menu>
                  <Menu
                      isActive={profilePageSlug === PROFILE_PAGE.COURSES}
                      onClick={() => onMenuChange(PROFILE_PAGE.COURSES)}
                    >คอร์สของฉัน</Menu>
                  <Menu
                      isActive={profilePageSlug === PROFILE_PAGE.CERTIFICATE}
                      onClick={() => onMenuChange(PROFILE_PAGE.CERTIFICATE)}
                  >ใบประกาศนียบัตร</Menu>
                </Menus>
              </Card>
            </Col>
            <Col lg={17}>
              {
                profilePageSlug === PROFILE_PAGE.BASIC_INFORMATION &&
                  <BasicInformation master={master} />
              }
              {
                profilePageSlug === PROFILE_PAGE.COURSES &&
                  <Courses master={master} />
              }
              {
                profilePageSlug === PROFILE_PAGE.CERTIFICATE &&
                  <Certificate master={master} />
              }
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}


ProfileSlugPage.getInitialProps = ({ query }) => {
  return {
    profilePageSlug: query.profilePageSlug
  }
}

export default connector(ProfileSlugPage)
