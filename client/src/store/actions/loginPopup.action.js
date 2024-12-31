import {
  CLOSE_LOGIN_POPUP,
  LOADED_LOGIN_POPUP,
  LOADING_LOGIN_POPUP,
  OPEN_LOGIN_POPUP,
  SET_ERROR_LOGIN_POPUP,
  CLEAR_ERROR_LOGIN_POPUP,
} from '../types';

export const openPopupWindow = () => ({
  type: OPEN_LOGIN_POPUP,
});

export const closePopupWindow = () => ({
  type: CLOSE_LOGIN_POPUP,
});

export const openLoadingCircleInPopup = () => ({
  type: LOADING_LOGIN_POPUP,
});

export const closeLoadingCircleInPopup = () => ({
  type: LOADED_LOGIN_POPUP,
});

export const showErrorTextInPopup = errorMessage => ({
  type: SET_ERROR_LOGIN_POPUP,
  payload: {
    errorMessage,
  },
});

export const clearErrorTextInPopup = () => ({
  type: CLEAR_ERROR_LOGIN_POPUP,
});
