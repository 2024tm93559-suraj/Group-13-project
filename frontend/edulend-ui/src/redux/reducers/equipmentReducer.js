import {
  FETCH_EQUIPMENT,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
  ADD_EQUIPMENT,
  ADD_EQUIPMENT_SUCCESS,
  ADD_EQUIPMENT_FAILURE,
  UPDATE_EQUIPMENT,
  UPDATE_EQUIPMENT_SUCCESS,
  UPDATE_EQUIPMENT_FAILURE,
  DELETE_EQUIPMENT,
  DELETE_EQUIPMENT_SUCCESS,
  DELETE_EQUIPMENT_FAILURE,
} from '../constants/actionsTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const equipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EQUIPMENT:
    case ADD_EQUIPMENT:
    case UPDATE_EQUIPMENT:
    case DELETE_EQUIPMENT:
      return { ...state, loading: true, error: null };

    case FETCH_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case ADD_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case UPDATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case DELETE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case FETCH_EQUIPMENT_FAILURE:
    case ADD_EQUIPMENT_FAILURE:
    case UPDATE_EQUIPMENT_FAILURE:
    case DELETE_EQUIPMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default equipmentReducer;