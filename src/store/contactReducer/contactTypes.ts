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

export type ContactState = {
  isFetching: boolean
  contacts: Array<IContact>
}

export type FetchContactRequestAction = {
  type: ContactActionTypes.FETCH_CONTACT_REQUEST
}

export type FetchContactSuccessAction = {
  type: ContactActionTypes.FETCH_CONTACT_SUCCESS
  contacts: IContact[]
}

export type FetchContactFailureAction = {
  type: ContactActionTypes.FETCH_CONTACT_FAILURE
}

export type ContactAddAction = {
  type: ContactActionTypes.CONTACT_ADD
  contact: IContact
}

export type ContactUpdateAction = {
  type: ContactActionTypes.CONTACT_UPDATE
  contact: IContact
}

export type ContactDeleteAction = {
  type: ContactActionTypes.CONTACT_DELETE
  contact: IContact
}

export type ContactSetTotalAction = {
  type: ContactActionTypes.SET_TOTAL_PAGE
  total: number
}

export type ContactSetCurrentPageAction = {
  type: ContactActionTypes.SET_CURRENT_PAGE
  page: number
}

export type ContactAction =
  | FetchContactRequestAction | FetchContactSuccessAction | FetchContactFailureAction
  | ContactAddAction | ContactUpdateAction | ContactDeleteAction | ContactSetTotalAction | ContactSetCurrentPageAction