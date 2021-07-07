import {
  AuthAction,
  AuthState,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_USER,
  SIGN_OUT
} from '../actions/UserActionTypes';

const initialState: AuthState = {
  user: null,
  authenticated: false,
  loading: false,
  error: '',
  success: ''
};

export default (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SIGN_OUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    default:
      return state;
  }
};
