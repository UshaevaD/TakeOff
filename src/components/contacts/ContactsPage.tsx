import s from './styles/contacts.module.css';
import { useSelector, shallowEqual } from 'react-redux';
import { addContactAction, deleteContactAction, updateContactAction, fetchContacts } from '../../store/contactReducer/contactActions';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ButtonType } from '../../store/types'; 
import { IContact } from '../../store/contactReducer/contactTypes'; 
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import ModalPopup from '../common/ModalPopup';
import Header from '../header/Header';
import ContactForm from './ContactForm';
import Contact from './Contact';
import SearchForm from '../common/SearchForm';
import Button from '../common/Button';
import EmptyList from '../common/Empty';
import { Pagination } from '../common/Pagination';

const ContactsPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth, shallowEqual) 
    const isFetching = useSelector<RootState, boolean>(state => state.contacts.isFetching, shallowEqual) 
    const contacts = useSelector<RootState, IContact[]>(state => state.contacts.contacts, shallowEqual)

    const current = useSelector<RootState, number>(state => state.contacts.current, shallowEqual) 
    const perPage = useSelector<RootState, number>(state => state.contacts.perPage, shallowEqual)
    const totalCount = useSelector<RootState, number>(state => state.contacts.totalCount, shallowEqual)
    const countPages = useSelector<RootState, number>(state => state.contacts.countPages, shallowEqual)

    const [selectedContact, setSelectedContact] = useState<IContact | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }

        if (!contacts.length && !isFetching) {
            dispatch(fetchContacts(current, perPage))
        } 
    }, [])

    const updateSelectedContact = (contact: IContact | null) => {
        setSelectedContact(contact ? {...contact} : null)
    }

    const openForm = () => {
        setSelectedContact(null)
        setIsOpen(true)
    }

    const searchContact = (query: string) => {
        fetchContact(1, perPage, query)
    }

    const fetchContact = useCallback((page: number, limit: number, query?: string) => dispatch(fetchContacts(page, limit, query)), [dispatch])
    const addContact = useCallback((contact: IContact) => dispatch(addContactAction(contact)), [dispatch])
    const updateContact = useCallback((contact: IContact) => dispatch(updateContactAction(contact)), [dispatch])
    const deleteContact = useCallback((contact: IContact) => dispatch(deleteContactAction(contact)), [dispatch])

    return (
        <section className={s.sectionContainer}>
            <Header />

            <div className={s.sectionBody}>
                <Pagination 
                    totalCount={totalCount} 
                    perPage={perPage} 
                    current={current}
                    countPages={countPages} 
                    onChangePage={fetchContact}
                />

                <div className={`${s.sectionBodySidebar} ${!contacts.length && s.sectionSidebarEmpty}`}>
                    <Button 
                        type={ButtonType.Button}
                        icon="plus"
                        iconSize={25}
                        handler={openForm}
                        classNameBtn={s.addBtnIcon}
                    />
                    <SearchForm 
                        fetchContact={searchContact}
                        isResult={!!contacts.length}
                        delay={400}
                    />
                </div>

                <div className={`${s.sectionBodyContent} ${!contacts.length && s.sectionBodyEmpty}`}>
                    <ModalPopup 
                        showModal={isOpen} 
                        handleClose={() => setIsOpen(false)} 
                        title={(selectedContact) ? "Edit Contact" : "Add new contact"}
                    >
                        <ContactForm 
                            selectedContact = {selectedContact}
                            addContact = {addContact}
                            closeForm = {() => setIsOpen(false)} 
                            updateContact = {updateContact}
                        />
                    </ModalPopup>

                    {(contacts.length)  
                        ? (<>
                            {
                                contacts.map((contact: IContact) => 
                                    <Contact 
                                        key={contact.id} 
                                        contact={contact} 
                                        deleteContact={deleteContact}
                                        showForm={() => setIsOpen(true)}
                                        selectContact={updateSelectedContact}
                                    />
                                )
                            }
                        </>)
                        : ( <EmptyList className={s.emptyList} text="No contacts"/> )
                    }
                </div>
            </div>
        </section>
    )
}

export default ContactsPage