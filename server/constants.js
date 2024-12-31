const BackendRoute = {
  AUTH: '/api/auth',
  TEMPLATE: '/api/templates',
  CONTACT: '/api/contacts',
  ENVELOPE: '/api/envelopes',
};

const AuthMethod = {
  JWT: 'jwt-auth',
  ACG: 'grand-auth',
};

const TemplateType = {
  SC: 'Sales Contract',
  SW: 'Statement of work',
  NDA: 'NDA document',
};

const ViewType = {
  TEMPLATE: 'template',
  ENVELOPE: 'envelope',
};

// https://developers.docusign.com/platform/auth/reference/scopes/
// signature - Required to call most eSignature REST API endpoints
const EMBEDDED_SENDING_SCOPES = ['signature', 'impersonation'];

const ALLOWED_FOR_EDIT_ENVELOPE_STATUSES = ['sent', 'correct'];

module.exports = {
  BackendRoute,
  AuthMethod,
  TemplateType,
  ViewType,
  EMBEDDED_SENDING_SCOPES,
  ALLOWED_FOR_EDIT_ENVELOPE_STATUSES,
};
