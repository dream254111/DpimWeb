import { Modal, Form, Input, message, Select } from 'antd'
import { Button } from '../../components/index'
import { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import API from '../../helpers/api'
import { useState } from 'react'
import { setMemberDetail, fetchProfileMinimal } from '../../stores/memberReducer'
import { connect } from 'react-redux'
import ForgodPasswordModal from './ForgotPasswordModal'
import Router from 'next/router'

const Card = styled('div')`
  background-color: #F9F9F9;
  padding: 32px 14px;
  margin: 36px 10px 10px 10px;
`

const ForgotPasswordText = styled('div')`
  margin-top: 22px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`

const connector = connect()
const LoginModal = ({
  isOpen = false,
  onClose = () => {},
  dispatch
}) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)
  useEffect(() => {
    form.resetFields()
  }, [])

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const response = await axios({
        method: 'POST',
        url: `${API.url}/Student/Login`,
        data: values
      })
      const responseWithData = response.data
      if (responseWithData.success === true) {
        await Promise.all([
          dispatch(setMemberDetail({
            ...responseWithData.auth,
            token: responseWithData.token
          })),
          dispatch(fetchProfileMinimal())
        ])
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
      <ForgodPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />
      <Card>
        <Title>เข้าสู่ระบบ DPIM</Title>
        <Form
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="อีเมล"
            name='username'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณากรอกอีเมล์' }, { type: 'email', message: 'อีเมลไม่ถูกต้อง' } ]}
            style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '24px'}}
            >
            <Input
              placeholder='กรอกอีเมล์'
            />
          </Form.Item>
          <Form.Item 
            label="รหัสผ่าน"
            name='password'
            labelCol={{ span: 24 }}
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
            style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}
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
          >เข้าสู่ระบบ</Button>
          <ForgotPasswordText
            onClick={() => {
              setIsForgotPasswordModalOpen(true)
              // closeModal()
            }}
          >ลืมรหัสผ่าน?</ForgotPasswordText>
          <RegisterFree>ยังไม่มีบัญชี?&nbsp;&nbsp;
          <RegisterHere
            onClick={() => Router.push('/register')}
          >สมัครสมาชิกฟรี</RegisterHere></RegisterFree>
        </Form>
      </Card>
    </Modal>
  )
}

const Title = styled('div')`
  margin-top: 32px;
  text-align: center;
`

const RegisterFree = styled('div')`
  margin-top: 19px;
  font-size: 14px;
  text-align: center;
`

const RegisterHere = styled('span')`
  color: blue;
  cursor: pointer;
`

export default connector(LoginModal)
