import axios from 'axios'
import API from './helper/api'

// เอาไว้ดึง master data ทั้งหมด ยกเว้นพวก จังหวัด เขต แขวง
const fetchFunction = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${API.url}/Student/master_data`
        })


    } catch (error) {
        message.error(error.message)
    }
}
