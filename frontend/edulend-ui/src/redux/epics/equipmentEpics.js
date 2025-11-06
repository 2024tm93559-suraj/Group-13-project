import { ofType, combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import {
  FETCH_EQUIPMENT,
  ADD_EQUIPMENT,
  UPDATE_EQUIPMENT,
  DELETE_EQUIPMENT,
} from '../constants/actionsTypes';
import {
  fetchEquipmentSuccess,
  fetchEquipmentFailure,
  addEquipmentSuccess,
  addEquipmentFailure,
  updateEquipmentSuccess,
  updateEquipmentFailure,
  deleteEquipmentSuccess,
  deleteEquipmentFailure,
} from '../actions/equipmentActions';
import { EquipmentAPI } from '../../common/equipmentApi';

const fetchEquipmentEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_EQUIPMENT),
    withLatestFrom(state$),
    mergeMap(([, state]) => {

      const token = state.auth.token; 

      
      return from(EquipmentAPI.list(token)).pipe(
        map((response) => fetchEquipmentSuccess(response)),
        catchError((error) => of(fetchEquipmentFailure(error)))
      );
    })
  );

// Epic to add new equipment
const addEquipmentEpic = (action$, state$) =>
  action$.pipe(
    ofType(ADD_EQUIPMENT),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = state.auth.token;
      if (!token) {
        return of(addEquipmentFailure('No token found'));
      }
      return from(EquipmentAPI.create(action.payload, token)).pipe(
        map((response) => addEquipmentSuccess(response)),
        catchError((error) => of(addEquipmentFailure(error)))
      );
    })
  );

// Epic to update equipment
const updateEquipmentEpic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_EQUIPMENT),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = state.auth.token;
      if (!token) {
        return of(updateEquipmentFailure('No token found'));
      }
      const { id, data } = action.payload;
      return from(EquipmentAPI.update(id, data, token)).pipe(
        map((response) => updateEquipmentSuccess(response)),
        catchError((error) => of(updateEquipmentFailure(error)))
      );
    })
  );

// Epic to delete equipment
const deleteEquipmentEpic = (action$, state$) =>
  action$.pipe(
    ofType(DELETE_EQUIPMENT),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = state.auth.token;
      if (!token) {
        return of(deleteEquipmentFailure('No token found'));
      }
      const id = action.payload;
      return from(EquipmentAPI.remove(id, token)).pipe(
        map(() => deleteEquipmentSuccess(id)),
        catchError((error) => of(deleteEquipmentFailure(error)))
      );
    })
  );

export const equipmentEpics = combineEpics(
  fetchEquipmentEpic,
  addEquipmentEpic,
  updateEquipmentEpic,
  deleteEquipmentEpic
);