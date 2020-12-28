import MainLayout from '../layouts/main'
import styled from 'styled-components'
import font from '../helpers/font'
import { Card, Form, Input, Select } from 'antd'
import { useEffect } from 'react'
const { Option } = Select
const { TextArea } = Input
import { Button } from '../components'
import { maxWidth } from '../helpers/breakpoint'

const Wrapper = styled('div')`
  width: 100%;
`

const Container = styled('div')`
  width: 40%;
  margin: 0 auto;
  padding-top: 32px;
  padding-bottom: 100px;
  text-align: center;
  ${maxWidth.md`
    width: 60%;
  `}
  ${maxWidth.sm`
    width: 70%;
  `}
  ${maxWidth.xs`
    width: 90%;
  `}
`

const Title = styled('div')`
  font-size: 32px;
  font-family: ${font.bold};
`

const Desc = styled('div')`
  margin-top: 8px;
  font-size: 16px;
`

const FeedbackPage = ({
  master
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
  }, [])

  const handleSubmit = (values) => {
    console.log('values', values)
  }
  return (
    <MainLayout>
      <Wrapper>
        <Container>
          <Title>แจ้งปัญหาการใช้งาน</Title>
          <Desc>แจ้งปัญหาการใช้งานระบบ เพื่อให้ทีมงานประสานกลับไปหาคุณ เพื่อแก้ไขปัญหา</Desc>
          <Card style={{marginTop: '19px', textAlign: 'left'}}>
            <Form
              onFinish={handleSubmit}
              form={form}
            >
              <Form.Item 
                label="บริการที่ต้องการแจ้ง"
                name='note_id'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาเลือกบริการภายในระบบ' }]}
              >
                <Select placeholder='กรุณาเลือกบริการภายในระบบ'>
                  {
                    master.faq_type.map((item, index) => (
                      <Option value={item.id} key={index}>{item.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item 
                label="อธิบายปัญหาการใช้งาน"
                name='note'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาอธิบายปัญหาการใช้งาน' }]}
              >
                <TextArea placeholder='กรุณาอธิบายปัญหาการใช้งาน' />
              </Form.Item>
              <Form.Item 
                label="ชื่อ-สกุล"
                name='name'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
              >
                <Input placeholder='กรุณากรอกชื่อ-สกุล ของคุณ' />
              </Form.Item>
              <Form.Item 
                label="หมายเลขติดต่อกลับ"
                name='phone'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกหมายเลขติดต่อกลับ' }]}
              >
                <Input placeholder='กรุณากรอกหมายเลขติดต่อกลับ' />
              </Form.Item>
              <Form.Item 
                label="ที่อยู่อีเมล"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกที่อยู่อีเมล์' }, { type: 'email' } ]}
              >
                <Input placeholder='กรุณากรอกที่อยู่อีเมล์' />
              </Form.Item>
              <ButtonWrapper>
                <Button
                  htmlType='submit'
                  style={{marginTop: '32px'}} 
                  type='primary'
                  fontSize='14px'
                >ส่งข้อมูลแจ้งปัญหาการใช้งาน</Button>
              </ButtonWrapper>
            </Form>
          </Card>
        </Container>
      </Wrapper>
    </MainLayout>
  )
}

const ButtonWrapper = styled('div')`
  text-align: center;
`

FeedbackPage.getInitialProps = () => {
  return {}
}

export default FeedbackPage
