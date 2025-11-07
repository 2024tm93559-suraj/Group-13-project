import { jwtDecode } from 'jwt-decode';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
} from '../constants/actionsTypes';

const initialState = {
  user: null,
  token: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
    case LOGIN_USER:
      return { ...state, loading: true, error: null };

    case REGISTER_USER_SUCCESS:
      return {
        ...state, user: action.payload, loading: false,
        success: true,
        message: action.payload.message,
      };


    case LOGIN_USER_SUCCESS:
      const userPayload = jwtDecode(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: userPayload,
        loading: false,
        error: null,
      };
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
      };


    case LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;