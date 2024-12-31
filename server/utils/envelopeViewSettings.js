// utils/envelopeViewSettings.js
const { ViewType } = require('../constants');

const envelopeViewRequestSettings = editRecipient => ({
  startingScreen: 'Tagger',
  sendButtonAction: 'send',
  showBackButton: 'false',
  backButtonAction: 'redirect',
  showHeaderActions: 'true',
  showDiscardAction: 'false',
  showAdvancedOptions: 'false',
  recipientSettings: {
    showEditRecipients: `${editRecipient}`,
    showEditMessage: 'true',
    showBulkSend: 'false',
    showContactsList: 'false',
  },
  documentSettings: {
    showEditDocuments: 'false',
    showEditDocumentVisibility: 'false',
    showEditPages: 'false',
    showSaveAsDocumentCustomField: 'false',
  },
  templateSettings: {
    showMatchingTemplatesPrompt: 'false',
  },
});

const createEnvelopeViewRequest = (returnUrl, editRecipient = true) => ({
  envelopeViewRequest: {
    returnUrl,
    settings: envelopeViewRequestSettings(editRecipient),
    viewAccess: ViewType.ENVELOPE,
  },
});

module.exports = { createEnvelopeViewRequest };
