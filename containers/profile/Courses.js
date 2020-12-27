import styled from 'styled-components'
import font from '../../helpers/font'
import { Form } from 'antd'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import API from '../../helpers/api'
import axios from 'axios'

const PageTitle = styled('div')`
  color: #00937B;
  font-size: 24px;
  font-family: ${font.bold};
`

const Wrapper = styled('div')`

`
const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token,
  memberDetail: memberReducer.member,
}))

const Courses = () => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
    console.log('fetchCourse')
  }, [])
  const handleSubmit = (values) => {
    console.log('handleSubmit', values)
  }
  return (
    <Wrapper>
      <Form
        onFinish={handleSubmit}
        form={form}
      >
        <PageTitle>คอร์สของฉัน</PageTitle>
      </Form>
    </Wrapper>
  )
}

export default connector(Courses)
