// src/redux/actions/notificationActions.js
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from '../constants/actionsTypes';

export const fetchNotifications = () => ({
  type: FETCH_NOTIFICATIONS,
});
export const fetchNotificationsSuccess = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload: notifications,
});
export const fetchNotificationsFailure = (error) => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: error,
});