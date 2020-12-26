import MainLayout from '../layouts/main'
import styled from 'styled-components'
import Container from '../components/Container'
import font from '../helpers/font'
import { Input, Row, Col, message, Collapse } from 'antd'
import { SearchOutlined, SettingOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import API from '../helpers/api'
import constants from '../constants'
import { maxWidth } from '../helpers/breakpoint'

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
    color: #00937B;
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

`
const FaqTypeName = styled('div')`
  margin-top: 15px;
  white-space: nowrap;
`

const FAQPage = ({ master }) => {
  const [currentType, setCurrentType] = useState(constants.FAQ_TYPE.HOW_TO_USE)
  const [faqs, setFaqs] = useState([])

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
      console.log('fetchFaq', data)
      setFaqs(data)
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <MainLayout>
      <Container paddingTop='32px' paddingBottom='47px'>
        <Title>คำถามที่พบบ่อย</Title>
        <Input
          style={{marginTop: '32px'}}
          placeholder="ค้นหาปัญหาคำถาม"
          prefix={<SearchOutlined style={{color: '#DADADA'}} />}
        />
        <Row style={{marginTop: '32px'}} gutter={{ lg: 16, xs: 8 }} justify='space-between' align='middle'>
          {
            master.faq_type.map((item, index) => (
              <Col lg={4} key={index}>
                <FaqTypeCard
                  onClick={() => onChangeType(item.id)}
                  isActive={currentType === item.id}
                >
                  <FaqTypeIcon><SettingOutlined style={{fontSize: '32px'}} /></FaqTypeIcon>
                  <FaqTypeName>{item.name}</FaqTypeName>
                </FaqTypeCard>
              </Col>
            ))
          }
        </Row>
        <HowToTitle>การใช้งานเว็ปไซต์</HowToTitle>
        <CollapseWrapper defaultActiveKey={['0']} style={{marginTop: '16px'}}>
          {
            faqs.length > 0 && faqs.filter(item => item.faq_type_id === currentType).map((faq, index) => (
              <PanelWrapper header={faq.question} key={index}>
                <p>{faq.answer}</p>
              </PanelWrapper>
            ))
          }
        </CollapseWrapper>
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

FAQPage.getInitialProps = ({  }) => {
  return { }
}


export default FAQPage
