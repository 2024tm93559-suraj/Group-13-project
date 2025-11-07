import { combineEpics } from 'redux-observable';
import { authEpics } from './epics/authEpics';
import { equipmentEpics } from './epics/equipmentEpics';
import { requestEpics } from './epics/requestEpics'; 

export const rootEpic = combineEpics(
  authEpics,
  equipmentEpics,
  requestEpics, 
);