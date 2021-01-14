import { Modal } from 'antd'
import styled from 'styled-components'

const Image = styled('img')`
  width: 100%;
  height: 100%;
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
      width={360}
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
