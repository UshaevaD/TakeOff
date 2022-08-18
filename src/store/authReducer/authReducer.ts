import { AuthAction, IAuthState } from './authTypes';
import { ActionTypes } from './authActionTypes';

const initialState: IAuthState = {
    user: null,
    isAuth: false,
    isRegister: false,
    isFetching: false,
    token: '',
}

export default function authReducer(
    state: IAuthState = initialState, 
    action: AuthAction
): IAuthState  {
    switch(action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                isAuth: false
            }
        
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuth: true,
                token: action.token,
                user: action.payload
            }
            
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuth: false
            }

        case ActionTypes.SET_TOKEN:
            return {
                ...state,
                isFetching: false,
                isAuth: true,
                token: action.token
            }
            
        case ActionTypes.SIGNOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuth: false,
                token: ''
            }

        case ActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isRegister: false,
            }
        
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isRegister: true,
            }

        case ActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isRegister: false
            }

        case ActionTypes.SET_IS_REGISTERED:
            return {
                ...state,
                isRegister: action.isRegistered,
            }

        default: 
            return state;
    }
}
