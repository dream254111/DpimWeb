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


// เอาไว้ดึงอัพโหลดรูปกับเอกสาร
const fetchFunction = async () => {
    try {
        const bodyFormData = new FormData();
        bodyFormData.append('', file);

        const response = await axios({
            method: 'POST',
            url: `${API.url}/FileUpload/FileUpload`,
            data : bodyFormData
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้แจ้งรายงานปัญหา
const fetchFunction = async () => {
    try {

        const response = await axios({
            method: 'POST',
            url: `${API.url}/Student/AddReportProblem`,
            data : {
                problem_of_use_id: 0, // เอาจาก master data 
                firstname: '',
                lastname: '',
                description: '',
                phone: '',
                email: '',
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}
