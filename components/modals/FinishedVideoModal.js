import { Modal, Button } from 'antd'

const FinishedVideoModal = ({
  isOpen = false,
  onSubmit = () => {},
  onClose = () => {}
}) => {
  const closeModal = () => {
    onClose()
  }
  return (
    <Modal
      visible={isOpen}
      footer={null}
      bodyStyle={{ padding: '50px 24px 16px 24px' }}
      // onCancel={() => closeModal()}
    >
      <Button style={{width: '100%' }} onClick={() => onSubmit()}>ถัดไป</Button>
    </Modal>
  )
}

export default FinishedVideoModal
