import { ChirpsDispatchTypes, CHIRPS_FAIL, CHIRPS_LOADING, CHIRPS_SUCCESS, UserChirpsType } from "../../actions/UserChirpsActionTypes";

interface DefaultStateI{
    loading: boolean,
    chirps?: UserChirpsType
}

const defaultState: DefaultStateI = {
    loading: false
};

const UserChirpsReducer = (state: DefaultStateI = defaultState, action: ChirpsDispatchTypes): DefaultStateI => {
    switch (action.type){
        case CHIRPS_FAIL:
            return {
                loading: false,
            }
        case CHIRPS_LOADING:
            return {
                loading: true,
            }
        case CHIRPS_SUCCESS:
            return {
                loading: false,
                chirps: action.payload
            }
        default:
            return state;
    }
};

export default UserChirpsReducer;