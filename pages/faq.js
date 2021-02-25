import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { Input, Row, Col, message, Collapse } from 'antd'
import { SearchOutlined, SettingOutlined, UserOutlined, TagOutlined, GlobalOutlined, ReadOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../helpers/api'
import constants from '../constants'
import { maxWidth } from '../helpers/breakpoint'
import { stripHtml } from '../helpers/util'
import _ from 'lodash'
import { Banner } from '../components/index'

const { Panel } = Collapse

const Title = styled('div')`
  font-family: ${font.bold};
  font-size: 32px;
`

const FaqTypeCard = styled('div')`
  background-color: white;
  padding: 29px 31px 24px 31px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04), 0px 2px 4px rgba(96, 97, 112, 0.16);
  border-radius: 4px;
  ${props => props.isActive && `
    ${FaqTypeIcon} {
      color: #00937B;
    }
    border: 1px solid #00937B;
    box-shadow: 0px 0px 2px rgba(40, 41, 61, 0.04), 0px 4px 8px rgba(96, 97, 112, 0.16);
  `};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 192px;
  ${maxWidth.md`
    width: 148px;
  `}
  margin: 8px 0;
`

const FaqTypeIcon = styled('div')`
  font-size: 32px;
  color: #E0E0E0; 
`

const FaqTypeName = styled('div')`
  margin-top: 15px;
  white-space: nowrap;
`

const FAQPage = ({ master }) => {
  const masterFaqTypes = [
    { id: 5, name: 'หลักสูตรการเรียน' },
    { id: 6, name: 'สมัครสมาชิก' },
    { id: 7, name: 'การชำระเงิน' },
    { id: 4, name: 'การใช้งานเว็บไซต์' },
    { id: 8, name: 'อื่นๆ' }
  ]
  const [currentType, setCurrentType] = useState(constants.FAQ_TYPE.HOW_TO_USE)
  const [faqs, setFaqs] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const faqTypeKey = _.groupBy(masterFaqTypes, 'id')
  useEffect(() => {
    fetchType()
  }, [])

  const onChangeType = (typeId) => {
    setCurrentType(typeId)
  }

  const fetchType = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API.url}/Student/GetFAQ`,
      })
      const { data } = response.data.data
      setFaqs(data)
    } catch (error) {
      message.error(error.message)
    }
  }

  const onSearch = (text) => {
    if (text) {
      const result = faqs.filter(item => item.question.indexOf(text) !== -1)
      setSearchResult(result)
    } else {
      setSearchResult([])
    }
  }
  const renderFaqTypeIcon = (typeId) => {
    switch (typeId) {
      case constants.FAQ_TYPE.HOW_TO_USE:
        return (
          <FaqTypeIcon>
            <SettingOutlined />
          </FaqTypeIcon>
        )
      case constants.FAQ_TYPE.PAYMENT:
        return (
          <FaqTypeIcon>
            <TagOutlined />
          </FaqTypeIcon>
        )
      case constants.FAQ_TYPE.COURSE:
        return (
          <FaqTypeIcon>
            <ReadOutlined />
          </FaqTypeIcon>
        )
      case constants.FAQ_TYPE.REGISTER:
        return (
          <FaqTypeIcon>
              <UserOutlined />
          </FaqTypeIcon>
        )
      case constants.FAQ_TYPE.ETC:
        return (
          <FaqTypeIcon>
              <GlobalOutlined />
          </FaqTypeIcon>
        )
      default: return null
    }
  }
  console.log('masterFaqTypes', masterFaqTypes)
  return (
    <MainLayout>
      <Banner IconImage='/static/images/fagicon.svg'>คำถามที่พบบ่อย</Banner>
      <Container paddingTop='32px' paddingBottom='47px'>
        <Input
          style={{marginTop: '32px'}}
          placeholder='ค้นหาปัญหาคำถาม'
          prefix={<SearchOutlined style={{ color: '#DADADA' }} />}
          onChange={(event) => onSearch(event.target.value)}
        />
        {
          searchResult.length > 0 ?
            <CollapseWrapper defaultActiveKey={['0']} style={{ marginTop: '16px' }}>
              {
                faqs.map((faq, index) => (
                  <PanelWrapper header={faq.question} key={index}>
                    <p>{stripHtml(faq.answer)}</p>
                  </PanelWrapper>
                ))
            }
            </CollapseWrapper>
            :
            <>
              <Row style={{marginTop: '32px'}} gutter={{ lg: 16, xs: 8 }} justify='space-between' align='middle'>
                {
                  masterFaqTypes.map((item, index) => (
                    <Col lg={4} key={index}>
                      <FaqTypeCard
                        onClick={() => onChangeType(item.id)}
                        isActive={currentType === item.id}
                      >
                        <FaqTypeIcon>{renderFaqTypeIcon(item.id)}</FaqTypeIcon>
                        <FaqTypeName>{item.name}</FaqTypeName>
                      </FaqTypeCard>
                    </Col>
                  ))
                }
              </Row>
              <HowToTitle>{faqTypeKey[currentType][0].name}</HowToTitle>
              <CollapseWrapper defaultActiveKey={['0']} style={{marginTop: '16px'}}>
                {
                  faqs.length > 0 && faqs.filter(item => item.faq_type_id === currentType).map((faq, index) => (
                    <PanelWrapper header={faq.question} key={index}>
                      <p>{stripHtml(faq.answer)}</p>
                    </PanelWrapper>
                  ))
                }
              </CollapseWrapper>
            </>
        }
      </Container>
    </MainLayout>
  )
}

const CollapseWrapper = styled(Collapse)`
  .ant-collapse-item {
    margin-top: 20px !important;
  }
  border: unset !important;
  .ant-collapse {
  }
`

const PanelWrapper = styled(Panel)`
  span {
    left: unset !important;
    right: 20px !important;
  }
  .ant-collapse-header {
    background-color: white;
    padding-left: 16px !important;
  }
`

const HowToTitle = styled('div')`
  font-size: 24px;
  font-family: ${font.bold};
  margin-top: 32px;
`

FAQPage.getInitialProps = () => {
  return { }
}

export default FAQPage
