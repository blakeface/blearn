/* ACTION TYPES */
export const SET_AUTH_MODE = 'SET_AUTH_MODE'

/* OTHER CONSTANTS */
export const AuthMode = {
  DEFAULT: 'DEFAULT',
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
}

/* ACTION CREATORS */
export function setAuthMode(mode) {
	console.log('in action creator', mode)
  return { type: SET_AUTH_MODE, mode }
}