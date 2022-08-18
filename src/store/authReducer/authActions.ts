import axios from 'axios';
import * as actions from './authActionCreators';
import { Dispatch } from 'react';
import { AuthAction, IUser } from './authTypes';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000'

export const loginUser = (user: IUser) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch(actions.requestLogin())

      const response = await axios.post(`${API_URL}/login`, { ...user})
      
      localStorage.setItem('auth_token', response.data.accessToken)
      dispatch (actions.successLogin(response.data.user, response.data.accessToken))
    } catch(error: any) {
      dispatch(actions.loginError())
      toast.error(error.response.data)
    }
  }
}

export const setAuthToken = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    const token = localStorage.getItem('auth_token')

    if (token) {
      dispatch (actions.setToken(token))
    }
  }
}

export const signoutUser = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    localStorage.removeItem('auth_token')

    dispatch (actions.clearUserAuthData())
  }
}

export const registerUser = (user: IUser) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch(actions.requestRegister())

      const response = await axios.post(`${API_URL}/register`, { email: user.email, password: user.password })
      dispatch (actions.successRegister())
      toast.success('Registration was successful')
    } catch(error: any) {
      toast.error(error.response.data)
      dispatch (actions.errorRegister())
    }
  }
}

export const clearIsRegistered = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch (actions.setIsRegistered(false))
  }
}