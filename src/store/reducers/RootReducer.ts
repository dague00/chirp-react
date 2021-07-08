import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import chirpsReducer from "./ChirpsReducer";
import userReducer from "./UserReducer";

const RootReducer = combineReducers({
  auth: authReducer,
  chirps: chirpsReducer,
  user: userReducer
});

export default RootReducer;
