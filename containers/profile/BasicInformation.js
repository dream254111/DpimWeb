import styled from 'styled-components'
import font from '../../helpers/font'
import { Form, Button, Input, Radio, DatePicker, Select, Checkbox, Avatar, Row, Col, message } from 'antd'
import { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
const CheckboxGroup = Checkbox.Group
const { Option } = Select
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'
import constants from '../../constants'
import moment from 'moment'

const PageTitle = styled('div')`
  color: #00937B;
  font-size: 24px;
  font-family: ${font.bold};
`

const Wrapper = styled('div')`

`

const Title = styled('div')`
  margin-top: 24px;
  font-size: 16px;
  font-family: ${font.bold};
`

const UpdateAvatar = styled('div')`
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const BasicInformation = ({
  memberToken
}) => {
  const [form] = Form.useForm()
  // const [memberState, setMemberState] = useState({})
  const [profileSetting, setProfileSetting] = useState({})

  useEffect(() => {
    form.resetFields()
    fetchData()
  }, [])
  const handleSubmit = (values) => {
    console.log('handleSubmit', values)
  }

  const fetchData = async () => {
    try {
      const response = await axios({
        headers: {
          'Authorization': memberToken
        },
        method: 'GET',
        url: `${API.url}/Student/StudentProfile`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        let { student} = responseWithData.data
        delete student.birthday
        form.setFieldsValue(student)
        setProfileSetting(responseWithData.data.profile_setting)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  return (
    <Wrapper>
      <Form
        onFinish={handleSubmit}
        form={form}
      >
        <PageTitle>โปรไฟล์ของฉัน</PageTitle>
        <Title>ข้อมูลส่วนตัว</Title>
        <UpdateAvatar>
          <Avatar 
            size={72}
            icon={<UserOutlined />}
            src='https://media1.s-nbcnews.com/i/newscms/2019_07/1410593/sam-smith-today-main-190214_ada05dbc548dec5b1b4d566d924e3105.jpg'
            style={{ marginRight: '16px' }}
          />
          <Button tyoe='outline'>เปลี่ยนรูปโปรไฟล์</Button>
        </UpdateAvatar>
        <Row gutter={16} style={{marginTop: '24px'}}>
          <Col lg={12}>
            <Form.Item 
              label="ชื่อจริงภาษาไทย"
              name='firstname'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input placeholder='กรุณากรอกชื่อ-สกุล ของคุณ' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="นามสกุลภาษาอังกฤษ"
              name='lastname_en'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input placeholder='กรุณากรอกชื่อ-สกุล ของคุณ' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="ชื่อจริงภาษาอังกฤษ"
              name='firstname_en'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input placeholder='กรุณากรอกชื่อ-สกุล ของคุณ' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="นามสกุลภาษาไทย"
              name='lastname'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input placeholder='กรุณากรอกชื่อ-สกุล ของคุณ' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="เลขบัตรประชาชน"
              name='id_card'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input placeholder='กรุณากรอกชื่อ-สกุล ของคุณ' />
            </Form.Item>
          </Col>
          <Col lg={12}></Col>
          <Col xs={12}>
            <Form.Item 
              label="เพศ"
              name='gender'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Radio.Group>
                <Radio value={1}>ชาย</Radio>
                <Radio value={2}>หญิง</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12}></Col>
          <Col lg={12}>
            <Form.Item 
              label="วันเกิด"
              name='birthday'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <DatePicker style={{width: '100%'}} format={'YYYY-MM-DD'} />
            </Form.Item>
          </Col>
          <Col lg={12} />
          <Col lg={12}>
            <Form.Item 
              label="จังหวัด"
              name='province_id'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Select>
                <Option>dfd</Option>
                <Option>xxx</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="เขต"
              name='district_id'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Select>
                <Option>dfd</Option>
                <Option>xxx</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="แขวง"
              name='sub_district_id'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Select>
                <Option>dfd</Option>
                <Option>xxx</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="รหัสไปรษณีย์"
              name='zipcode'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item 
              label="รายละเอียดที่อยู่ (ห้องเลขที่, บ้านเลขที่, ตึก, ชื่อถนน)"
              name='address'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="อีเมล์"
              name='email'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} />
          <Col lg={12}>
            <Form.Item 
              label="เบอร์โทรศัพท์"
              name='phone'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} />
          <Col lg={24}>
            <Form.Item 
              label="วุฒิการศึกษาสูงสุด"
              name='educational_id'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Radio.Group>
                <Radio value={1}>ต่ำกว่าปริญญาตรี</Radio>
                <Radio value={2}>ปริญญาตรี</Radio>
                <Radio value={3}>ปริญญาโท</Radio>
                <Radio value={4}>ปริญญาเอก</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item 
              label="อาชีพ"
              name='career_id'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Select>
                <Option>dfd</Option>
                <Option>xxx</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item 
              label="ตำแหน่ง"
              name='career_name'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Select>
                <Option>dfd</Option>
                <Option>xxx</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item 
              label="รู้จักเราผ่านช่องทางใด"
              name='know_channel'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <CheckboxGroup options={['สื่อออนไลน์', 'เพื่อนแนะนำ', 'หนังสือพิมพ์', 'สื่อโทรทัศน์', 'อื่น ๆ']} />
            </Form.Item>
          </Col>
        </Row>
        <Title style={{marginTop: '54px'}}>ข้อมูลสถานประกอบการ</Title>
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item 
              label="ชื่อสถานประกอบการ"
              name='business_name'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="สถานที่ประกอบการ"
              name='business_province_id'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Select>
                <Option>dfd</Option>
                <Option>xxx</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="วันที่จดทะเบียน"
              name='business_register'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <DatePicker style={{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="เลขที่จดทะเบียน"
              name='business_no'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <UpdateDocument>

        </UpdateDocument>
        <SaveButtonWrapper>
          <Button>บันทึกข้อมูล</Button>
        </SaveButtonWrapper>
      </Form>
    </Wrapper>
  )
}

const UpdateDocument = styled('div')`
  border-radius: 4px;
  border: 1px dashed #BDBDBD;
  background: #FFFFFF;
  margin-top: 32px;
  width: 100%;
  padding: 24px 24px 52px 24px;
`

const SaveButtonWrapper = styled('div')`
  width: 100%;
  text-align: right;
`

export default connector(BasicInformation)
