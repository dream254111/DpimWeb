import { Form, Modal, Row, Col, Upload, message } from 'antd'
import styled from 'styled-components'
import { Button } from '../../components/index'
import { useState, useEffect } from 'react'

const Title = styled('div')`
  margin-top: 32px;
  text-align: center;
`

const Description = styled('div')`
  font-size: 14px;
  color: #828282;
  margin-bottom: 8px;
`

const UploadContainer = styled('div')`
  padding: 100px;
  text-align: center;
`

const ButtonContanier = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px
`

const UploadDocumentModal = ({
  isOpen = false,
  onClose = () => {},
  onTitleChange = ''
}) => {
  const [form] = Form.useForm()
  const closeModal = () => {
    form.resetFields()
    onClose()
  }
  const [fileList, updateFileList] = useState()
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (isJpgOrPng === false) {
      message.error('ท่านสามารถอัพโหลดนามสกุลไฟล์ได้แค่ PNG/JPG เท่านั้น')
    }
    setIsUpload(true)
    updateFileList(file.name)
  }

  const [isUpload, setIsUpload] = useState(false)
  const handleClickCancle = () => {
    setIsUpload(false)
  }

  return (
    <>
      <Modal
        width={480}
        bodyStyle={{padding: '4px 24px 16px 24px'}}
        visible={isOpen}
        title={onTitleChange}
        onCancel={() => closeModal()}
        footer={null}
      >
          <Form
            form={form}
          >
            <Form.Item 
              style={{
                background: '#FFFFFF',
                border: '2px dashed #E0E0E0',
                width: '428px',
                margin: 'auto'
              }}
              rules={[{
                required: true
              }]}
            >
              {
              !isUpload &&
                <>
                  <Upload.Dragger
                    style={{ padding: '100px' }}
                    beforeUpload={beforeUpload}
                  >
                    <Description>ลากไฟล์มาไว้ที่นี่</Description>
                    <Description style={{fontSize: '10px'}}>หรือ</Description>
                    <Button
                      type='primary'
                      fontSize='12px'
                    >
                      เลือกไฟล์จากอุปกรณ์ของคุณ
                    </Button>
                  </Upload.Dragger>
                </>
              }
              {
                isUpload &&
                  <>
                    <UploadContainer>
                      <p>{fileList}</p>
                      <ButtonContanier>
                        <Button
                          onClick={() => handleClickCancle()}
                          fontSize='12px'
                        >
                          ยกเลิก
                        </Button>
                        <Button 
                          type='primary'
                          fontSize='12px'
                        >
                          ยืนยันอัพโหลด
                        </Button>
                      </ButtonContanier>
                    </UploadContainer>
                  </>
              }
            </Form.Item>
          </Form>
      </Modal>
    </>
    )
}

export default UploadDocumentModal
