
import axios from 'axios'
import API from './helper/api'


// เอาไว้ login
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${API.url}/Student/Login`,
            data : {
                "username": "",
                "password": ""
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ ขอลืมรหัสผ่านส่งไปที่อีเมล์
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Student/RequestForgetPassword`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ ตั้งรหัสผ่านใหม่
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'POST',
            url: `${API.url}/Student/ForgetPassword`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ ดึง user profile ในหน้า profile
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Student/StudentProfile`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ register
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${API.url}/Student/RegisterStudent`,
            data : {
                student: {
                    "firstname": "test",
                    "lastname": "test",
                    "email": "",
                    "firstname_en": "ทดสอบ1",
                    "lastname_en": "ทดสอบ1",
                    "id_card": "",
                    "gender": 0,
                    "birthday": "2020-01-01",
                    "province_id": 0,
                    "district_id": 0,
                    "sub_district_id": 0,
                    "zipcode": "",
                    "address": "",
                    "phone": "",
                    "educational_id": 0,
                    "career_id": 0,
                    "career_name": "",
                    "know_channel": [0,1],
                    "username": "test_2",
                    "password": "test"
                }
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ get user certificates
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Student/CertificateReadList`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ get คอร์สที่ userเรียนล่าสุดพร้อมกับ progress
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Course/my_course_progress`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ get คอร์สที่เป็นของ user
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Course/my_course`
        })


    } catch (error) {
        message.error(error.message)
    }
}