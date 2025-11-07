// src/redux/epics/notificationEpics.js
import { ofType, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { FETCH_NOTIFICATIONS } from '../constants/actionsTypes';
import {
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from '../actions/notificationActions';
import { NotificationAPI } from '../../common/notificationApi';

const fetchNotificationsEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_NOTIFICATIONS),
    withLatestFrom(state$),
    mergeMap(([, state]) => {
      const token = state.auth.token;
      return from(NotificationAPI.list(token)).pipe(
        map((response) => fetchNotificationsSuccess(response)),
        catchError((error) => of(fetchNotificationsFailure(error)))
      );
    })
  );

export const notificationEpics = combineEpics(fetchNotificationsEpic);