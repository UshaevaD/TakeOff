import s from './styles/empty.module.css';
import emptyIcon from '../../images/empty-icon.svg';

type EmptyListProps = {
    text: string
    className?: string
}

const EmptyList: React.FC<EmptyListProps> = (props) => {
    return (
        <div className={`${s.emptyContainer} ${props.className}`}>
            <img src={emptyIcon} />
            <div>
                <div className={s.emptyText}>{props.text}</div>
            </div>
        </div>
    )
}

export default EmptyList