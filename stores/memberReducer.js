import { getMemberCookie, setMemberCookie, resetMemberCookie } from '../helpers/cookie'

const suffix = 'MEMBER'

export const MEMBER_LOGIN_SUCCESS = 'MEMBER_LOGIN_SUCCESS' + suffix
export const MEMBER_LOGOUT_REQUEST = 'MEMBER_LOGOUT_REQUEST' + suffix
export const MEMBER_LOGOUT_SUCCESS = 'MEMBER_LOGOUT_SUCCESS' + suffix


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

export const checkMemberAlreadyLogin = (req) => async dispatch => {
  try {
    const memberDetail = getMemberCookie(req)
    if (memberDetail) {
      await dispatch({ type: MEMBER_LOGIN_SUCCESS, payload: memberDetail })
    }
    return memberDetail
  } catch (error) {
    console.log('err', error.message)
  }
}
