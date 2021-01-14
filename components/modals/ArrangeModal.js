import { Modal, Checkbox, message, Radio, Space } from 'antd'
import styled, { css } from 'styled-components'
import { Button } from '../index'

const ArrangeContainer = styled('div')`
  display: flex;
  flex-direction: column;
`

const ArrangeItem = styled('div')`
  margin-top: 16px;
  display: flex;
  cursor: pointer;
`

const ArrangeText = styled('div')`
  font-size: 18px;
  flex: 1;
  ${props => props.selected && css`
    color: #00937B;
  `}
`

const Icon = styled('img')`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
`

const Footer = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`

const CloseText = styled('div')`
  margin-right: 32px;
  font-size: 18px;
  cursor: pointer;
`

const ArrangeModal = ({
  isOpen = false,
  onClose = () => {},

}) => {
  const closeModal = () => {
    onClose()
  }

  return (
    <Modal
      width={320}
      visible={isOpen}
      title='จัดเรียง'
      footer={null}
      onCancel={() => closeModal()}
    >
      <ArrangeContainer>
        <ArrangeItem>
          <ArrangeText>ราคาต่ำสุดก่อน</ArrangeText>
          <Icon src='/static/images/checkmark.svg' />
        </ArrangeItem>
        <ArrangeItem>
          <ArrangeText>ราคาสูงสุดก่อน</ArrangeText>
        </ArrangeItem>
        <ArrangeItem>
          <ArrangeText>ใหม่สุดก่อน</ArrangeText>
        </ArrangeItem>
        <ArrangeItem>
          <ArrangeText>เก่าสุดก่อน</ArrangeText>
        </ArrangeItem>
      </ArrangeContainer>
      <Footer>
        <CloseText onClick={() => closeModal()}>ปิด</CloseText>
        <Button type='primary' fontWeight='normal'>เสร็จสิ้น</Button>
      </Footer>
    </Modal>
  )
}

export default ArrangeModal
