import axios from "axios";
import { Dispatch } from "redux"; 
import { ChirpsDispatchTypes, ChirpsType, CHIRPS_FAIL, CHIRPS_LOADING, CHIRPS_SUCCESS } from './ChirpsActionTypes'


const apiURL = 'chirper.hopto.org:3000';


// makes an api call that gets all chirps
export const GetAllChirps = () => async (dispatch: Dispatch<ChirpsDispatchTypes>) => {
    try {
        dispatch({
            type: CHIRPS_LOADING
        })

        const res = await axios.get('http://' + apiURL + '/chirp/all');
        
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


// makes an api call that gets a chirp
export const GetChirp = (timestamp: string) => async (dispatch: Dispatch<ChirpsDispatchTypes>) => {
    try {
        dispatch({
            type: CHIRPS_LOADING
        })

        const res = await axios.get(`http://chirper.hopto.org:3000/chirp/${timestamp}`)
        dispatch({
            type: CHIRPS_SUCCESS,
            payload: res.data
        });
    } catch (e){
        dispatch({
            type: CHIRPS_FAIL
        })
    }
}

// makes an api call that posts a chirp
export const PostChirp = (chirp: {}) => async(dispatch: Dispatch<ChirpsDispatchTypes>) => {
    console.log(chirp);
    try {
        dispatch({
            type: CHIRPS_LOADING
        })

        await axios.post(`http://chirper.hopto.org:3000/chirp`, chirp).then(function (res) {
            dispatch({
                type: CHIRPS_SUCCESS,
                payload: res.data
            });
            console.log(res);
          }).catch(function (error) {
            console.log(error);
          });
          
        
    } catch (e){
        dispatch({
            type: CHIRPS_FAIL
        })
    }
}
