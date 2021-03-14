import MainLayout from '../layouts/main'
import { Container, Button } from '../components'
import font from '../helpers/font'
import styled from 'styled-components'
import { useState } from 'react'
import { Form, Input, Card, Radio, Row, Col, DatePicker, Select, Checkbox, message } from 'antd'
const { Option } = Select
const CheckboxGroup = Checkbox.Group
import provinces from '../api/json/province.json'
import districts from '../api/json/districts.json'
import subDistricts from '../api/json/sub-districts.json'
import API from '../helpers/api'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import Router from 'next/router'
import TermAndConditionModal from '../components/modals/TermAndConditionModal'

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

const RegisterPage = ({ master }) => {
  const [formStep1] = Form.useForm()
  const [formStep2] = Form.useForm()
  const [registerStep, setRegisterStep] = useState(1)
  const [provinceId, setProvinceId] = useState(null)
  const [districtId, setDistrictId] = useState(null)
  const [subDistrictId, setSubDistrictId] = useState(null)
  const [step1Details, setStep1Details] = useState({})
  const [knowChannels, setKnowChannels] = useState([])
  const [isTermAndConditionModal, setTermAndConditionModalModal] = useState(false)
  const [formValues, setFormValues] = useState({})
  const [isAcceptTermAndCondition, setIsAcceptTermAndCondition] = useState(false)

  const handleSubmitFormStep1 = () => {
    const _formValues = JSON.parse(JSON.stringify(formValues))
    delete _formValues.confirm_password
    setStep1Details(_formValues)
    setRegisterStep(2)
    setTermAndConditionModalModal(false)
  }

  const checkDuplicateEmail = async () => {
    try {
      const email = formStep1.getFieldValue('email')
      if (!email) throw new Error('กรุณากรอกอีเมล')
      const response = await axios({
        method: 'POST',
        url: `${API.url}/Student/check_email`,
        data: {
          email: email
        }
      })
      const responseWithData = response.data
      console.log('responseWithData', responseWithData)
      if (responseWithData.data === false) {
        message.error('อีเมลซ้ำกันในะระบบ')
      } else {
        formStep1.submit()
      }
    } catch (error) {
      message.error(error)
    }
  }

  const handleSubmitFormStep2 = async (values) => {
    const knowChannelKey = _.groupBy(master.know_channel, 'name')
    const knowChannelIds = values.know_channel.map(item => knowChannelKey[item][0].id)
    const data = {
      ...step1Details,
      ...values,
      birthday: moment(values.birthday).format('YYYY-MM-DD'),
      know_channel: knowChannelIds,
      know_channel_name: knowChannels.find(item => item === 'อื่นๆ') ? values.know_channel_name : undefined,
      pdpa_accept: isAcceptTermAndCondition
    }
    try {
      const response = await axios({
        method: 'POST',
        url: `${API.url}/Student/RegisterStudent`,
        data: {
          student: JSON.parse(JSON.stringify(data))
        }
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        if (responseWithData.data.status_email === false) throw new Error('อีเมลซ้ำ')
        if (responseWithData.data.status_id_card === false) throw new Error('บัตรประชาชนซ้ำ')
        if (responseWithData.data.status_register === true) {
          message.success(<span style={{ padding: '20px', fontSize: '20px' }}>ลงทะเบียนสำเร็จ</span>)
          Router.push('/')
        }
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const onProvinceChange = (value) => {
    setDistrictId(null)
    setSubDistrictId(null)
    formStep2.setFieldsValue({
      district_id: null,
      sub_district_id: null
    })
    setProvinceId(value)
  }

  const onDistrictChange = (value) => {
    setSubDistrictId(null)
    formStep2.setFieldsValue({
      sub_district_id: null
    })
    setDistrictId(value)
  }
  return (
    <MainLayout>
      <TermAndConditionModal
        isOpen={isTermAndConditionModal}
        onClose={() => {
          setTermAndConditionModalModal(false)
          setIsAcceptTermAndCondition(false)
        }}
        onSubmit={() => {
          handleSubmitFormStep1()
          setIsAcceptTermAndCondition(true)
        }}
      />
      <Container maxWidth='780px' paddingTop='96px' paddingBottom='150px'>
        <PageTitle>สมัครสมาชิก</PageTitle>
        {
          registerStep === 1 &&
          <>
            <Title>ข้อมูลการเข้าสู่ระบบ</Title>
            <Form
              onFinish={(values) => {
                setFormValues(values)
                setTermAndConditionModalModal(true)
              }}
              form={formStep1}
              style={{marginTop: '16px'}}
            >
              <Form.Item 
                label="อีเมล"
                name='email'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }, { type: 'email', message: 'อีเมล์ไม่ถูกต้อง' } ]}
              >
                <Input placeholder='กรุณากรอกอีเมล' />
              </Form.Item>
              <Form.Item 
                label="รหัสผ่าน"
                name='password'
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณากรอกรหัสผ่าน'
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message: 'รหัสผ่านมีความน่าเชื่อถือไม่เพียงพอ'
                  }
                ]}
              >
                <Input
                  placeholder='กรุณากรอกรหัสผ่าน'
                  type='password'
                />
              </Form.Item>
              <Card>
                รหัสผ่านประกอบด้วย <br />
              - มีความยาวอย่างน้อย 8 ตัวอักษร <br />
              - มีทั้งตัวเลขและตัวอักษรภาษาอังกฤษ <br />
              - มีตัวพิมพ์เล็กและตัวพิมพ์ใหญ่อย่างน้อยอย่างละ 1 ตัว
              </Card>
              <Form.Item 
                label="ยืนยันรหัสผ่าน"
                name='confirm_password'
                labelCol={{ span: 24 }}
                style={{ marginTop: '16px' }}
                rules={[
                  {
                    required: true,
                    message: 'กรุณายืนยันรหัสผ่าน',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject('รหัสผ่านไม่ตรงกัน')
                    },
                  }),
                ]}
                >
                <Input
                  placeholder='กรุณายืนยันรหัสผ่าน'
                  type='password'
                />
              </Form.Item>
              <Button
                style={{ float: 'right' }}
                type='primary'
                onClick={() => checkDuplicateEmail()}
              >ขั้นตอนถัดไป
              </Button>
            </Form>
          </>
        }
        {
          registerStep === 2 &&
          <>
            <Title>ข้อมูลส่วนตัว</Title>
            <Form
              onFinish={handleSubmitFormStep2}
              form={formStep2}
              style={{marginTop: '16px'}}
            >
              <Row gutter={16}>
                <Col xs={12}>
                  <Form.Item 
                    label="ชื่อจริงภาษาไทย"
                    name='firstname'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรอกชื่อจริงภาษาไทย' }]}
                  >
                    <Input placeholder='กรอกชื่อจริงภาษาไทย' />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="นามสกุลภาษาไทย"
                    name='lastname'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกนามสกุลภาษาไทย' }]}
                  >
                    <Input placeholder='กรอกนามสกุลภาษาไทย' />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="ชื่อจริงภาษาอังกฤษ"
                    name='firstname_en'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกชื่อจริงภาษาอังกฤษ' }]}
                  >
                    <Input placeholder='กรอกชื่อจริงภาษาอังกฤษ' />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="นามสกุลภาษาอังกฤษ"
                    name='lastname_en'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกนามสกุลภาษาอังกฤษ' }]}
                  >
                    <Input placeholder='กรอกนามสกุลภาษาอังกฤษ' />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="เลขบัตรประชาชน"
                    name='id_card'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกเลขบัตรประชาชน' }]}
                  >
                    <Input placeholder='กรอกเลขบัตรประชาชน' />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Form.Item 
                    label="เพศ"
                    name='gender'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกเพศ' }]}
                  >
                    <Radio.Group placeholder='กรอกเพศ'>
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
                    name='birthday'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกวันเกิด' }]}
                  >
                    <DatePicker style={{width: '100%' }} placeholder='กรอกวันเกิด' />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={12}>
                  <Form.Item 
                    label="จังหวัด"
                    name='province_id'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณาเลือกจังหวัด' } ]}
                  >
                    <Select placeholder='เลือกจังหวัด' onChange={(value) => onProvinceChange(value)}>
                      {
                        provinces.map((item, index) => (
                          <Option
                            key={index}
                            value={item.id}
                          >{item.province_name}</Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="เขต/อำเภอ"
                    name='district_id'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณาเลือกเขต/อำเภอ' } ]}
                  >
                    <Select placeholder='เลือกเขต/อำเภอ' onChange={(value) => onDistrictChange(value)}>
                      {
                        districts.filter(item => item.province_id === provinceId).map((item, index) => (
                          <Option
                            key={index}
                            value={item.id}
                          >{item.districts_name}</Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="แขวง/ตำบล"
                    name='sub_district_id'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกแขวง/ตำบล' }]}
                  >
                    <Select placeholder='เลือกแขวง/ตำบล'>
                      {
                        subDistricts.filter(item => item.districts_id === districtId).map((item, index) => (
                          <Option
                            key={index}
                            value={item.id}
                          >{item.sub_districts_name}</Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="รหัสไปรษณีย์"
                    name='zipcode'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกรหัสไปรษรีย์' }]}
                  >
                    <Input placeholder='กรอกรหัสไปรษรีย์' />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item 
                label="รายละเอียดที่อยู่ (ห้องเลขที่, บ้านเลขที่, ตึก, ชื่อถนน)"
                name='address'
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
                name='educational_id'
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: 'กรุณาเลือกวุฒิการศึกษาสูงสุด' }]}
              >
                <Radio.Group>
                  {
                    master.educational.map((item, index) => (
                      <Radio value={item.id} key={index}>{item.name}</Radio>
                    ))
                  }
                </Radio.Group>
              </Form.Item>
              <Row gutter={16}>
                <Col xs={12}>
                  <Form.Item 
                    label="อาชีพ"
                    name='career_id'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณาเลือกอาชีพ' } ]}
                  >
                    <Select placeholder='เลือกอาชีพ'>
                      {
                        master.career.map((item, index) => (
                          <Option
                            key={index}
                            value={item.id}
                          >
                            {item.name}
                          </Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item 
                    label="ตำแหน่ง"
                    name='career_name'
                    labelCol={{ span: 24 }}
                    rules={[{ required: true, message: 'กรุณากรอกตำแหน่ง' } ]}
                  >
                    <Input placeholder='กรอกตำแหน่ง' />
                  </Form.Item>
                </Col>
                <Row align='bottom' gutter={2}>
                  <Col xs={18}>
                    <Form.Item 
                      label='รู้จักเราผ่านทางช่องทางใด'
                      name='know_channel'
                      labelCol={{ span: 24 }}
                      rules={[{ required: true, message: 'กรุณาเลือกช่องทางที่รู้จัก' } ]}
                    >
                      <CheckboxGroup options={master.know_channel.map(item => item.name)} onChange={(value) => setKnowChannels(value)} />
                    </Form.Item>
                  </Col>
                  <Col xs={6}>
                    <Form.Item
                      name='know_channel_name'
                      labelCol={{ span: 24 }}
                    >
                      <Input
                        placeholder='โปรดระบุ'
                        disabled={!knowChannels.find(item => item === 'อื่นๆ')}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
              <Button
                style={{ float: 'right' }}
                type='primary'
                htmlType='submit'
              >สมัครสมาชิก</Button>
            </Form>
          </>
        }
      </Container>
    </MainLayout>
  )
}

RegisterPage.getInitialProps = () => {
  return {}
}

export default RegisterPage
