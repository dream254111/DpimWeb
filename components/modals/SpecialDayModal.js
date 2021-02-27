import { Modal } from 'antd'
import styled from 'styled-components'

const Image = styled('img')`
  max-width: 100%;
  height: auto;
`

const SpecialDayModal = ({
  isOpen = false,
  onClose = () => {},
  imageUrl
}) => {
  const closeModal = () => {
    onClose()
  }

  return (
    <Modal
      bodyStyle={{ padding: '0px' }}
      title={null}
      visible={isOpen}
      onCancel={() => closeModal()}
      footer={null}
    >
      <Image src={imageUrl} />
    </Modal>
  )
}

export default SpecialDayModal
