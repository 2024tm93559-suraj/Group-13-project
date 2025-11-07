import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import equipmentReducer from './reducers/equipmentReducer';
import requestReducer from './reducers/requestReducer'; // <-- ADD
import notificationReducer from './reducers/notificationReducer'; // <-- ADD

const rootReducer = combineReducers({
  auth: authReducer,
  equipment: equipmentReducer,
  requests: requestReducer, // <-- ADD
  notifications: notificationReducer, // <-- ADD
});

export default rootReducer;