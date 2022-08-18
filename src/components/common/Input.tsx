import s from './styles/input.module.css';
import { useState } from "react";
import { 
    DeepMap, 
    FieldError, 
    FieldValues, 
    get, 
    useController, 
    UseControllerProps 
} from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import Icon from "./Icon"


interface Props<T> extends UseControllerProps<T> {
    className?: string
    label?: string
    type?: string
    placeholder?: string
    error?: Partial<DeepMap<FieldValues, FieldError>>
    onInput?: () => void
}

export const Input = <T extends FieldValues>(props: Props<T>) => {
    const {field} = useController(props)
    const [showPassowrd, setShowPassword] = useState(false)
    const [type, setType] = useState(props?.type || "text")
    const errorMessages = get(props.error, props.name)
    const hasError = !!(props.error && errorMessages)

    const togglePasswordVisiblity = () => {
        setShowPassword(showPassowrd ? false : true)
        setType(type === "text" ? "password" : "text")
    }
 
    return (
      <div className={`${props.className}`}>
        {props?.label && <label className={s.label}>{props.label}</label>}

        <div className={s.inputWrapper}>
            <input 
                {...field} 
                placeholder={props.placeholder} 
                className={`${s.input} ${(hasError) ? s.error : ""}`} 
                type={type}
                value={field.value || ''}
                onInput={props.onInput}
            />
            {props.type === "password" &&
                <>
                    {(type === "text") 
                        ? <Icon icon="eye-blocked" size={25} className={s.inputIcon} onClick={togglePasswordVisiblity}/>
                        : <Icon icon="eye" size={25} className={s.inputIcon} onClick={togglePasswordVisiblity}/>
                    }
                </>
            }
        </div>
        {props.error && 
            <ErrorMessage
                errors={props.error}
                name={props.name}
                render={({ message }) => (
                    <p className={s.errorMessage} >{message}</p>
                )}
            />
        }
      </div>
    )
  }