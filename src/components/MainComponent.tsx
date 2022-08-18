import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './app.css'; 
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setAuthToken } from '../store/authReducer/authActions';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../store/store';

import {ToastContainer} from 'react-toastify';
import RegisterForm from './auth/RegisterForm';
import ContactsPage from './contacts/ContactsPage';
import LoginForm from './auth/LoginForm';

const MainComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const auth_token = useSelector<RootState, string>(state => state.auth.token, shallowEqual) 

    useEffect(() => {
        dispatch(setAuthToken())
    }, [])

    useEffect(() => {
        if (!auth_token) {
            navigate('login')
        } 
    }, [auth_token])

    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/contacts" element={<ContactsPage/>} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
            </Routes>

            <ToastContainer autoClose={5000} />
        </div>
    );
}

export default MainComponent