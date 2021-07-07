import { combineReducers } from "redux";
import chirpsReducer from "./ChirpsReducer";

const RootReducer = combineReducers({
    chirps: chirpsReducer
});

export default RootReducer;