import axios from "axios";
import { Dispatch } from "redux"; 
import { ChirpsDispatchTypes, CHIRPS_FAIL, CHIRPS_LOADING, CHIRPS_SUCCESS } from './ChirpsActionTypes'

export const GetAllChirps = () => async (dispatch: Dispatch<ChirpsDispatchTypes>) => {
    try {
        dispatch({
            type: CHIRPS_LOADING
        })
        
        const res = await axios.get('http://localhost:3000/chirp/all');
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
