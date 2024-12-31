import { ADD_CONTACT, CLEAR_STATE, EDIT_CONTACT } from '../types';

/**
 * The initial state object for the Redux store.
 * @type {InitialState}
 *
 * @typedef {Object} InitialState
 * @property {Contact[]} list
 *
 * @typedef {Object} Contact
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {phone} phone
 * @property {string} organization
 * @property {Address} organizationAddress
 *
 * @typedef {Object} Address
 * @property {string} street1
 * @property {string?} street2
 * @property {string} city
 * @property {string?} state
 * @property {string} zip
 * @property {string} country
 */
const initialState = {
  list: [
    {
      id: 1,
      name: 'Charlie K.',
      email: 'charlie.k@example.com',
      phone: '(800) 555-0101',
      organization: 'Enterprise Example Organization',
      organizationAddress: {
        street1: '1800 Amphibious Blvd.',
        street2: null,
        city: 'Mountain View',
        state: 'California',
        zip: '94045',
        country: 'United States of America',
      },
    },
    {
      id: 2,
      name: 'Kim A.',
      email: 'kim.a@example.com',
      phone: '(800) 555-0102',
      organization: 'Enterprise Example Organization',
      organizationAddress: {
        street1: '1800 Amphibious Blvd.',
        street2: null,
        city: 'Mountain View',
        state: 'California',
        zip: '94045',
        country: 'United States of America',
      },
    },
    {
      id: 3,
      name: 'Yuri L.',
      email: 'yuri.n@example.com',
      phone: '(800) 555-0103',
      organization: 'Startup Example Organization',
      organizationAddress: {
        street1: 'Avenida da Pastelaria, 1903',
        street2: null,
        city: 'Lisbon',
        state: null,
        zip: '1229-076',
        country: 'Portugal',
      },
    },
  ],
};

export const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT: {
      const maxId = Math.max(...state.list.map(c => c.id)) ?? 1;
      const id = maxId + 1;
      return {
        ...state,
        list: [{ ...payload.data, id }, ...state.list],
      };
    }

    case EDIT_CONTACT: {
      return {
        ...state,
        list: state.list.map(c => (c.id === payload.contactId ? { ...c, ...payload.data } : c)),
      };
    }

    case CLEAR_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
