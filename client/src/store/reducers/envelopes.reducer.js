import { ADD_ENVELOPE_ID, CLEAR_STATE, ENVELOPES_LOADED } from '../types';

/**
 * The initial state object for the Redux store.
 * @type {InitialState}
 *
 * @typedef {Object} InitialState
 * @property {string[]} ids
 * @property {Envelope[] | null} list
 * 
 * @typedef {'correct' | 'completed' | 'created' | 'declined' | 'delivered' | 'sent' | 'voided' | 'signed'} EnvelopeStatus
 *
 * @typedef {Object} Envelope
 * @property {string} envelopeId
 * @property {string} envelopeName
 * @property {string} envelopeContacts
 * @property {EnvelopeStatus} envelopeStatus
 * @property {string} envelopeDate
 * @property {boolean} allowEdit
 */
const initialState = {
  ids: [],
  list: null,
};

export const envelopesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ENVELOPE_ID:
      return {
        ...state,
        ids: [payload, ...state.ids],
      };

    case ENVELOPES_LOADED:
      return {
        ...state,
        list: payload,
      };

    case CLEAR_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
