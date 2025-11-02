import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER,
  LOGIN_USER,
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
      return { ...state, loading: true, error: null };
    case LOGIN_USER:
      return { ...state, loading: true, error: null };

    case REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };

    case LOGIN_USER_SUCCESS:
      return { ...state, token: action.payload.token, loading: false };

    case REGISTER_USER_FAILURE:
      return { ...state, loading: false };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default authReducer;
