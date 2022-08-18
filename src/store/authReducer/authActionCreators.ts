import { AuthAction, IUser } from "./authTypes";
import { ActionTypes } from "./authActionTypes";

export const requestLogin = ():AuthAction => ({
    type: ActionTypes.LOGIN_REQUEST
})
export const successLogin = (user: IUser, token: string):AuthAction => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user,
    token
})
export const loginError = ():AuthAction => ({
    type: ActionTypes.LOGIN_FAILURE
})

export const clearUserAuthData = ():AuthAction => ({
    type: ActionTypes.SIGNOUT_SUCCESS
})

export const setToken = (token: string):AuthAction => ({
    type: ActionTypes.SET_TOKEN,
    token
})

export const requestRegister = ():AuthAction => ({
    type: ActionTypes.REGISTER_REQUEST
})

export const successRegister = ():AuthAction => ({
    type: ActionTypes.REGISTER_SUCCESS
})
  
export const errorRegister = ():AuthAction => ({
    type: ActionTypes.REGISTER_FAILURE
})

export const setIsRegistered = (isRegistered: boolean):AuthAction => ({
    type: ActionTypes.SET_IS_REGISTERED,
    isRegistered
})