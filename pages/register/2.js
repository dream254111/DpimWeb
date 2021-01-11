import MainLayout from '../../layouts/main'
import { Container } from '../../components'
import font from '../../helpers/font'
import styled from 'styled-components'
import { Form, Input, Radio, Row, Col, DatePicker, Select, Checkbox } from 'antd'
const { Option } = Select
const CheckboxGroup = Checkbox.Group

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

const RegisterStepTwoPage = ({ master }) => {
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
  }

  return (
    <MainLayout>
      <Container maxWidth='780px' paddingTop='32px' paddingBottom='150px'>
        <PageTitle>สมัครสมาชิก</PageTitle>
        <Title>ข้อมูลส่วนตัว</Title>
        <Form
          onFinish={handleSubmit}
          form={form}
          style={{marginTop: '16px'}}
        >
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item 
                label="ชื่อจริงภาษาไทย"
                name='firstname'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Input placeholder='กรุณากรอกอีเมล' />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="นามสกุลภาษาไทย"
                name='lastname'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Input placeholder='กรุณากรอกอีเมล' />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="ชื่อจริงภาษาอังกฤษ"
                name='firstname_en'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Input placeholder='กรุณากรอกอีเมล' />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="นามสกุลภาษาอังกฤษ"
                name='lastname_en'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Input placeholder='กรุณากรอกอีเมล' />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="เลขบัตรประชาชน"
                name='id_card'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Input placeholder='กรุณากรอกอีเมล' />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Item 
                label="เพศ"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Radio.Group>
                  <Radio value={1}>ชาย</Radio>
                  <Radio value={4}>หญิง</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Item 
                label="วันเกิด"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }, { type: 'email', message: 'อีเมลไม่ถูกต้อง' } ]}
              >
                <DatePicker style={{width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item 
                label="จังหวัด"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาเลือกจังหวัด' } ]}
              >
                <Select placeholder='เลือกจังหวัด'>
                  <Option>กรุงเทพมหานคร</Option>
                  <Option>สมุทรปราการ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="เขต/อำเภอ"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาเลือกเขต/อำเภอ' } ]}
              >
                <Select placeholder='เลือกเขต/อำเภอ'>
                  <Option>กรุงเทพมหานคร</Option>
                  <Option>สมุทรปราการ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="แขวง/ตำบล"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Select placeholder='เลือกแขวง/ตำบล'>
                  <Option>กรุงเทพมหานคร</Option>
                  <Option>สมุทรปราการ</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="รหัสไปรษณีย์"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาเลือกรหัสไปรษรีย์' }]}
              >
                <Input placeholder='เลือกรหัสไปรษรีย์' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item 
            label="รายละเอียดที่อยู่ (ห้องเลขที่, บ้านเลขที่, ตึก, ชื่อถนน)"
            name='email'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณากรอกรายละเอียด' } ]}
          >
            <Input placeholder='กรอกรายละเอียด' />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item 
                label="เบอร์โทรศัพท์"
                name='phone'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' } ]}
              >
                <Input placeholder='กรอกเบอร์โทรศัพท์' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item 
            label="วุฒิการศึกษาสูงสุด"
            name='email'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณาเลือกวุฒิการศึกษาสูงสุด' }, { type: 'email', message: 'อีเมลไม่ถูกต้อง' } ]}
          >
            <Radio.Group>
              <Radio value={1}>ต่ำกว่าปริญญาตรี</Radio>
              <Radio value={4}>ปริญญาตรี</Radio>
              <Radio value={4}>ปริญญาโท</Radio>
              <Radio value={4}>ปริญญาเอก</Radio>
            </Radio.Group>
          </Form.Item>
          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item 
                label="อาชีพ"
                name='job'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาเลือกอาชีพ' } ]}
              >
                <Select placeholder='เลือกอาชีพ'>
                  <Option>d</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item 
                label="ตำแหน่ง"
                name='position'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกตำแหน่ง' }]}
              >
                <Input placeholder='กรอกตำแหน่ง' />
              </Form.Item>
            </Col>
            <Form.Item 
              label="รู้จักเราผ่านทางช่องทางใด"
              name='where'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณาเลือกช่องทางที่รู้จัก' }]}
            >
              <CheckboxGroup options={master.know_channel.map(item => item.name)} />
            </Form.Item>
          </Row>
        </Form>
      </Container>
    </MainLayout>
  )
}


RegisterStepTwoPage.getInitialProps = () => {
  return {}
}

export default RegisterStepTwoPage
