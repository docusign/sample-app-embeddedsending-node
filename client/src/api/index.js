import axios from 'axios';
import { persistor, store } from '../store/store';
import { clearAllState } from '../store/actions';

const isDev = process.env.NODE_ENV === 'development';
const apiUrl = isDev ? process.env.BACKEND_DEV_HOST : process.env.BACKEND_PROD_HOST;

const clearState = async () => {
  store.dispatch(clearAllState());
  await persistor.purge();
  localStorage.clear();
};

const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

instance.interceptors.response.use(
  response => response,
  async err => {
    if (err?.response?.status === 401) {
      await clearState();
    }
    throw err;
  }
);

export const api = Object.freeze({
  jwt: {
    // Login by JSON Web Token
    login: async () => {
      const response = await instance.get('/auth/jwt/login');
      // If user has never logged in before, redirect to consent screen
      if (response.status === 210) {
        window.location = response.data;
        return;
      }

      return response;
    },
    logout: async () => {
      await instance.get('/auth/jwt/logout');
      await clearState();
    },
    loginStatus: async () => {
      const response = await instance.get('/auth/jwt/login-status');
      return JSON.parse(response.data); // response boolean
    },
  },
  acg: {
    // Login by Authorization Code Grant
    login: () => {
      // Avoid here XHR requests because we encounter problems with CORS for ACG Authorization
      window.location.href = `${apiUrl}/auth/passport/login`;
    },
    logout: async () => {
      await instance.get('/auth/passport/logout');
      await clearState();
    },
    callbackExecute: async code => {
      const response = await instance.get(`/auth/passport/callback?code=${code}`);
      return response;
    },
    loginStatus: async () => {
      const response = await instance.get('/auth/passport/login-status');
      return JSON.parse(response.data); // response boolean
    },
  },
  envelopes: {
    getEnvelopes: envelopeIds => instance.post('/envelopes/list', { envelopeIds }),
    editEnvelope: ({ envelopeId, returnUrl }) => instance.post(`/envelopes/${envelopeId}/edit`, { returnUrl }),
  },
  templates: {
    getTemplates: templateIds => instance.post('/templates/list', { templateIds }),
    createDefaultTemplates: () => instance.post('/templates/create'),
    editTemplate: ({ templateId, returnUrl }) => instance.post(`/templates/${templateId}/edit`, { returnUrl }),
  },
  contacts: {
    send: data => instance.post('/contacts/send', data),
  },
});
