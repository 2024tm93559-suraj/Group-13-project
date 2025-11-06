import { combineEpics } from 'redux-observable';
import { authEpics } from './epics/authEpics';
import { equipmentEpics } from './epics/equipmentEpics';

// ✅ No spread syntax
export const rootEpic = combineEpics(authEpics, equipmentEpics);
