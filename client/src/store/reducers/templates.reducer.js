import { CLEAR_STATE, TEMPLATES_LOADED } from '../types';

/**
 * The initial state object for the Redux store.
 * @type {InitialState}
 *
 * @typedef {Object} InitialState
 * @property {Template[] | null} list
 *
 * @typedef {Object} Template
 * @property {string} templateId
 * @property {string} templateName
 * @property {string?} recipient
 * @property {string[] | null} placeholders
 */
const initialState = {
  list: null,
};

export const templatesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TEMPLATES_LOADED:
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
