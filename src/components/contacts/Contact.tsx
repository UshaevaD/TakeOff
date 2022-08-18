import { FC } from 'react';
import s from './styles/contact.module.css'; 
import { IContact } from '../../store/contactReducer/contactTypes';
import Icon from '../common/Icon';

type ContactProps = {
    contact: IContact
    deleteContact: (contact: IContact) => void
    showForm: () => void
    selectContact: (contact: IContact) => void
}

const Contact: FC<ContactProps> = ({ 
    contact, 
    deleteContact, 
    showForm, 
    selectContact 
}) => {
    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete this contact?`)) {
            deleteContact(contact)
        }
    }

    const handleEditClick = () => {
        showForm()
        selectContact(contact)
    }

    return (
        <div className={s.contactContainer}>
            <div className={s.infoContainer}>
                <div>
                    <div className={s.name}>{contact.name}</div>
                    <div className={s.email}>
                        <Icon icon="envelop" size={20} className={s.labelIcon} />
                        {contact.email}
                    </div>
                    <div className={s.phone}>
                        <Icon icon="phone" size={20} className={s.labelIcon} />
                        {contact.phone}
                    </div>
                </div>
            </div>

            <div className={s.buttonContainer}>
                <Icon icon="pencil" size={25} className={s.buttonIcon} onClick={handleEditClick} />
                <Icon icon="cross" size={25} className={s.buttonIcon} onClick={handleDeleteClick} />
            </div>
        </div>
    )
}

export default Contact
