import { 
    UserDispatchTypes, UserType, 
    USER_FAIL, USER_LOADING, USER_SUCCESS } 
    from "../../actions/UserActionTypes";

interface DefaultStateI{
    loading: boolean,
    user?: UserType
}

const defaultState: DefaultStateI = {
    loading: false
};

const userReducer = (state: DefaultStateI = defaultState, action: UserDispatchTypes): DefaultStateI => {
    switch (action.type){
        case USER_FAIL:
            return {
                loading: false,
            }
        case USER_LOADING:
            return {
                loading: true,
            }
        case USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;