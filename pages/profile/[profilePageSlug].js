import MainLayout from '../../layouts/main'
import styled from 'styled-components'
import BasicInformation from '../../containers/profile/BasicInformation'
import Certificate from '../../containers/profile/Certificate'
import Courses from '../../containers/profile/Courses'
import { PROFILE_PAGE } from '../../constants'
import { useState, useEffect } from 'react'
import { Row, Col, Avatar, Divider, Button, Select } from 'antd'
import Container from '../../components/Container'
import { UserOutlined } from '@ant-design/icons'
import font from '../../helpers/font'
import Router from 'next/router'
import { connect } from 'react-redux'
const { Option } = Select

const Wrapper = styled('div')`
  padding: 64px 0 0;
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
  font-size: 18px;
  font-family: ${font.bold};
`

const Menus = styled('div')`
  margin-top: 12px;
  margin-bottom: 24px;
`

const Menu = styled('div')`
  color: #828282;
  padding: 12px 12px 12px 24px;
  font-size: 18px;
  cursor: pointer;
  ${props => props.isActive && `
    color: #00937B;
    font-family: ${font.bold};
    background-color: rgba(0, 147, 123, 0.08);
  `}
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

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const ProfileSlugPage = ({ memberDetail, master, profilePageSlug }) => {

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
  
  const selectOnChange = () => {
    if(profilePageSlug === PROFILE_PAGE.BASIC_INFORMATION) {
      return 'โปรไฟล์ส่วนตัว'
    }
    else if (profilePageSlug === PROFILE_PAGE.COURSES) {
      return 'คอร์สของฉัน'
    }
    else if (profilePageSlug === PROFILE_PAGE.CERTIFICATE) {
      return 'ใบประกาศนียบัตร'
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
                  {
                    memberDetail.profile_path &&
                    <Avatar size={48} icon={<UserOutlined />} src={memberDetail.profile_path} />
                  }
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
            <Col sm={24} xs={24} lg={0}>
            <MobileCard>
                <CardHeader>
                  {
                    memberDetail.profile_path &&
                    <Avatar size={48} icon={<UserOutlined />} src={memberDetail.profile_path} />
                  }
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
                  value={selectOnChange()}
                  onChange={(value) => onMenuChange(value)}
                >
                  <Option style={{padding: '8px 12px'}} value={PROFILE_PAGE.BASIC_INFORMATION}>โปรไฟล์ของฉัน</Option>
                  <Option style={{padding: '8px 12px'}} value={PROFILE_PAGE.COURSES}>คอร์สของฉัน</Option>
                  <Option style={{padding: '8px 12px'}} value={PROFILE_PAGE.CERTIFICATE}>ใบประกาศนียบัตร</Option>
                </StyledSelect>
              </MobileCard>
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
