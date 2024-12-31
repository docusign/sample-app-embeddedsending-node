import { ADD_CONTACT, EDIT_CONTACT } from '../types';

export const addContact = data => ({
  type: ADD_CONTACT,
  payload: { data },
});

export const editContact = (contactId, data) => ({
  type: EDIT_CONTACT,
  payload: { contactId, data },
});
