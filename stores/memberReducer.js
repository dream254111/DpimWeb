import { getMemberCookie, setMemberCookie, resetMemberCookie } from '../helpers/cookie'
import API from '../helpers/api'
import axios from 'axios' 

const suffix = 'MEMBER'

export const MEMBER_LOGIN_SUCCESS = 'MEMBER_LOGIN_SUCCESS' + suffix
export const MEMBER_LOGOUT_REQUEST = 'MEMBER_LOGOUT_REQUEST' + suffix
export const MEMBER_LOGOUT_SUCCESS = 'MEMBER_LOGOUT_SUCCESS' + suffix
export const MEMBER_PROFILE_MINIMAL = 'MEMBER_PROFILE_MINIMAL' + suffix


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
    console.log('error', error)
  }
}

export const onMemberLogout = () => async (dispatch) => {
  try {
    const result = resetMemberCookie()
    console.log('result', result)
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
      // console.log('checkMemberAlreadyLogin')
      // console.log('token', memberDetail.token)
      // const response = await axios({
      //   headers: {
      //       'Authorization': memberDetail.token
      //   },
      //   method: 'GET',
      //   url: `${API.url}/Student/profile_minimal`
      // })
      // const responseWithData = response.data
      // // console.log('checkMemberAlreadyLogin', responseWithData)
      await dispatch({ type: MEMBER_LOGIN_SUCCESS, payload: memberDetail })
      await dispatch(fetchProfileMinimal())
    } else {
      // res.redirect('/')
    }
    return memberDetail
  } catch (error) {
    console.log('err', error.message)
  }
}


export const fetchProfileMinimal = () => async (dispatch, getState) => {
  const memberToken = getState().memberReducer.member.token
    const response = await axios({
      headers: {
          'Authorization': memberToken
      },
      method: 'GET',
      url: `${API.url}/Student/profile_minimal`
    })
    const responseWithData = response.data
    const profileMinimal = responseWithData.data
    dispatch({ type: MEMBER_PROFILE_MINIMAL, payload: profileMinimal })
}
