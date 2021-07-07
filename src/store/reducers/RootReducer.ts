import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import chirpsReducer from "./ChirpsReducer";

const RootReducer = combineReducers({
  auth: authReducer,
  chirps: chirpsReducer
});

export default RootReducer;
