import axios from "axios";
import { Dispatch } from "redux"; 
import { ChirpsDispatchTypes, CHIRPS_FAIL, CHIRPS_LOADING, CHIRPS_SUCCESS } from './ChirpsActionTypes'
//import { apiURL } from "../shared/constants";
import { config } from "dotenv";
import { apiURL } from "../shared/constants";
config();

export const GetAllChirps = () => async (dispatch: Dispatch<ChirpsDispatchTypes>) => {
    try {
        dispatch({
            type: CHIRPS_LOADING
        })

        //console.log(process.env.API_URL);
        console.log('http://' + apiURL + '/chirp/all');

        const res = await axios.get('http://' + apiURL + '/chirp/all');
        // const res = await axios.get('http://chirper.hopto.org:3000/chirp/all');
        
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
