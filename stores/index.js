import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import memberReducer from './memberReducer'

const combinedReducer = combineReducers({
  memberReducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}


export const initStore = () => {
  return createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const wrapper = createWrapper(initStore, { debug: true })