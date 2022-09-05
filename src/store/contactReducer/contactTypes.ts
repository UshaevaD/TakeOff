import { ContactActionTypes } from "./contactActionTypes";

export interface IContact {
  id: number
  name: string
  email: string
  phone: string
}

export interface IContactState {
  isFetching: boolean
  contacts: Array<IContact>
  totalCount: number
  perPage: number
  current: number
  countPages: number
}

export type ContactAction =
  | { type: ContactActionTypes.FETCH_CONTACT_REQUEST }
  | { type: ContactActionTypes.FETCH_CONTACT_SUCCESS, contacts: IContact[] }
  | { type: ContactActionTypes.FETCH_CONTACT_FAILURE }
  | { type: ContactActionTypes.CONTACT_ADD, contact: IContact }
  | { type: ContactActionTypes.CONTACT_UPDATE, contact: IContact }
  | { type: ContactActionTypes.CONTACT_DELETE, contact: IContact }
  | { type: ContactActionTypes.SET_TOTAL_PAGE, total: number }
  | { type: ContactActionTypes.SET_CURRENT_PAGE, page: number }