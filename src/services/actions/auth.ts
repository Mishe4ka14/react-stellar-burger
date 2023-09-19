import { addUserInfo, getUserInfo, logOutUser, loginUser, registerUser } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TUser } from "../types/types";

export const LOGIN_REQUEST:'LOGIN_REEQUEST' = 'LOGIN_REEQUEST';
export const LOGIN_SUCCESS:'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED:'LOGIN_FAILED' = 'LOGIN_FAILED';

export const REGISTER_REQUEST:'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS:'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED:'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGOUT_REQUEST:'LOGOUT_REEQUEST' = 'LOGOUT_REEQUEST';
export const LOGOUT_SUCCESS:'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED:'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const SET_USER:'SET_USER' = 'SET_USER';
export const SET_AUTH_CHECKED:'SET_AUTH_CHECKED' = 'SET_AUTH_CHECKED';

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccesstAction {
  readonly type: typeof LOGIN_SUCCESS
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED
}

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED
}

export interface ISetUserAction {
  readonly type: typeof SET_USER,
  user: TUser | null
}

export interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED,
  isAuthChecked: boolean
}

export type TAuthActions = 
  | ILoginRequestAction
  | ILoginSuccesstAction
  | ILoginFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | ISetUserAction
  | ISetAuthChecked;


export const registerRequest:AppThunk = (email:string, password:string, name:string) => {
  return (dispatch: AppDispatch) => {
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
    } catch (error ) {
      if (error instanceof Error) {
      dispatch({ type: REGISTER_FAILED, payload: error.message });
      }
    }
  }
}

export const loginRequest = (email:string, password:string) => {
  return (dispatch: AppDispatch) => {
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

export const logoutRequest: AppThunk = (token:string)  => {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    try {
      await logOutUser(token)
      .then(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    })
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      if (error instanceof Error) {
      dispatch({ type: LOGOUT_FAILED, payload: error.message });
      }
    }
  }
}

export const setAuthChecked = (value: boolean) => ({
  type: SET_AUTH_CHECKED,
  isAuthChecked: value,
});

export const setUser = (user: TUser | null):ISetUserAction => ({
  type: SET_USER,
  user: user
});

export const checkUserAuth: AppThunk<void> = () => {
  return async (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      try {
       (dispatch as AppThunk<void>)(getUser());
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      } finally {
        dispatch(setAuthChecked(true));
      }
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const getUser:AppThunk<void> = () => {
  return (dispatch:AppDispatch) => {
    return getUserInfo()
      .then((res) => {
        dispatch(setUser(res.user))
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  }
}

export const addInfo:AppThunk = (name:string, email:string, password:string) => {
  return (dispatch:AppDispatch) => {
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

