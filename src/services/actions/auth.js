import { registerUser } from "../../utils/burger-api";
export const LOGIN_REQUEST = 'LOGIN_REEQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REEQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const registerRequest = (email, password, name) => {
  return function (dispatch) {
    return registerUser(email, password, name)
  }
}