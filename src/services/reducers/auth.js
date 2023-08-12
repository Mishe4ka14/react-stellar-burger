import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_REQUEST } from "../actions/auth"

const initialState = {
    user: null,
    registerRequest: false,
    registerFailed: false,
}

export const authReducer = (store = initialState, action) => {
  switch (action.type) {
    default:
      return store;
  }
}