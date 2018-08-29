import { combineReducers } from 'redux'
import {
  // TYPES
  SET_AUTH_MODE,
  // CONSTANTS
  AuthMode
} from '../actions/auth'

function AuthModeReducer(state = DEFAULT, action) {
  switch (action.type) {
    case SET_AUTH_MODE:
      return Object.assign({}, state, {
        AuthMode: action.mode
      })
      // return action.mode
    default:
      return state
  }
}

const authApp = combineReducers({
  AuthModeReducer
})

export default authApp