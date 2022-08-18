import React, { useEffect } from 'react';
import s from './form.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { shallowEqual, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearIsRegistered, registerUser } from '../../store/authReducer/authActions';
import { RootState } from '../../store/store';

import Button from '../common/Button';
import { Input } from '../common/Input';

export type FormValues = {
    password: string
    email: string
}

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isRegister = useSelector<RootState, boolean>(state => state.auth.isRegister, shallowEqual)
    const {control, handleSubmit, formState: { errors }} = useForm<FormValues>({ mode: "onBlur" })

    useEffect(() => {
        if (isRegister) {
            goToLogin()
        }
    }, [isRegister])

    const registerFormSubmit: SubmitHandler<FormValues> = (registerData) => {
        dispatch(registerUser(registerData))
    }

    const goToLogin = () => {
        dispatch(clearIsRegistered())
        navigate('/login')
    }

    return (
        <div className={s.container}>
            <form onSubmit={handleSubmit(registerFormSubmit)} className={s.form}>
                <h1 className={s.title}>Sign Up</h1>

                <Input 
                    control={control} 
                    name="email" 
                    label="E-mail"
                    className={s.formInput}
                    rules={{ 
                        required: "This field is required",
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                            message: "Invalid E-mail address"
                        }
                    }} 
                    error={errors} 
                />
                <Input 
                    control={control} 
                    name="password" 
                    label="Password"
                    className={s.formInput}
                    type="password"
                    rules={{ 
                        required: "This field is required",
                    }} 
                    error={errors} 
                />

                <Button classNameBtn={s.formSubmitButton} text="Sign Up" />
                <a onClick={goToLogin} className={s.registerLink}>Account already exist? Click to Sign In</a>
            </form>
        </div>
    )
}

export default RegisterForm
