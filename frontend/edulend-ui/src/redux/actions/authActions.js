import {
  REGISTER_USER,
  LOGIN_USER,
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
  type: 'REGISTER_SUCCESS',
  payload,
});

export const registerFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});

export const loginSuccess = (payload) => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});
