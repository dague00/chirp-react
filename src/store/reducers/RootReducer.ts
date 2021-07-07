import { combineReducers } from 'redux';
import authReducer from './AuthReducer';

const RootReducer = combineReducers({
  auth: authReducer
});

export default RootReducer;
