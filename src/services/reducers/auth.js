import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_REQUEST, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, SET_AUTH_CHECKED, SET_USER, } from "../actions/auth"

const initialState = {
    user: null,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    isAuthChecked: false,
}

export const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: return {
      ...store, registerRequest: true, registerFailed: false
    };
    case REGISTER_SUCCESS: return {
      ...store, registerRequest: false, registerFailed: false,
    };
    case REGISTER_FAILED: return {
      ...store, registerRequest: false, registerFailed: true 
    };  
    case LOGIN_REQUEST: return {
       ...store, loginRequest: true, loginFailed: false 
    };
    case LOGIN_SUCCESS: return {
       ...store, loginRequest: false, loginFailed: false,
    };
    case LOGIN_FAILED: return {
       ...store, loginRequest: false, loginFailed: true 
    };
    case LOGOUT_REQUEST: return {
       ...store, logoutRequest: true, logoutFailed: false 
    };
    case LOGOUT_SUCCESS: return {
       ...store, logoutRequest: false, user: null 
    };
    case LOGOUT_FAILED: return {
       ...store, logoutRequest: false, logoutFailed: true
    };
    case SET_AUTH_CHECKED: return {
      ...store, isAuthChecked: action.payload
    }
    case SET_USER:
      return {
        ...store, user: action.payload
      }
    default: return store;
  }
};