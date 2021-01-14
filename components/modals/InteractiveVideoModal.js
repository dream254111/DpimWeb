import { Modal, Form, Input, message, Button, Row, Col } from 'antd'
import { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import API from '../../helpers/api'
import { useState } from 'react'
import { connect } from 'react-redux'
import font from '../../helpers/font'

const Card = styled('div')`
  background-color: #F9F9F9;
  padding: 32px 14px;
  margin: 36px 10px 10px 10px;
  text-align: center;
`

const Title = styled('div')`
  font-size: 22px;
  font-family: ${font.bold};
`

const ModalWrap = styled(Modal)`
  .ant-modal-close-x {
    display: none !important;
  }
`

const connector = connect()
const InteractiveVideoModal = ({
  isOpen,
  onClose = () => {},
  onSubmit,
}) => {
  const [form] = Form.useForm()
  
  useEffect(() => {
    form.resetFields()
  }, [])
  
  const closeModal = () => {
    form.resetFields()
    onClose()
  }

  return (
    <ModalWrap
      width={400}
      bodyStyle={{padding: '4px 0 1px 0px'}}
      title={null}
      visible={isOpen}
      onCancel={() => closeModal()}
      footer={null}
    >
      <Card>
        <Title>กรุณาเลือกวีดีโอทางเลือก</Title>
        <Row
          align='middle'
          justify='space-between'
          gutter={[32, 32]}
          style={{marginTop: '12px'}}
        >
          <Col xs={24} lg={12}>
            <Button
              type='primary'
              size='large'
              onClick={() => onSubmit(1)}
            >ทางเลือกที่ 1</Button>
          </Col>
          <Col xs={24} lg={12}>
            <Button
              type='primary'
              size='large'
              onClick={() => onSubmit(2)}
            >ทางเลือกที่ 2</Button>
          </Col>
        </Row>
      </Card>
    </ModalWrap>
  )
}

const VideoWrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`


export default connector(InteractiveVideoModal)
