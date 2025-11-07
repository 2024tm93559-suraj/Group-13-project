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

// Create a new request
export const createRequest = (payload) => ({
  type: CREATE_REQUEST,
  payload,
});
export const createRequestSuccess = (request) => ({
  type: CREATE_REQUEST_SUCCESS,
  payload: request,
});
export const createRequestFailure = (error) => ({
  type: CREATE_REQUEST_FAILURE,
  payload: error,
});

// Fetch all requests
export const fetchRequests = () => ({
  type: FETCH_REQUESTS,
});
export const fetchRequestsSuccess = (requests) => ({
  type: FETCH_REQUESTS_SUCCESS,
  payload: requests,
});
export const fetchRequestsFailure = (error) => ({
  type: FETCH_REQUESTS_FAILURE,
  payload: error,
});

// Approve or Reject a request
export const updateRequestStatus = (id, action) => ({
  type: UPDATE_REQUEST_STATUS,
  payload: { id, action },
});
export const updateRequestStatusSuccess = (request) => ({
  type: UPDATE_REQUEST_STATUS_SUCCESS,
  payload: request,
});
export const updateRequestStatusFailure = (error) => ({
  type: UPDATE_REQUEST_STATUS_FAILURE,
  payload: error,
});