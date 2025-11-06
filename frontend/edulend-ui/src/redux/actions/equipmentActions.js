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

// Fetch List
export const fetchEquipment = () => ({
  type: FETCH_EQUIPMENT,
});

export const fetchEquipmentSuccess = (equipment) => ({
  type: FETCH_EQUIPMENT_SUCCESS,
  payload: equipment,
});

export const fetchEquipmentFailure = (error) => ({
  type: FETCH_EQUIPMENT_FAILURE,
  payload: error,
});

// Add New
export const addEquipment = (payload) => ({
  type: ADD_EQUIPMENT,
  payload,
});

export const addEquipmentSuccess = (equipment) => ({
  type: ADD_EQUIPMENT_SUCCESS,
  payload: equipment,
});

export const addEquipmentFailure = (error) => ({
  type: ADD_EQUIPMENT_FAILURE,
  payload: error,
});


// Update
export const updateEquipment = (id, payload) => ({
  type: UPDATE_EQUIPMENT,
  payload: { id, data: payload },
});

export const updateEquipmentSuccess = (equipment) => ({
  type: UPDATE_EQUIPMENT_SUCCESS,
  payload: equipment,
});

export const updateEquipmentFailure = (error) => ({
  type: UPDATE_EQUIPMENT_FAILURE,
  payload: error,
});

// Delete
export const deleteEquipment = (id) => ({
  type: DELETE_EQUIPMENT,
  payload: id,
});

export const deleteEquipmentSuccess = (id) => ({
  type: DELETE_EQUIPMENT_SUCCESS,
  payload: id,
});

export const deleteEquipmentFailure = (error) => ({
  type: DELETE_EQUIPMENT_FAILURE,
  payload: error,
});
