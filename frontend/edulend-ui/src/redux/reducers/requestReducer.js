// src/redux/reducers/requestReducer.js
import {
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE,
  FETCH_REQUESTS,
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_FAILURE,
  UPDATE_REQUEST_STATUS,
  UPDATE_REQUEST_STATUS_SUCCESS,
  UPDATE_REQUEST_STATUS_FAILURE,
} from '../constants/actionsTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUEST:
    case FETCH_REQUESTS:
    case UPDATE_REQUEST_STATUS:
      return { ...state, loading: true, error: null };

    case CREATE_REQUEST_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] };

    case FETCH_REQUESTS_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case UPDATE_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case CREATE_REQUEST_FAILURE:
    case FETCH_REQUESTS_FAILURE:
    case UPDATE_REQUEST_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default requestReducer;