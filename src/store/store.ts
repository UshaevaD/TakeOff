import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import contactsReducer from './contactReducer/contactReducer';
import authReducer from './authReducer/authReducer';

let rootReducer = combineReducers({
    contacts: contactsReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch