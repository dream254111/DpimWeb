import axios from 'axios'
import API from './helper/api'

// เอาไว้ดึง faqs ทั้งหมด
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetFAQ`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ดึงวิธีการใช้งานระบบ
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/TutorialReadList`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ดึงรายละเอียดผู้สอน รายไอดี
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetInstructor`,
            params : {
                id : 'ไอดีของผู้สอน'
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}
