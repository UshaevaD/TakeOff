import React from 'react';
import s from './styles/contact_form.module.css';
import { IContact } from '../../store/contactReducer/contactTypes';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../common/Input';
import Button from '../common/Button';

type FormProps = {
    selectedContact: IContact | null
    addContact: (contact: IContact) => void
    closeForm: () => void
    updateContact: (contact: IContact) => void
}

export type FormValues = {
    name: string
    email: string
    phone: string
}

const ContactForm: React.FC<FormProps> = ({
    addContact, 
    closeForm, 
    selectedContact,
    updateContact
}) => { 
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({ 
        mode: "onBlur", 
        defaultValues: { ...selectedContact }
    })

    const formSubmit:SubmitHandler<FormValues> = (data) => {
        if (selectedContact?.id) {
            updateContact({...data, id: selectedContact.id})
        } else {
            addContact({ ...data, id: 0 })
        }
        closeForm()
    }

    return (
        <div className={s.formContainer}>
            <form onSubmit={handleSubmit(formSubmit)} className={s.formContent}>
                <div>
                    <Input 
                        control={control} 
                        name="name" 
                        label="Name"
                        className={s.formInput}
                        rules={{ required: "This field is required" }} 
                        error={errors} 
                    />
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
                        name="phone" 
                        label="Phone"
                        className={s.formInput}
                        rules={{ required: "This field is required" }} 
                        error={errors} 
                    />
                </div>

                <Button text="Save" classNameBtn={s.formButton} />
            </form>
        </div>
    )
}

export default ContactForm