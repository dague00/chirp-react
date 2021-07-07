import { combineReducers } from "redux";
import chirpsReducer from "./ChirpsReducer";
import UserChirpsReducer from "./UserChirpsReducer";

const RootReducer = combineReducers({
    chirps: chirpsReducer,
    userChirps: UserChirpsReducer
});

export default RootReducer;