import { useState, useEffect } from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import API from '../helpers/api'

const connector = connect(({ memberReducer }) => ({
  memberToken: memberReducer.member.token
}))


const ExamplePage = ({
  memberToken
}) => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetchCourse()
  }, [])

  const fetchCourse = async () => {
    try {
      const response = await axios({
        headers: {
          Authorization: `Bearer ${memberToken}`
        },
        method: 'GET',
        url: `${API.url}/course`,
      })
      const responseWithData = response.data
      if (responseWithData.status === true) {
        setCourses(responseWithData.data)
      } else {
        throw new Error(responseWithData.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <div>
      {JSON.stringify(courses)}
    </div>
  )
}

export default connector(ExamplePage)
