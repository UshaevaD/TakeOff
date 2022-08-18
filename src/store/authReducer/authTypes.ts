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

export type AuthRequestAction = {
  type: ActionTypes.LOGIN_REQUEST
}

export type AuthSuccessAction = {
  type: ActionTypes.LOGIN_SUCCESS
  payload: IUser
  token: string
}

export type AuthErrorAction = {
  type: ActionTypes.LOGIN_FAILURE
}

export type AuthSetTokenAction = {
  type: ActionTypes.SET_TOKEN
  token: string
}

export type AuthSignoutAction = {
  type: ActionTypes.SIGNOUT_SUCCESS
}

export type AuthRegisterRequestAction = {
  type: ActionTypes.REGISTER_REQUEST
}

export type AuthRegisterSuccessAction = {
  type: ActionTypes.REGISTER_SUCCESS
}

export type AuthRegisterErrorAction = {
  type: ActionTypes.REGISTER_FAILURE
}

export type AuthSetIsRegisteredAction = {
  type: ActionTypes.SET_IS_REGISTERED
  isRegistered: boolean
}

export type AuthAction =
  | AuthRequestAction | AuthSuccessAction | AuthErrorAction
  | AuthSetTokenAction | AuthSignoutAction
  | AuthRegisterRequestAction | AuthRegisterSuccessAction | AuthRegisterErrorAction | AuthSetIsRegisteredAction