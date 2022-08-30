import axios, { AxiosError } from 'axios';
import * as actions from './contactActionCreators';
import { Dispatch } from 'react';
import { ContactAction, IContact } from './contactTypes';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3001'

export const fetchContacts = (page: number, perPage: number, query: string = '') => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            dispatch(actions.fetchContactsRequest())

            const paginationParams = `?_page=${page}&_limit=${perPage}`
            const searchQuery = query.length ? `&q=${query}` : ``
            const response = await axios.get(`${API_URL}/contacts${paginationParams}${searchQuery}`)

            dispatch(actions.fetchContactsSuccess(response.data))
            dispatch(actions.setTotalCountPage(+response.headers['x-total-count']))
            dispatch(actions.setCurrentPage(page))
        } catch (error) {
            dispatch(actions.fetchContactsFailure())

            if (error instanceof AxiosError) {
                toast.error('Error getting list.')
            } else {
                console.log(error)
            }
        }
    }
}

export const addContactAction = (contact: IContact) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            const response = await axios.post(`${API_URL}/contacts`, { ...contact })

            if (response.data?.id) {
                dispatch(actions.addContact(response.data))
                toast.success('Success to Add contact.')
            } else {
                toast.error('Failed to Add contact.')
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('Failed to Add contact.')
            } else {
                console.log(error)
            }
        }
    }
}

export const deleteContactAction = (contact: IContact) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            await axios.delete(`${API_URL}/contacts/${contact.id}`)

            dispatch(actions.deleteContact(contact))
            toast.success('Success to Delete contact.')
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('Failed to Delete contact.')
            } else {
                console.log(error)
            }
        }
    }
}

export const updateContactAction = (contact: IContact) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        dispatch(actions.updateContact(contact))

        try {
            await axios.put(`${API_URL}/contacts/${contact.id}`, { email: contact.email, name: contact.name, phone: contact.phone })

            dispatch(actions.updateContact(contact))
            toast.success('Success to Update contact.')
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error('Failed to Update contact.')
            } else {
                console.log(error)
            }
        }
    }
}