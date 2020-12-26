import axios from 'axios'
import API from './helper/api'

// เอาไว้ get ข่าวทั้งหมด
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetAllNews`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ get ข่าว ตาม id ข่าว
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetNews`,
            params : {
                id : 'ไอดีข่าว'
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}


// เอาไว้ payment description ตอนที่กด ซื้อคอร์สอะให้มันขึ้นรายละเอียดการชำระเงิน
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetAllPayment`
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ video on demand (search) ใช้กับหน้าแรกด้วยได้
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetAllVideo`,
            params : {
                category_id : '', // 0 คือ เอาทุก category หรือไม่ก็ส่ง categoryId มา
                sort : '' // oldest | newest
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}

// เอาไว้ video on demand by id
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/GetVideo`,
            params : {
                id : '' // id ของ video on demand
            }
        })


    } catch (error) {
        message.error(error.message)
    }
}