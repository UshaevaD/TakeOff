import { ContactAction, IContact } from "./contactTypes";
import { ContactActionTypes } from "./contactActionTypes";

export const fetchContactsRequest = (): ContactAction => ({
    type: ContactActionTypes.FETCH_CONTACT_REQUEST
})

export const fetchContactsSuccess = (contacts: IContact[]): ContactAction => ({
    type: ContactActionTypes.FETCH_CONTACT_SUCCESS,
    contacts
})

export const fetchContactsFailure = (): ContactAction => ({
    type: ContactActionTypes.FETCH_CONTACT_FAILURE
})

export const addContact = (contact: IContact): ContactAction => ({
    type: ContactActionTypes.CONTACT_ADD,
    contact
})

export const deleteContact = (contact: IContact): ContactAction => ({
    type: ContactActionTypes.CONTACT_DELETE,
    contact
})

export const updateContact = (contact: IContact): ContactAction => ({
    type: ContactActionTypes.CONTACT_UPDATE,
    contact
})

export const setTotalCountPage = (total: number): ContactAction => ({
    type: ContactActionTypes.SET_TOTAL_PAGE,
    total
})

export const setCurrentPage = (page: number): ContactAction => ({
    type: ContactActionTypes.SET_CURRENT_PAGE,
    page
})