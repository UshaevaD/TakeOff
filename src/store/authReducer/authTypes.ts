import { ActionTypes } from "./authActionTypes";

export interface IUser {
  email: string
  password: string
}

export interface IAuthState {
  user: IUser | null
  isAuth: boolean
  token: string
  isFetching: boolean
  isRegister: boolean
}

export type AuthAction =
  | { type: ActionTypes.LOGIN_REQUEST }
  | { type: ActionTypes.LOGIN_SUCCESS, payload: IUser, token: string }
  | { type: ActionTypes.LOGIN_FAILURE }
  | { type: ActionTypes.SET_TOKEN, token: string }
  | { type: ActionTypes.SIGNOUT_SUCCESS }
  | { type: ActionTypes.REGISTER_REQUEST }
  | { type: ActionTypes.REGISTER_SUCCESS }
  | { type: ActionTypes.REGISTER_FAILURE }
  | { type: ActionTypes.SET_IS_REGISTERED, isRegistered: boolean }