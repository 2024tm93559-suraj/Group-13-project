import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import equipmentReducer from './reducers/equipmentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  equipment: equipmentReducer,
});

export default rootReducer;
