import styled from 'styled-components'
import { Modal, Space, Checkbox } from 'antd'
import { Button } from '../index'
const CheckboxGroup = Checkbox.Group

const FilterTitle = styled('div')`
  font-size: 18px;
`

const FilterItem = styled('div')`
  margin: 16px 0;
`

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
  font-size: 18px;
  cursor: pointer;
`

const CategoryModal = ({
  isOpen,
  onClose = () => {},
}) => {
  const closeModal = () => {
    onClose()
  }
  return (
    <Modal
      width={320}
      visible={isOpen}
      title='คัดกรอง'
      footer={null}
      onCancel={() => closeModal()}
    >
      <FilterItem>
        <FilterTitle>หมวดหมู่</FilterTitle>
        <Space direction='vertical' size={6} style={{ marginTop: '10px' }}>
          
        </Space>
      </FilterItem>
      <Footer>
        <CloseText onClick={() => closeModal()}>ปิด</CloseText>
        <Button type='primary' fontWeight='normal'>เสร็จสิ้น</Button>
      </Footer>
    </Modal>
  )
}

export default CategoryModal
