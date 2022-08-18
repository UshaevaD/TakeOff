import s from "./styles/button.module.css"
import { ButtonType } from "../../store/types"

import Icon from "./Icon"

type ButtonProps = {
    type?: ButtonType.Submit | ButtonType.Button
    text?: string
    classNameBtn?: string
    classNameIcon?: string
    icon?: string
    iconSize?: number
    handler?: () => void
}

const Button: React.FC<ButtonProps> = ({ 
    handler, 
    text, 
    classNameBtn, 
    iconSize, 
    icon = null, 
    type = ButtonType.Submit, 
    classNameIcon = ''
}) => {
    return (
        <button className={`${s.button} ${classNameBtn} ${classNameIcon}`} onClick={handler} type={type}>
            {icon && <Icon icon={icon} size={iconSize} className={classNameIcon}/>}
            {text}
        </button>
    )
}

export default Button