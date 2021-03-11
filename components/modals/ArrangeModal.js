import { Modal, Checkbox, message, Radio, Space } from 'antd'
import styled, { css } from 'styled-components'
import { Button } from '../index'
import { useState } from 'react'

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
  onSubmit = () => {},
  sort

}) => {
  const closeModal = () => {
    onClose()
  }
  const [sortState, setSortState] = useState(sort)
  const submit = () => {
    console.log('sortState', sortState)
    onSubmit(sortState)
    closeModal()
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
        <ArrangeItem onClick={() => setSortState('newest')}>
          <ArrangeText>หลักสูตรใหม่</ArrangeText>
          {
            sortState === 'newest' &&
              <Icon src='/static/images/checkmark.svg' />
          }
        </ArrangeItem>
        <ArrangeItem onClick={() => setSortState('letters')}>
          <ArrangeText>ลำดับตัวอักษร</ArrangeText>
          {
            sortState === 'letters' &&
              <Icon src='/static/images/checkmark.svg' />
          }
        </ArrangeItem>
        <ArrangeItem onClick={() => setSortState('cheapest')}>
          <ArrangeText>ราคาต่ำสุด</ArrangeText>
          {
            sortState === 'cheapest' &&
              <Icon src='/static/images/checkmark.svg' />
          }
        </ArrangeItem>
        <ArrangeItem onClick={() => setSortState('expensive')}>
          <ArrangeText>ราคาแพงสุด</ArrangeText>
          {
            sortState === 'expensive' &&
              <Icon src='/static/images/checkmark.svg' />
          }
        </ArrangeItem>
      </ArrangeContainer>
      <Footer>
        <CloseText onClick={() => closeModal()}>ปิด</CloseText>
        <Button
          type='primary'
          fontWeight='normal'
          onClick={() => submit()}
        >เสร็จสิ้น
        </Button>
      </Footer>
    </Modal>
  )
}

export default ArrangeModal
