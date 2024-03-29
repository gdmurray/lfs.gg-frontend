import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'

const initialState = {
  access: undefined,
  refresh: undefined,
  loginErrors: {},
  registerErrors: {}
}

export default (state=initialState, action) => {
  switch(action.type) {
    case auth.LOGIN_SUCCESS:
      console.log(action);
      return {
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
        loginErrors: {}
    }
    case auth.TOKEN_RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        }
      }
    case auth.LOGIN_FAILURE:
    case auth.TOKEN_FAILURE:
      return {
         access: undefined,
         refresh: undefined,
         loginErrors: 
             action.payload.response || 
                {'non_field_errors': action.payload.statusText},
      }

    
    case auth.USER_LOGOUT_FINISH:
      return {...initialState}
    
    case auth.REGISTER_USER_SUCCESS:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
        registerErrors: {}
      }
    case auth.REGISTER_USER_FAILURE:
      return {
        access: undefined,
        refresh: undefined,
        registerErrors: action.payload.response
      }
    default:
      return state
    }
}

export function accessToken(state) {
    if (state.access) {
        return  state.access.token
    }
}
    
export function refreshToken(state) {
    if (state.refresh) {
        return  state.refresh.token
    }
}
    
export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}
export function errors(state) {
   return  state.loginErrors
}

export function registerErrors(state){
  return state.registerErrors
}