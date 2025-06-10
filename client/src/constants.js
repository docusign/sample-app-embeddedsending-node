export const AppRoute = {
  ROOT: '/',
  DASHBOARD: '/dashboard',
  TEMPLATES: '/templates',
  CONTACTS: '/contacts',
  ADD_CONTACT: '/contacts/new',
  EDIT_CONTACT_PREFIX: '/contacts/edit',
  NAVIGATOR: '/navigator'
};

export const AppRouteFactory = {
  createEditContact: contactId => `${AppRoute.EDIT_CONTACT_PREFIX}/${contactId}`,
};

export const LoginStatus = {
  ACG: 'Authorization Code Grant',
  JWT: 'JSON Web Token',
};

export const USA_COUNTRY_NAME = 'United States of America';
