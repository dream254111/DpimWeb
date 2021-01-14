import { Modal, Checkbox, message, Radio, Space } from 'antd'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Button } from '../index'

const FilterTitle = styled('div')``
const FilterItem = styled('div')``
const HorizontalLine = styled('div')`
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin: 16px 0;
`
const Footer = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`

const CloseText = styled('div')`
  margin-right: 32px;
  font-size: 16px;
  cursor: pointer;
`

const FilterModal = ({
  isOpen = false,
  onClose = () => { },

}) => {
  const closeModal = () => {
    onClose()
  }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }
  const [filter, setFilter] = useState([])

  return (
    <Modal
      width={320}
      visible={isOpen}
      title='คัดกรอง'
      footer={null}
      onCancel={() => closeModal()}
    >
      <FilterItem>
        <FilterTitle>รูปแบบการเรียน</FilterTitle>
        <Radio.Group
          style={{ marginTop: '8px' }}
          onChange={(event) => {
            setFilter({
              ...filter,
              learning_online: event.target.value
            })
          }}
        >
          <Radio style={radioStyle} value={1}>
            คอร์สเรียนที่สถาบัน
          </Radio>
          <Radio style={radioStyle} value={0}>
            คอร์สออนไลน์
          </Radio>
        </Radio.Group>
      </FilterItem>
      <HorizontalLine />
      <Footer>
        <CloseText onClick={() => closeModal()}>ปิด</CloseText>
        <Button type='primary' fontWeight='normal'>เสร็จสิ้น</Button>
      </Footer>
    </Modal>
  )
}

export default FilterModal
