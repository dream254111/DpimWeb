import { Modal, Checkbox, message, Radio, Space } from 'antd'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Button } from '../index'
const CheckboxGroup = Checkbox.Group
import _ from 'lodash'

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
  font-size: 18px;
  cursor: pointer;
`

const FilterModal = ({
  isOpen = false,
  onClose = () => { },
  master,
  learningOnline,
  categoryId,
  onSubmit = () => { }
}) => {
  const closeModal = () => {
    onClose()
  }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }

  const [filter, setFilter] = useState({
    learningOnline,
    categoryId
  })
  const courseCategoryKey = _.groupBy(master.course_category, 'name')

  const submit = () => {
    onSubmit(filter)
    closeModal()
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
        <Space direction='vertical' style={{ marginTop: '10px' }}>
          <CheckboxGroup
            options={master.course_category.map(item => item.name)}
            onChange={(categoryDetails) => {
              const categoryIds = categoryDetails.map(item => courseCategoryKey[item][0].id)
              setFilter({
                ...filter,
                category_id: categoryIds.length === 0 ? 0 : categoryIds
              })
            }}
          />
        </Space>
      </FilterItem>
      <HorizontalLine />
      <FilterItem>
        <FilterTitle>รูปแบบการเรียน</FilterTitle>
        <Radio.Group
          style={{ marginTop: '8px' }}
          value={filter.learning_online}
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
        <Button type='primary' fontWeight='normal' onClick={() => submit()}>เสร็จสิ้น</Button>
      </Footer>
    </Modal>
  )
}

export default FilterModal
