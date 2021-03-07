import { Modal, Button } from 'antd'
import styled from 'styled-components'

const FinishedVideoModal = ({
  isOpen = false,
  onSubmit = () => { }
}) => {
  return (
    <Modal
      visible={isOpen}
      footer={null}
      bodyStyle={{ padding: '50px 24px 16px 24px',  }}
    >
      <Button style={{width: '100%'}} onClick={() => onSubmit()}>ถัดไป</Button>
    </Modal>
  )
}

export default FinishedVideoModal
