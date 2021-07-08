export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SET_UNAUTHENTICATED';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';

export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  success: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  password: string;
}

export interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SignOutAction {
  type: typeof SIGN_OUT;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction;

//==============================================================================
//For Users, not authentication
//==============================================================================
export const USER_LOADING = "USER_LOADING";
export const USER_FAIL = "USER_FAIL";
export const USER_SUCCESS = "USER_SUCCESS";

export interface UserAPI {
  username: string;
  password: string;
  bio: string;
  following: string[]
}

export type UserAPIType = {
  username: string;
  bio: string;
}

export type BioUpdateType = {
  bio: string;
}

export interface UserLoading {
    type: typeof USER_LOADING
}

export interface UserFail {
    type: typeof USER_FAIL
}

export interface UserSuccess {
    type: typeof USER_SUCCESS,
    payload: UserAPIType
}

export type UserDispatchTypes = UserLoading | UserFail | UserSuccess;