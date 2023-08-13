import { getUserInfo, logOutUser, loginUser, registerUser } from "../../utils/burger-api";
export const LOGIN_REQUEST = 'LOGIN_REEQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REEQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REEQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const SET_USER = 'SET_USER'
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED'

export const registerRequest = (email, password, name) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      return registerUser(email, name, password)
      .then((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch({ type: REGISTER_SUCCESS, payload: response });
      })
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.message });
    }
  }
}

export const loginRequest = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      dispatch({ type: LOGIN_SUCCESS, payload: response });
      dispatch(setUser(response.user));
      dispatch(setAuthChecked(true));
    } catch (error) {
      dispatch({ type: LOGIN_FAILED, payload: error.message });
    }
  }
}

export const logoutRequest = (token) => {
  return async function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });

    try {
      await logOutUser(token)
      .then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    })
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_FAILED, payload: error.message });
    }
  }
}

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const checkUserAuth = () => {
  return (dispatch) => {
      if (localStorage.getItem("accessToken")) {
          dispatch(getUser())
            .catch(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(setUser(null));
             })
            .finally(() => dispatch(setAuthChecked(true)));
      } else {
          dispatch(setAuthChecked(true));
      }
  };
};

export const getUser = () => {
  return (dispatch) => {
    return getUserInfo()
      .then((res) => {
        dispatch(setUser(res.user))
      })
  }
}

