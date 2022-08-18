import s from './header.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signoutUser } from '../../store/authReducer/authActions';

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const signOutUser = () => dispatch(signoutUser())

    return (
        <header className={s.header}>
            <div className={s.headerContainer}>
                <Link className={s.headerMainLink} to="/contacts">Contacts</Link>
                <Link onClick={signOutUser} to="/">Sing Out</Link>
            </div>
        </header>
    )
} 

export default Header