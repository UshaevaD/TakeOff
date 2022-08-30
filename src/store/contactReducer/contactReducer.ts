import { ContactAction, IContact, IContactState } from './contactTypes';
import { ContactActionTypes } from './contactActionTypes';

const initialState: IContactState = {
    isFetching: false,
    contacts: [],
    totalCount: 0,
    perPage: 3,
    current: 1,
    countPages: 5
}

export default function contactsReducer(
    state: IContactState = initialState, 
    action: ContactAction
): IContactState  {
    switch(action.type) {
        case ContactActionTypes.FETCH_CONTACT_REQUEST:
            return { 
                ...state, 
                isFetching: true 
            }

        case ContactActionTypes.FETCH_CONTACT_SUCCESS:
            return { 
                ...state, 
                isFetching: false,
                contacts: action.contacts
            }

        case ContactActionTypes.FETCH_CONTACT_FAILURE:
            return { 
                ...state, 
                isFetching: false
            }

        case ContactActionTypes.CONTACT_ADD: 
            const newContact: IContact = { ...action.contact, id: ++state.contacts.length}
            return {
                ...state,
                contacts: state.contacts.concat(newContact),
            }
        
        case ContactActionTypes.CONTACT_UPDATE: 
            return { 
                ...state, 
                contacts: state.contacts.map((contact) => contact.id === action.contact.id ? {
                    ...contact, ...action.contact
                }: contact)
            };

        case ContactActionTypes.CONTACT_DELETE:
            const updatedContacts: Array<IContact> = state.contacts.filter(
                contact => action.contact.id !== contact.id
            )
            return {
                ...state,
                contacts: updatedContacts
            }

        case ContactActionTypes.SET_TOTAL_PAGE:
            return {
                ...state,
                totalCount: action.total
            }
        
        case ContactActionTypes.SET_CURRENT_PAGE:
            return {
                ...state,
                current: action.page
            }

        default: 
            return state;
    }
}

