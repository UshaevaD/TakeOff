import axios from 'axios';
import * as actions from './contactActionCreators';
import { Dispatch } from 'react';
import { ContactAction, IContact } from './contactTypes';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000'

export const fetchContacts = (query: string = '') => {
    return async (dispatch: Dispatch<ContactAction>) => {
      try {
        dispatch(actions.fetchContactsRequest())

        const searchQuery = query.length ? `?q=${query}` : ``
        const response = await axios.get(`${API_URL}/contacts${searchQuery}`)

        dispatch (actions.fetchContactsSuccess(response.data))
  
      } catch(err: any) {
        dispatch(actions.fetchContactsFailure(err.response.data))
        toast.error('Error getting list.')
      }
    }
}

export const addContactAction = (contact: IContact) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            const response = await axios.post(`${API_URL}/contacts`, {})

            if (response.data?.id) {
                dispatch(actions.addContact(response.data))
                toast.success('Success to Add contact.')
            } else {
                toast.error('Failed to Add contact.')
            }
        } catch(err: any) {
            toast.error('Failed to Add contact.')
        }
    }
}

export const deleteContactAction = (contact: IContact) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            await axios.delete(`${API_URL}/contacts/${contact.id}`)

            dispatch (actions.deleteContact(contact))
            toast.success('Success to Delete contact.')
        } catch(err: any) {
            toast.error('Failed to Delete contact.')
        }
    }
}

export const updateContactAction = (contact: IContact) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        dispatch (actions.updateContact(contact))

        try {
            const response = await axios.put(`${API_URL}/contacts/${contact.id}`, { ...contact})

            if (response.data?.id) {
                dispatch (actions.updateContact(contact))
                toast.success('Success to Update contact.')
            } else {
                toast.error('Failed to Update contact.')
            }
        } catch(err: any) {
            toast.error('Failed to Update contact.')
        }
    }
}