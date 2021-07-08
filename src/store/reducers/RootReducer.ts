import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import chirpsReducer from "./ChirpsReducer";
import userReducer from "./UserReducer";

import UserChirpsReducer from "./UserChirpsReducer";


const RootReducer = combineReducers({
  auth: authReducer,
  chirps: chirpsReducer,
  user: userReducer

  userChirps: UserChirpsReducer
});

export default RootReducer;
