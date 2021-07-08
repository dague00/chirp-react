import axios from "axios";
import { Dispatch } from "redux"; 
import { 
    UserDispatchTypes, UserAPIType, 
    USER_FAIL, USER_LOADING, USER_SUCCESS }
    from './UserActionTypes';

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

        const res = await axios.get(`http://chirper.hopto.org:3000/user/${username}`)
        dispatch({
            type: USER_SUCCESS,
            payload: res.data.bio
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
export const PostUserBio = (bio: UserAPIType) => async(dispatch: Dispatch<UserDispatchTypes>) => {
    // console.log(bio);
    try {
        dispatch({
            type: USER_LOADING
        })

        await axios.post(`http://chirper.hopto.org:3000/` + bio.username, bio)
        .then(function (res) {
            dispatch({
                type: USER_SUCCESS,
                payload: res.data
            });
            console.log(res);
          }).catch(function (error) {
            console.log(error);
          });
          
    } catch (e){
        dispatch({
            type: USER_FAIL
        })
    }
}
