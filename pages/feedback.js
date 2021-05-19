import MainLayout from '../layouts/main'
import styled from 'styled-components'
import font from '../helpers/font'
import { Card, Form, Input, Select, message } from 'antd'
import { useEffect } from 'react'
const { Option } = Select
const { TextArea } = Input
import { Button } from '../components'
import { maxWidth } from '../helpers/breakpoint'
import axios from 'axios'
import API from '../helpers/api'
import { useRouter } from 'next/router'

const Wrapper = styled('div')`
  width: 100%;
  padding: 64px 0 0 0;
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
  font-size: 18px;
`

const FeedbackPage = ({
  master
}) => {
  const { push } = useRouter()
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
    window.scrollTo(0, 0);
  }, [])

  const handleSubmit = async (values) => {
    try {
      await axios({
        method: 'POST',
        url: `${API.url}/Student/AddReportProblem`,
        data : {
            problem_of_use_id: values.note_id,
            firstname: values.firstname,
            lastname: values.lastname,
            description: values.note,
            phone: values.phone,
            email: values.email,
        }
      })
      message.success('ทำรายการสำเร็จ')
      push('/')
    } catch (e) {
      message.error('ทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    }
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
                    master.problem_of_use.map((item, index) => (
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
                label="ชื่อจริง"
                name='firstname'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกชื่อจริงของคุณ' }]}
              >
                <Input placeholder='กรุณากรอกชื่อจริงของคุณ' />
              </Form.Item>
              <Form.Item 
                label="นามสกุล"
                name='lastname'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกนามสกุลของคุณ' }]}
              >
                <Input placeholder='กรุณากรอกนามสกุลของคุณ' />
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
                rules={[{ required: true, message: 'กรุณากรอกที่อยู่อีเมล' }, { type: 'email', message: 'อีเมลไม่ถูกต้อง' } ]}
              >
                <Input placeholder='กรุณากรอกที่อยู่อีเมล' />
              </Form.Item>
              <ButtonWrapper>
                <Button
                  htmlType='submit'
                  style={{marginTop: '32px'}} 
                  type='primary'
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
