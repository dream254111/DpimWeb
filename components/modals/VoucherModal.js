import { Modal, Form, Input, Button } from 'antd'
import styled from 'styled-components'
import axios from 'axios'
import API from '../../helpers/api'
import { useEffect, useState } from 'react'
import bankImage from '../../api/json/bank.json'
import { maxWidth } from '../../helpers/breakpoint'

const Title = styled('div')`
  font-size: 18px;
`

const Wrapper = styled('div')`
  text-align: center;
  padding: 16px;
`

const VoucherModal = ({
  isOpen = false,
  onClose = () => { },
  onSubmit
}) => {
  const [form] = Form.useForm()

  const closeModal = () => {
    form.resetFields()
    onClose()
  }

  const handleSubmit = (values) => {
    onSubmit(values.code)
    closeModal()
  }
  return (
    <Modal
      width={725}
      title={null}
      visible={isOpen}
      bodyStyle={{ padding: '0px 24px 24px 24px' }}
      style={{ top: 50 }}
      footer={null}
      onCancel={() => closeModal()}
    >
      <Wrapper>
        <Title>กรอกรหัส Voucher</Title>
        <Form
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            name='code'
            rules={[
              { required: true, message: 'กรุณากรอกรหัส voucher' }
            ]}
          >
            <Input
              placeholder='กรอกรหัส voucher'
              style={{ marginTop: '16px' }}
            />
          </Form.Item>
          <Button
            type='primary'
            style={{ marginTop: '16px' }}
            htmlType='submit'
          >ยืนยัน
          </Button>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export default VoucherModal
