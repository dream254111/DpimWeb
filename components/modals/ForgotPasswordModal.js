import { Modal, Form, Input, message, Select } from 'antd'
import { Button } from '../../components/index'
import { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import API from '../../helpers/api'
import { useState } from 'react'
import { setMemberDetail } from '../../stores/memberReducer'
import { connect } from 'react-redux'
import font from '../../helpers/font'

const Card = styled('div')`
  background-color: #F9F9F9;
  padding: 32px 14px;
  margin: 36px 10px 10px 10px;
`

const Title = styled('div')`
  margin-top: 32px;
  text-align: center;
  font-family: ${font.bold};
`

const Description = styled('div')`
  margin-top: 24px;
  font-size: 14px;
`

const connector = connect()
const ForgotPasswordModal = ({
  isOpen = false,
  onClose = () => {},
  dispatch,
  token
}) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    form.resetFields()
  }, [])

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const response = await axios({
        method: 'POST',
        url: `${API.url}/Student/RequestForgetPassword`,
        data: {
          email: values.email
        }
      })
      const responseWithData = response.data
      if (responseWithData.success === true) {
        closeModal()
      } else {
        throw new Error(responseWithData.error)
      }
    } catch (error) {
      message.error(error.message)
    }
    setIsLoading(false)
  }

  const closeModal = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      width={360}
      bodyStyle={{padding: '4px 0 1px 0px'}}
      title={null}
      visible={isOpen}
      onCancel={() => closeModal()}
      footer={null}
    >
      <Card>
        <Title>ลืมรหัสผ่าน</Title>
        <Description>กรอกอีเมล์ที่ใช้สมัครสมาชิกระบบ เพื่อส่งอีเมล์แจ้งเปลี่ยนรหัสผ่าน</Description>
        <Form
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="อีเมล"
            name='email'
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: 'กรุณากรอกอีเมล' },
              { type: 'email', message: 'อีเมลไม่ถูกต้อง' }
            ]}
            style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '24px'}}
          >
            <Input
              placeholder='กรอกอีเมล'
            />
          </Form.Item>
          <Button
            type='primary'
            fontWeight='normal'
            style={{width: '100%', marginTop: '8px'}}
            htmlType='submit'
            loading={isLoading}
          >ส่งอีเมล</Button>
        </Form>
      </Card>
    </Modal>
  )
}

export default connector(ForgotPasswordModal)
