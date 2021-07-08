import axios from "axios";
import { Console } from "console";
import { Dispatch } from "redux"; 
import { 
    UserDispatchTypes, UserAPIType, 
    USER_FAIL, USER_LOADING, USER_SUCCESS }
    from './UserActionTypes';

const apiURL = 'http://chirper.hopto.org:3000';
// const apiURL = 'localhost:3000';

/**
 * Makes api call for bio corresponding to username
 * 
 * @param username 
 * @returns 
 */
export const GetUserBio = (username: string) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
        dispatch({
            type: USER_LOADING
        })

        const res = await axios.get(`${apiURL}/user/${username}`)
        dispatch({
            type: USER_SUCCESS,
            payload: res.data
        });
    } catch (e){
        dispatch({
            type: USER_FAIL
        })
    }
}

/**
 * Makes api call to update User bio
 * 
 * @param chirp 
 * @returns 
 */
export const PostUserBio = (params: UserAPIType) => async(dispatch: Dispatch<UserDispatchTypes>) => {
    try {
        dispatch({
            type: USER_LOADING
        })
        
        const body = {bio: params.bio};
        await axios.put(`${apiURL}/user/${params.username}/bio`, body)
        .then(function (res) {
            dispatch({
                type: USER_SUCCESS,
                payload: res.data
            });
          }).catch(function (error) {
            console.log(error);
          });
          
    } catch (e){
        dispatch({
            type: USER_FAIL
        })
    }
}
