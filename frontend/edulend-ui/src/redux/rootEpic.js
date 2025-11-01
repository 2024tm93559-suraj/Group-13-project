import { combineEpics } from 'redux-observable';
import { authEpics } from './epics/authEpics';

// ✅ No spread syntax
export const rootEpic = combineEpics(authEpics);
