import { Modal, Form, Input, message } from 'antd'
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
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`

const connector = connect()
const ResetPasswordModal = ({
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
    console.log('handleSubmit', values)
    try {
      const request = {
        method: 'POST',
        url: `${API.url}/Student/ForgetPassword`,
        data: {
          password: values.password,
          token,
        }
      }
      console.log('request', request)
      const response = await axios(request)
      const responseWithData = response.data
      if (responseWithData.success === true) {
        message.success('เปลี่ยนรหัสผ่านสำเร็จ')
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
        <Title>ตั้งรหัสผ่านใหม่</Title>
        <Form
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="รหัสผ่าน"
            name='password'
            labelCol={{ span: 24 }}
            rules={[
              { required: true, message: 'กรุณากรอกรหัสผ่าน' },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: 'รหัสผ่านมีความน่าเชื่อถือไม่เพียงพอ'
              }
            ]}
            style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '24px'}}
          >
            <Input
              placeholder='กรอกรหัสผ่าน'
              type='password'
            />
          </Form.Item>
          <Form.Item 
            label="ยืนยันรหัสผ่าน"
            name='confirm_password'
            labelCol={{ span: 24 }}
            style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}
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
              placeholder='กรอกรหัสผ่าน'
              type='password'
            />
          </Form.Item>
          <Button
            type='primary'
            fontWeight='normal'
            style={{width: '100%', marginTop: '8px'}}
            htmlType='submit'
            loading={isLoading}
          >ตั้งรหัสผ่านใหม่</Button>
        </Form>
      </Card>
    </Modal>
  )
}

export default connector(ResetPasswordModal)
