import { logOutUser, loginUser, registerUser } from "../../utils/burger-api";
export const LOGIN_REQUEST = 'LOGIN_REEQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REEQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REEQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';


export const registerRequest = (email, password, name) => {
  return async function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = await registerUser(email, name, password);

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      dispatch({ type: REGISTER_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.message });
    }
  }
}

export const loginRequest = (email, password) => {
  return async function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await loginUser(email, password);

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      dispatch({ type: LOGIN_SUCCESS, payload: response });
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.message });
    }
  }
}

export const logoutRequest = (token) => {
  return async function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });

    try {
      await logOutUser(token);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILED, payload: error.message });
    }
  }
}

