import MainLayout from '../../layouts/main'
import { Container } from '../../components'
import font from '../../helpers/font'
import styled from 'styled-components'
import { Form, Input, Card } from 'antd'

const PageTitle = styled('div')`
  font-family: ${font.bold};
  font-size: 24px;
  color: #00937B;
  line-height: 1;
`

const Title = styled('div')`
  font-family: ${font.bold};
  font-size: 20px;
  margin-top: 24px;
  line-height: 1;
`

const RegisterStepOnePage = () => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
  }

  return (
    <MainLayout>
      <Container maxWidth='780px' paddingTop='32px' paddingBottom='150px'>
        <PageTitle>สมัครสมาชิก</PageTitle>
        <Title>ข้อมูลการเข้าสู่ระบบ</Title>
        <Form
          onFinish={handleSubmit}
          form={form}
          style={{marginTop: '16px'}}
        >
          <Form.Item 
            label="อีเมล"
            name='email'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณากรอกอีเมล' }, { type: 'email', message: 'อีเมลไม่ถูกต้อง' } ]}
          >
            <Input placeholder='กรุณากรอกอีเมล' />
          </Form.Item>
          <Form.Item 
            label="รหัสผ่าน"
            name='note_id'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <Input placeholder='กรุณากรอกรหัสผ่าน' />
          </Form.Item>
          <Card>
            รหัสผ่านประกอบด้วย <br />
          - มีความยาวอย่างน้อย 8 ตัวอักษร <br />
          - มีทั้งตัวเลขและตัวอักษรภาษาอังกฤษ <br />
          - มีตัวพิมพ์เล็กและตัวพิมพ์ใหญ่อย่างน้อยอย่างละ 1 ตัว
          </Card>
          <Form.Item 
            label="ยืนยันรหัสผ่าน"
            name='note_id'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณายืนยันรหัสผ่าน' }]}
          >
            <Input placeholder='กรุณายืนยันรหัสผ่าน' />
          </Form.Item>
        </Form>
      </Container>
    </MainLayout>
  )
}

export default RegisterStepOnePage
