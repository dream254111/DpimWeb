import { getMemberCookie, setMemberCookie, resetMemberCookie } from '../helpers/cookie'
import API from '../helpers/api'
import axios from 'axios' 

const suffix = 'MEMBER'

export const MEMBER_LOGIN_SUCCESS = 'MEMBER_LOGIN_SUCCESS' + suffix
export const MEMBER_LOGOUT_REQUEST = 'MEMBER_LOGOUT_REQUEST' + suffix
export const MEMBER_LOGOUT_SUCCESS = 'MEMBER_LOGOUT_SUCCESS' + suffix
export const MEMBER_PROFILE_MINIMAL = 'MEMBER_PROFILE_MINIMAL' + suffix
export const MEMBER_UPDATE = 'MEMBER_UPDATE' + suffix


export const initialState = {
  member: {},
}

export default function memberReducer(state = initialState, action) {
  const { type } = action
  switch (type) {
    case MEMBER_LOGIN_SUCCESS:
      return {
        ...state,
        member: action.payload,
      }
    case MEMBER_PROFILE_MINIMAL:
      return {
        ...state,
        member: {
          ...state.member,
          ...action.payload
        }
      }
    case MEMBER_LOGOUT_REQUEST:
      return {
        ...state,
      }
    case MEMBER_UPDATE:
      return {
        ...state,
        member: {
          ...state.member,
          ...action.payload
        }
      }
    case MEMBER_LOGOUT_SUCCESS:
      return {
        ...state,
        member: initialState.member,
      }
    default: return state
  }
}

export const getMemberDetailFromCookie = ({ req }) => (dispatch) => {
  const memberDetail = getMemberCookie(req)
  if (memberDetail) {
    dispatch({ type: MEMBER_LOGIN_SUCCESS, payload: memberDetail })
    return memberDetail
  } else {
    return false
  }
}

export const setMemberDetail = (payload) => async (dispatch) => {
  try {
    setMemberCookie(payload)
    dispatch({ type: MEMBER_LOGIN_SUCCESS, payload })
    return true
  } catch (error) {
  }
}

export const updateMemberDetail = (payload) => async (dispatch) => {
  try {
    const memberDetail = getMemberCookie()
    setMemberCookie({
      ...memberDetail,
      ...payload
    })
    dispatch({ type: MEMBER_UPDATE, payload })
    return true
  } catch (error) {
  }
}

export const onMemberLogout = () => async (dispatch) => {
  try {
    resetMemberCookie()
    dispatch({ type: MEMBER_LOGOUT_SUCCESS })
    return true
  } catch (error) {
    return false
  }
}

export const checkMemberAlreadyLogin = (req, res) => async dispatch => {
  try {
    const memberDetail = getMemberCookie(req)
    if (memberDetail) {
      await dispatch({ type: MEMBER_LOGIN_SUCCESS, payload: memberDetail })
      await dispatch(fetchProfileMinimal())
    }
    return memberDetail
  } catch (error) {
  }
}

export const fetchProfileMinimal = () => async (dispatch, getState) => {
  const memberToken = getState().memberReducer.member.token
  try {
    const response = await axios({
      headers: {
        Authorization: memberToken
      },
      method: 'GET',
      url: `${API.url}/Student/profile_minimal`
    })
    const responseWithData = response.data
    const profileMinimal = responseWithData.data
    dispatch({ type: MEMBER_PROFILE_MINIMAL, payload: profileMinimal })
  } catch (error) {
    if (error.response.data.Message === 'มีการรลงชื่อเข้าใช้งานจากอุปกรณ์เครื่องอื่น กรุณาตรวจสอบข้อมูลของท่าน') {
      dispatch(onMemberLogout())
    }
  }
}
