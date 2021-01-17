import styled from 'styled-components'
import font from '../../helpers/font'
import { Form, Input, Radio, DatePicker, Select, Checkbox, Avatar, Row, Col, message, Upload } from 'antd'
import { Button } from '../../components/index'
import { useEffect, useState } from 'react'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
const CheckboxGroup = Checkbox.Group
const { Option } = Select
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'
import constants from '../../constants'
import moment from 'moment'
import { UploadDocumentModal } from '../../components/modals/index'
import provinces from '../../api/json/province.json'
import districts from '../../api/json/districts.json'
import subDistricts from '../../api/json/sub-districts.json'
import { fetchProfileMinimal } from '../../stores/memberReducer'
import _ from 'lodash'
import { updateMemberDetail } from '../../stores/memberReducer'

const PageTitle = styled('div')`
  color: #00937B;
  font-size: 24px;
  font-family: ${font.bold};
`

const Wrapper = styled('div')`

`

const Title = styled('div')`
  margin-top: 24px;
  font-size: 18px;
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
  memberToken,
  master,
  dispatch,
  memberDetail
}) => {
  const [form] = Form.useForm()
  // const [memberState, setMemberState] = useState({})
  const [profileSetting, setProfileSetting] = useState({})
  const [avatar, setAvatar] = useState(null)
  const [frontIdCard, setFrontIdCard] = useState(null)
  const [backIdCard, setBackIdCard] = useState(null)
  const [businessAttachment, setBusinessAttachment] = useState(null)
  const [straightFaceImage, setStraightFaceImage] = useState(null)
  const [modalSelected, setModalSelected] = useState(null)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [provinceId, setProvinceId] = useState(null)
  const [districtId, setDistrictId] = useState(null)
  const [subDistrictId, setSubDistrictId] = useState(null)
  const [knowChannels, setKnowChannels] = useState([])
  const [isForgetPasswordLoading, setIsForgetPasswordLoading] = useState(false)
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    form.resetFields()
    fetchData()
  }, [])
  const handleSubmit = (values) => {
    updateProfile(values)
  }

  const fetchData = async () => {
    try {
      const response = await axios({
        headers: {
          Authorization: memberToken
        },
        method: 'GET',
        url: `${API.url}/Student/StudentProfile`
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        const { student } = responseWithData.data
        if (student.know_channel) {
          const knowChannelKey = _.groupBy(master.know_channel, 'id')
          const knowChannelNames = student.know_channel.map(item => knowChannelKey[item][0].name)
          student.know_channel = knowChannelNames
        }
        student.birthday = student.birthday ? moment(student.birthday, 'YYYY-MM-DD') : null
        student.business_province_id = +student.business_province_id === 0 ? null : student.business_province_id
        setProvinceId(student.province_id)
        setDistrictId(student.district_id)
        setSubDistrictId(student.sub_district_id)
        setAvatar(student.profile_image)
        setFrontIdCard(student.front_id_card)
        setBackIdCard(student.back_id_card)
        setBusinessAttachment(student.business_attachment)
        setStraightFaceImage(student.straight_face_image)
        delete student.profile_image
        delete student.front_id_card
        delete student.back_id_card
        delete student.straight_face_image
        delete student.business_attachment
        form.setFieldsValue(student)
        setProfileSetting(responseWithData.data.profile_setting)
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const uploadFile = async (file, callback) => {
    try {
      const bodyFormData = new FormData()
      bodyFormData.append('', file)
      const response = await axios({
        headers: {
          Authorization: memberToken
        },
        method: 'POST',
        url: `${API.url}/FileUpload/FileUpload`,
        data : bodyFormData
      })
      if (response.status === 200) {
        const imageUrl = response.data[0].path
        callback(imageUrl)
      } else {
        throw new Error('something went wrong')
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  const forgetPassword = async () => {
    try {
      setIsForgetPasswordLoading(true)
      const response = await axios({
        headers: {
          Authorization: memberToken
        },
        method: 'GET',
        url: `${API.url}/Authentication/ForgetPassword?email=${memberDetail.email}`,
      })
      if (response.status === 200) {
        message.success('ระบบได้ส่งไปยังอีเมลเรียบร้อยแล้ว')
      }
    } catch (error) {
      message.error(error.message)
    }
    setIsForgetPasswordLoading(false)
  }

  const updateProfile = async (values) => {
    try {
      setIsSubmitLoading(true)
      const student = Object.fromEntries(Object.entries({
        ...values,
        profile_image: avatar,
        front_id_card: frontIdCard,
        back_id_card: backIdCard,
        straight_face_image: straightFaceImage,
        business_attachment: businessAttachment
      }).filter(([_, v]) => v != null && v !== ''))

      const knowChannelKey = _.groupBy(master.know_channel, 'name')
      const knowChannelIds = values.know_channel.map(item => knowChannelKey[item][0].id)

      const response = await axios({
        headers: {
          Authorization: memberToken
        },
        method: 'POST',
        url: `${API.url}/Student/ProfileUpdate`,
        data: {
          student: {
            ...student,
            know_channel: knowChannelIds,
            know_channel_name: knowChannels.find(item => item === 'อื่นๆ') ? values.know_channel_name : undefined
          }
        }
      })
      const responseWithData = response.data
      if (responseWithData.success) {
        const data = responseWithData.data
        fetchData()
        fetchProfileMinimal()
        message.success('บันทึกสำเร็จ')
        dispatch(updateMemberDetail({
          profile_path: data.profile_image,
          profile_image: data.profile_image
        }))
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
    setIsSubmitLoading(false)
  }

  const [isUploadDocumentModalOpen, setIsUploadDocumentModalOpen] = useState(false)
  const [isTitleChange, setIsTitleChange] = useState('')
  const handleClickUpload = (title, modalType) => {
    setModalSelected(modalType)
    setIsTitleChange(title)
    setIsUploadDocumentModalOpen(true)
  }
  const onProvinceChange = (value) => {
    setDistrictId(null)
    setSubDistrictId(null)
    form.setFieldsValue({
      district_id: null,
      sub_district_id: null
    })
    setProvinceId(value)
  }

  const onDistrictChange = (value) => {
    setSubDistrictId(null)
    form.setFieldsValue({
      sub_district_id: null
    })
    setDistrictId(value)
  }
  return (
    <Wrapper>
      <UploadDocumentModal
        isOpen={isUploadDocumentModalOpen}
        onClose={() => setIsUploadDocumentModalOpen(false)}
        onTitleChange={isTitleChange}
        onSubmit={(file) => {
          switch (modalSelected) {
            case 'front_id_card':
              uploadFile(file, (imageUrl) => setFrontIdCard(imageUrl))
              break
            case 'back_id_card':
              uploadFile(file, (imageUrl) => setBackIdCard(imageUrl))
              break
            case 'straight_face_image':
              uploadFile(file, (imageUrl) => setStraightFaceImage(imageUrl))
              break
            case 'business_attachment':
              uploadFile(file, (imageUrl) => setBusinessAttachment(imageUrl))
              break
            default: null
          }
        }}
      />
      <Form
        onFinish={handleSubmit}
        form={form}
      >
        <PageTitle>โปรไฟล์ของฉัน</PageTitle>
        <Title>ข้อมูลส่วนตัว</Title>
        <UpdateAvatar>
          {
            avatar &&
              <Avatar 
                size={72}
                icon={<UserOutlined />}
                src={avatar}
                style={{ marginRight: '16px' }}
              />

          }
          <Upload name='file' multiple={false} showUploadList={false} onChange={(info) => uploadFile(info.file.originFileObj, (imageUrl) => setAvatar(imageUrl))}>
            <Button>เปลี่ยนรูปโปรไฟล์</Button>
          </Upload>
          <Button
            style={{ marginLeft: '16px' }}
            type='primary'
            onClick={() => forgetPassword()}
            loading={isForgetPasswordLoading}
          >เปลี่ยนรหัสผ่าน
          </Button>
        </UpdateAvatar>
        <Row gutter={16} style={{marginTop: '24px'}}>
          <Col lg={12}>
            <Form.Item
              label="ชื่อจริงภาษาไทย"
              name='firstname'
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: 'กรุณากรอกชื่อ-สกุล ของคุณ' }]}
            >
              <Input
                placeholder='กรุณากรอกชื่อ-สกุล ของคุณ'
                disabled={!profileSetting.is_edit_personal_info}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="นามสกุลภาษาอังกฤษ"
              name='lastname_en'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกนามสกุลภาษาอังกฤษ'
                disabled={!profileSetting.is_edit_personal_info}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="ชื่อจริงภาษาอังกฤษ"
              name='firstname_en'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกชื่อจริงภาษาอังกฤษ'
                disabled={!profileSetting.is_edit_personal_info}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="นามสกุลภาษาไทย"
              name='lastname'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกนามสกุลภาษาไทย'
                disabled={!profileSetting.is_edit_personal_info}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="เลขบัตรประชาชน"
              name='id_card'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกเลขบัตรประชาชน'
                disabled={!profileSetting.is_edit_personal_info}
              />
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
              <Radio.Group
                disabled={!profileSetting.is_edit_personal_info}
              >
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
            >
              <DatePicker
                style={{ width: '100%' }}
                format={dateFormat}
                disabled={!profileSetting.is_edit_personal_info}
              />
            </Form.Item>
          </Col>
          <Col lg={12} />
          <Col lg={12}>
            <Form.Item 
              label="จังหวัด"
              name='province_id'
              labelCol={{ span: 24 }}
            >
              <Select
                placeholder='เลือกจังหวัด'
                onChange={(value) => onProvinceChange(value)}
                disabled={!profileSetting.is_edit_address}

              >
                {
                  provinces.map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                    >{item.province_name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="เขต"
              name='district_id'
              labelCol={{ span: 24 }}
            >
              <Select
                placeholder='เลือกเขต/อำเภอ'
                onChange={(value) => onDistrictChange(value)}
                disabled={!profileSetting.is_edit_address}
              >
                {
                  districts.filter(item => item.province_id === provinceId).map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                    >{item.districts_name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="แขวง"
              name='sub_district_id'
              labelCol={{ span: 24 }}
            >
              <Select
                placeholder='เลือกแขวง/ตำบล'
                disabled={!profileSetting.is_edit_address}
              >
                {
                  subDistricts.filter(item => item.districts_id === districtId).map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                    >{item.sub_districts_name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="รหัสไปรษณีย์"
              name='zipcode'
              labelCol={{ span: 24 }}
            >
              <Input
                disabled={!profileSetting.is_edit_address}
                placeholder='กรอกรหัสไปรษณีย์'
              />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item 
              label="รายละเอียดที่อยู่ (ห้องเลขที่, บ้านเลขที่, ตึก, ชื่อถนน)"
              name='address'
              labelCol={{ span: 24 }}
            >
              <Input
                disabled={!profileSetting.is_edit_address}
                placeholder='กรอกรายละเอียดที่อยู่'
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="อีเมล์"
              name='email'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกอีเมล'
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col lg={12} />
          <Col lg={12}>
            <Form.Item 
              label="เบอร์โทรศัพท์"
              name='phone'
              labelCol={{ span: 24 }}
            >
              <Input
                disabled={!profileSetting.is_edit_phone}
              />
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
              <Radio.Group
                disabled={!profileSetting.is_edit_educational}
              >
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
            >
              <Select>
                {
                  master.career.map((item, index) => (
                    <Option key={index} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item 
              label="ตำแหน่ง"
              name='career_name'
              labelCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Col>
          </Row>
          <Row align='bottom' gutter={2}>
            <Col lg={19}>
              <Form.Item 
                label="รู้จักเราผ่านช่องทางใด"
                name='know_channel'
                labelCol={{ span: 24 }}
              >
                <CheckboxGroup
                  options={master.know_channel.map(item => item.name)}
                  disabled={!profileSetting.is_edit_know_channel}
                  onChange={(value) => setKnowChannels(value)}
                />
              </Form.Item>
            </Col>
            <Col xs={5}>
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
        <Title style={{marginTop: '54px'}}>ข้อมูลสถานประกอบการ</Title>
        <Row gutter={16}>
          <Col lg={12}>
            <Form.Item 
              label="ชื่อสถานประกอบการ"
              name='business_name'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกชื่อสถานที่ประกอบการ'
                disabled={!profileSetting.is_edit_business}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="สถานที่ประกอบการ"
              name='business_province_id'
              labelCol={{ span: 24 }}
            >
              <Select
                placeholder='เลือกสถานที่ประกอบการ'
                disabled={!profileSetting.is_edit_business}
              >
                {
                  provinces.map((item, index) => (
                    <Option
                      key={index}
                      value={item.id}
                    >{item.province_name}
                    </Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="วันที่จดทะเบียน"
              name='business_register'
              labelCol={{ span: 24 }}
            >
              <DatePicker
                style={{width: '100%'}}
                placeholder='เลือกวันที่จดทะเบียน'
                disabled={!profileSetting.is_edit_business}
              />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item 
              label="เลขที่จดทะเบียน"
              name='business_no'
              labelCol={{ span: 24 }}
            >
              <Input
                placeholder='กรอกเลขที่จดทะเบียน'
                disabled={!profileSetting.is_edit_business}
              />
            </Form.Item>
          </Col>
        </Row>
        <UpdateDocument>
          <Title style={{marginTop: '0'}}>อัพโหลดเอกสาร ยืนยันตัวตน</Title>
          <p>เพื่อตรวจสอบตัวตน กรุณาอัพโหลดเอกสารที่ต้องการให้ครบ</p>
          <Row gutter={16}>
            <Col lg={24}>
              <Form.Item
                label="1.ภาพถ่ายบัตรประชาชนด้านหน้า และหลัง"
                labelCol={{ span: 24 }}
              >
                <Row gutter={[16, 16]}>
                  <Col lg={11}>
                    <Button
                      disabled={frontIdCard}
                      onClick={() => handleClickUpload('อัพโหลดบัตรประชาชนด้านหน้า', 'front_id_card')}
                    >อัพโหลดบัตรประชาชนด้านหน้า</Button>
                  </Col>
                  <Col lg={13}>
                    <Button
                      disabled={backIdCard}
                      onClick={() => handleClickUpload('อัพโหลดบัตรประชาชนด้านหลัง', 'back_id_card')}
                    >อัพโหลดบัตรประชาชนด้านหลัง</Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Form.Item
                label="2.ภาพถ่ายหน้าตรง"
                labelCol={{ span: 24 }}
              >
                 <Row gutter={[16, 16]}>
                   <Col lg={24}>
                    <Button
                      disabled={straightFaceImage}
                      onClick={() => handleClickUpload('อัพโหลดภาพถ่ายหน้าตรง', 'straight_face_image')}
                    >อัพโหลดภาพถ่ายหน้าตรง</Button>
                   </Col>
                 </Row>
              </Form.Item>
            </Col>
            <Col lg={24}>
              <Form.Item
                label="3.เอกสารประกอบกิจการ"
                labelCol={{ span: 24 }}
              >
                 <Row gutter={[16, 16]}>
                   <Col lg={24}>
                      <Button
                        disabled={businessAttachment}
                        onClick={() => handleClickUpload('อัพโหลดเอกสารประกอบกิจการ', 'business_attachment')}
                      >อัพโหลดเอกสารประกอบกิจการ</Button>
                   </Col>
                 </Row>
              </Form.Item>
            </Col>
          </Row>
        </UpdateDocument>
        <SaveButtonWrapper>
          <Button 
            type='primary'
            htmlType='submit'
            loading={isSubmitLoading}
          >บันทึกข้อมูล</Button>
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
  margin-top: 40px;
`

export default connector(BasicInformation)
