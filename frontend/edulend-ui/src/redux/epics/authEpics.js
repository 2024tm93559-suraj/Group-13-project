import { ofType, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import {
  REGISTER_USER,
  LOGIN_USER,
} from '../constants/actionsTypes';
import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
} from '../actions/authActions';
import { httpRequest } from '../../common/connector/http';

// ✅ Register Epic
const registerEpic = (action$) =>
  action$.pipe(
    ofType(REGISTER_USER),
    mergeMap((action) => {
      const api = httpRequest();
      return from(api.post('/api/auth/register', action.payload)).pipe(
        map((response) => registerSuccess(response.data)),
        catchError((error) => of(registerFailure(error.message)))
      );
    })
  );

// ✅ Login Epic
const loginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap((action) => {
      const api = httpRequest();
      return from(api.post('/api/auth/login', action.payload)).pipe(
        map((response) => loginSuccess(response.data)),
        catchError((error) => of(loginFailure(error.message)))
      );
    })
  );

// ✅ Combine them
export const authEpics = combineEpics(registerEpic, loginEpic);
