import {
  OPEN_LOGIN_POPUP,
  CLOSE_LOGIN_POPUP,
  LOADING_LOGIN_POPUP,
  LOADED_LOGIN_POPUP,
  SET_ERROR_LOGIN_POPUP,
  CLEAR_ERROR_LOGIN_POPUP,
  CLEAR_STATE,
} from '../types';

/**
 * The initial state object for the Redux store.
 * @type {InitialState}
 *
 * @typedef {Object} InitialState
 * @property {boolean} isOpened - Indicates if the login popup is opened.
 * @property {boolean} isLoading - Indicates if the login popup is loading and shows the loading circle.
 * @property {string|null} errorMessage - Error message if any, otherwise null.
 */
const initialState = {
  isOpened: false,
  isLoading: false,
  errorMessage: null,
};

export const loginPopupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_LOGIN_POPUP:
      return { ...state, isOpened: true, errorMessage: null };

    case CLOSE_LOGIN_POPUP:
      return { ...state, isOpened: false };

    case LOADING_LOGIN_POPUP:
      return { ...state, isLoading: true };

    case LOADED_LOGIN_POPUP:
      return { ...state, isLoading: false };

    case SET_ERROR_LOGIN_POPUP:
      return {
        ...state,
        isOpened: true,
        errorMessage: payload.errorMessage,
      };

    case CLEAR_ERROR_LOGIN_POPUP:
      return { ...state, errorMessage: null };

    case CLEAR_STATE:
      return { ...initialState };

    default:
      return state;
  }
};
