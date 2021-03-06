import axios from "../axiosConfig";
import { Dispatch } from "redux"; 
import { ChirpsDispatchTypes, CHIRPS_FAIL, CHIRPS_LOADING, CHIRPS_SUCCESS } from './UserChirpsActionTypes';

export const GetUsersChirps = () => async(dispatch: Dispatch<ChirpsDispatchTypes>) => {
    try {
        dispatch({
            type: CHIRPS_LOADING
        })
        
        const res = await axios.get(window.location.pathname);
        dispatch({
            type: CHIRPS_SUCCESS,
            payload: res.data
        });
    } catch (e){
        dispatch({
            type: CHIRPS_FAIL
        })
    }
};
