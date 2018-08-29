import { combineReducers } from 'redux'
import {
  // TYPES
  SET_AUTH_MODE,
  // CONSTANTS
  AuthMode
} from '../actions/auth'

function AuthModeReducer(state = AuthMode.DEFAULT, action) {
  console.log('in AuthModeReducer', state, action)
  switch (action.type) {
    case SET_AUTH_MODE:
      return Object.assign({}, state, {
        AuthMode: action.mode
      })
    default:
      return state
  }
}

const blearnReducer = combineReducers({
  AuthModeReducer
})

export default blearnReducer