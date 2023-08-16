import { addUserInfo, getUserInfo, logOutUser, loginUser, registerUser } from "../../utils/burger-api";

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
      return registerUser(email, password, name)
      .then((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({ type: REGISTER_SUCCESS});
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
    } catch (error) {
      dispatch({ type: REGISTER_FAILED, payload: error.message });
    }
  }
}

export const loginRequest = (email, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return loginUser(email, password).then((res)=> {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch({ type: LOGIN_SUCCESS});
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
      return res;
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILED, payload: error.message });
    })
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
      .catch(err => {
        console.error("Error: ", err);
      });
  }
}

export const addInfo = (name, email, password) => {
  return (dispatch) => {
    return addUserInfo(name, email, password)
      .then((res) => {
        dispatch(setUser({
           name: res.user.name, email: res.user.email 
        }));
        return res;
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  };
}

