import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_REQUEST, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS } from "../actions/auth"

const initialState = {
    user: null,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: return {
      ...state, registerRequest: true, registerFailed: false
    };
    case REGISTER_SUCCESS: return {
      ...state, registerRequest: false, registerFailed: false, user: action.payload.user
    };
    case REGISTER_FAILED: return {
      ...state, registerRequest: false, registerFailed: true 
    };
    case LOGIN_REQUEST: return {
       ...state, loginRequest: true, loginFailed: false 
    };
    case LOGIN_SUCCESS: return {
       ...state, loginRequest: false, user: action.payload.user 
    };
    case LOGIN_FAILED: return {
       ...state, loginRequest: false, loginFailed: true 
    };
    case LOGOUT_REQUEST: return {
       ...state, logoutRequest: true, logoutFailed: false 
    };
    case LOGOUT_SUCCESS: return {
       ...state, logoutRequest: false, user: null 
    };
    case LOGOUT_FAILED: return {
       ...state, logoutRequest: false, logoutFailed: true
    };
    default: return state;
  }
};