  import {
    REGISTER_USER,
    LOGIN_USER,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
  } from '../constants/actionsTypes';

  // 🚀 These are plain object actions — redux-observable can listen to them

  export const registerUser = (payload) => ({
    type: REGISTER_USER,
    payload,
  });

  export const loginUser = (payload) => ({
    type: LOGIN_USER,
    payload,
  });

  export const registerSuccess = (payload) => ({
    type: REGISTER_USER_SUCCESS,
    payload,
  });

  export const registerFailure = (error) => ({
    type: REGISTER_USER_FAILURE,
    payload: error,
  });

  export const loginSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload,
  });

  export const loginFailure = (error) => ({
    type: LOGIN_USER_FAILURE,
    payload: error,
  });

    export const logoutUser = () => ({
    type: LOGOUT_USER,
  });
