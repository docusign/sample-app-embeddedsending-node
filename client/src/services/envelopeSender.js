import { api } from '../api';
import { AppRoute } from '../constants';
import { addEnvelopeId } from '../store/actions/envelopes.action';
import { persistor, store } from '../store/store';

export default class EnvelopeSender {
  /**
   * @param {import('../store/reducers/contacts.reducer').Contact} contact
   * @param {import('../store/reducers/templates.reducer').Template} template
   * @returns {string}
   */
  static async sendEnvelope(contact, template) {
    const returnUrl = `${window.location.origin}${AppRoute.DASHBOARD}`;

    const requestData = {
      returnUrl,
      templateId: template.templateId,
      recipient: {
        roleName: template.recipient,
        name: contact.name,
        email: contact.email,
      },
      placeholders: createDocumentPlaceholderValues(contact, template),
    };
    const sendEnvelopeResponse = await api.contacts.send(requestData);
    const { url, envelopeId } = sendEnvelopeResponse.data;
    if (!url || !envelopeId) {
      throw new Error('Unexpected envelope sending response.');
    }
    // This sample app doesn't have a DB on the server, therefore each client stores
    // their sent envelopes locally.
    // In the real app, after an envelope has been created you would want to immediately
    // save on your server which user/company/account owns it. 
    store.dispatch(addEnvelopeId(envelopeId));
    await persistor.flush();
    return url;
  }
}

/**
 * Returns placeholder values used during Document Generation to create the document.
 * 
 * @param {import('../store/reducers/contacts.reducer').Contact} contact
 * @param {import('../store/reducers/templates.reducer').Template} template
 */
function createDocumentPlaceholderValues(contact, template) {
  const neededPlaceholders = template.placeholders;
  if (!Array.isArray(neededPlaceholders)) {
    return null;
  }
  const keyValues = [];
  for (const key of neededPlaceholders) {
    const value = getPlaceholderValue(key, contact);
    if (typeof value === 'string') {
      keyValues.push([key, value]);
    }
  }

  return Object.fromEntries(keyValues);
}

/**
 * @param {string} placeholderKey
 * @param {import('../store/reducers/contacts.reducer').Contact} contact
 */
function getPlaceholderValue(placeholderKey, contact) {
  switch (placeholderKey) {
    case 'Effective_Date':
      return formatDateMMDDYYYY(new Date());
    case 'Party_2_Company_Name':
      return contact.organization;
    case 'Party_2_State':
      return contact.organizationAddress.state || contact.organizationAddress.country;
    case 'Party_2_StreetAddress': {
      const isStreet2Present = contact.organizationAddress.street2?.length > 0;
      if (isStreet2Present) {
        return `${contact.organizationAddress.street1}, ${contact.organizationAddress.street2}`;
      }
      return contact.organizationAddress.street1;
    }
    case 'Party_2_Representative_Name':
      return contact.name;
    case 'Party_2_Entity_Type':
      return 'Sole Proprietorship';
    default:
      return null;
  }
}

/**
 * @param {Date} dateObj
 */
function formatDateMMDDYYYY(dateObj) {
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString();
  return `${month}/${day}/${year}`;
}
