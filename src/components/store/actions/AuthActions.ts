import { ThunkAction } from 'redux-thunk';
import { RootStore } from '../store';
import {
  SignInData,
  SignUpData,
  AuthAction,
  SET_ERROR,
  SET_LOADING,
  SET_SUCCESS,
  SET_USER,
  SIGN_OUT,
  User
} from './UserActionTypes';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

//Sign in User
export const signIn = (
  data: SignInData,
  onError: () => void
): ThunkAction<void, RootStore, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res: CognitoUser = await Auth.signIn(data.username, data.password);
      if (res) {
        const userData: User = {
          username: res.getUsername(),
          password: data.password
        };
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
      console.log('LOOK: ', res);
    } catch (err) {
      onError();
      dispatch(setError(err.message));
      console.log(err);
    }
  };
};

export const signup = (
  data: SignUpData,
  onError: () => void
): ThunkAction<void, RootStore, null, AuthAction> => {
  return async (dispatch) => {
    try {
      const res = await Auth.signUp(data.username, data.password);
      if (res.user) {
        const userData: User = {
          username: data.username,
          password: data.password
        };
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
      // console.log(user);
    } catch (err) {
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    }
  };
};

export const setError = (
  msg: string
): ThunkAction<void, RootStore, null, AuthAction> => {
  return (dispatch) => {
    dispatch({ type: SET_ERROR, payload: msg });
  };
};

export const setSuccess = (
  msg: string
): ThunkAction<void, RootStore, null, AuthAction> => {
  return (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: msg });
  };
};

export const setLoading = (
  value: boolean
): ThunkAction<void, RootStore, null, AuthAction> => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: value });
  };
};
