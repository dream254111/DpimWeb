import axios from 'axios'
import API from './helper/api'

// เอาไว้ใช้ตอนที่กดพิมพ์หน้านี้ในหน้า course overview
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${API.url}/Course/print_course`,
            params : {
                course_id : '3018'
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ใช้ตอนที่กดขยายระยะเวลาในการเรียน
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'PUT',
            url: `${API.url}/Course/extend_study_time`,
            params : {
                course_id : '3018'
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ใช้ตอนทำคำถามท้ายบทเสร็จ
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'PUT',
            url: `${API.url}/Course/stamp_exercise`,
            params : {
                course_id: 3018,
                course_lesson_id: 2010
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ใช้ตอนvideo >= 90 % ยิง api มา หรือถ้ากดออกจาก วีดีโอบทเรียนนั้น ก็ให้ยิงเส้นนี้
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'PUT',
            url: `${API.url}/Course/stamp_video_lesson`,
            params : {
                course_id: 3018,
                course_lesson_id: 2010,
                video_position: 12.50,
                video_progress: 70
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}


// เอาไว้ใช้ตอนส่งคำตอบของแบบทดสอบก่อนเรียน และหลังเรียน
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'POST',
            url: `${API.url}/Course/send_answer_exam`,
            data : {
                is_pretest :true, // แบบทดสอบก่อนเรียน true , แบบทดสอบหลังเรียน false
                course_id: 3018,
                answer: [
                    {
                        course_exam_id: 7,
                        answer: 1 // เอาจาก order ของ choice คำถา่ม
                    },
                    {
                        course_exam_id: 8,
                        answer: 2  // เอาจาก order ของ choice คำถา่ม
                    }
                ]
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ใช้ตอนส่งคำตอบของแบบประเมินคอร์ส
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'POST',
            url: `${API.url}/Course/send_answer_evaluation`,
            data : {
                course_id: 3018,
                answer: [
                    {
                        course_evaluation_id: 4,
                        course_evaluation_choices_id: 16, // อันนี้ choice ของแบบประเมินข้อนั้น ส่งเป็น id ของ choice มา
                        answer: ""  // พวกที่เป็น text area ใส่มาในนี้ถ้ามีก็ใส่ไม่มีไม่ต้องใส่
                    }
                ]
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ใช้ตอนหน้า course overview อะ ดึงพวกข้อมูลมาให้หมดเลย
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Course/course_info`,
            data : {
                course_id: 3018
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ใช้ตอนหน้าที่เข้าไปเรียนนะ
const fetchFunction = async () => {
    try {
        const response = await axios({
            headers: {
                'Authorization': `token`
            },
            method: 'GET',
            url: `${API.url}/Course/course_by_id`,
            data : {
                course_id: 3018
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}
