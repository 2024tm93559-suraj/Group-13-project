// src/redux/epics/requestEpics.js
import { ofType, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import {
  CREATE_REQUEST,
  FETCH_REQUESTS,
  UPDATE_REQUEST_STATUS,
} from '../constants/actionsTypes';
import {
  createRequestSuccess,
  createRequestFailure,
  fetchRequestsSuccess,
  fetchRequestsFailure,
  updateRequestStatusSuccess,
  updateRequestStatusFailure,
} from '../actions/requestActions';
import { RequestAPI } from '../../common/requestApi';

const createRequestEpic = (action$, state$) =>
  action$.pipe(
    ofType(CREATE_REQUEST),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = state.auth.token;
      return from(RequestAPI.create(action.payload, token)).pipe(
        map((response) => createRequestSuccess(response)),
        catchError((error) => of(createRequestFailure(error)))
      );
    })
  );

const fetchRequestsEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_REQUESTS),
    withLatestFrom(state$),
    mergeMap(([, state]) => {
      const token = state.auth.token;
      return from(RequestAPI.list(token)).pipe(
        map((response) => fetchRequestsSuccess(response)),
        catchError((error) => of(fetchRequestsFailure(error)))
      );
    })
  );

const updateRequestStatusEpic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_REQUEST_STATUS),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = state.auth.token;
      const { id, action: reqAction } = action.payload;
      return from(RequestAPI.approveOrReject(id, reqAction, token)).pipe(
        map((response) => updateRequestStatusSuccess(response)),
        catchError((error) => of(updateRequestStatusFailure(error)))
      );
    })
  );

export const requestEpics = combineEpics(
  createRequestEpic,
  fetchRequestsEpic,
  updateRequestStatusEpic
);