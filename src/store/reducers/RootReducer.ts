import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import chirpsReducer from "./ChirpsReducer";
import UserChirpsReducer from "./UserChirpsReducer";

const RootReducer = combineReducers({
  auth: authReducer,
  chirps: chirpsReducer,
  userChirps: UserChirpsReducer
});

export default RootReducer;
