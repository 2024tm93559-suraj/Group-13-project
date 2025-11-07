import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import equipmentReducer from './reducers/equipmentReducer';
import requestReducer from './reducers/requestReducer'; 

const rootReducer = combineReducers({
  auth: authReducer,
  equipment: equipmentReducer,
  requests: requestReducer, 
});

export default rootReducer;