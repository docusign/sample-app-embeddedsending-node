import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth.reducer';
import { loginPopupReducer } from './loginPopup.reducer';
import { envelopesReducer } from './envelopes.reducer';
import { templatesReducer } from './templates.reducer';
import { contactsReducer } from './contacts.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  loginPopup: loginPopupReducer,
  envelopes: envelopesReducer,
  templates: templatesReducer,
  contacts: contactsReducer,
});

export const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['loginPopup'],
};
