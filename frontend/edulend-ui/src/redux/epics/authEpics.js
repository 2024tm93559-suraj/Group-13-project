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
import { AuthAPI } from '../../common/authApi';

// ✅ Register Epic
const registerEpic = (action$) =>
  action$.pipe(
    ofType(REGISTER_USER),
    mergeMap((action) =>
      from(AuthAPI.register(action.payload)).pipe(
        map((response) => registerSuccess(response)),
        catchError((error) => of(registerFailure(error)))
      )
    )
  );

// ✅ Login Epic
const loginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap((action) =>
      from(AuthAPI.login(action.payload)).pipe(
        map((response) => loginSuccess(response)),
        catchError((error) => of(loginFailure(error)))
      )
    )
  );

export const authEpics = combineEpics(registerEpic, loginEpic);
