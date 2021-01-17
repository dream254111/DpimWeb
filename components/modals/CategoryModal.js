import { Modal, Checkbox, message, Radio, Space } from 'antd'
import styled, { css } from 'styled-components'
import { Button } from '../index'
import { useState } from 'react'
const CheckboxGroup = Checkbox.Group
import _ from 'lodash'

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

const CategoryModal = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
  sort,
  master
}) => {
  const closeModal = () => {
    onClose()
  }
  const courseCategoryKey = _.groupBy(master.course_category, 'name')

  const [categoryState, setCategoryState] = useState(null)
  const submit = () => {
    onSubmit(categoryState)
    closeModal()
  }

  return (
    <Modal
      width={320}
      visible={isOpen}
      title='หมวดหมู่'
      footer={null}
      onCancel={() => closeModal()}
    >
      <ArrangeContainer>
        <CheckboxGroup
          options={master.course_category.map(item => item.name)}
          onChange={(categoryDetails) => {
            const categoryIds = categoryDetails.map(item => courseCategoryKey[item][0].id)
            setCategoryState(categoryIds.length === 0 ? 0 : categoryIds)
          }}
        />
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

export default CategoryModal
