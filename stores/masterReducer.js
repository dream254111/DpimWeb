const suffix = 'MEMBER'
export const SET_MASTER_DATA = 'SET_MASTER_DATA' + suffix
import axios from 'axios'
import API from '../helpers/api'

export const initialState = {
  master: {},
}

export default function masterReducer(state = initialState, action) {
  const { type } = action
  switch (type) {
    case SET_MASTER_DATA:
      return {
        ...state,
        master: initialState.master,
      }
    default: return state
  }
}

export const fetchMasterData = () => async (dispatch) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${API.url}/Student/master_data`,
    })
    const data = response.data.data
    dispatch({ type: SET_MASTER_DATA, data })
    return data
  } catch (error) {
    console.log('error', error.message)
  }
}
