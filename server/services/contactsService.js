/**
 * @file
 * This file handles work with DocuSign eSign contacts services.
 */

const docusignEsign = require('docusign-esign');
const createPrefixedLogger = require('../utils/logger');
const { createEnvelopeViewRequest } = require('../utils/envelopeViewSettings');
const ApiClientConfigurator = require('../utils/apiClientConfigurator');

class ContactsService {
  static logger = createPrefixedLogger(ContactsService.name);

  /**
   * Returns URL for editing envelope with ability to send it.
   * @param {{ basePath: string, accessToken: string, accountId: string, returnUrl: string }} args - The arguments for creating sender view.
   * @param {string} envelopeId - The ID of the envelope.
   * @returns {Promise<{ returnUrl: string }>} - The URL for editing the envelope.
   */
  static createSender = async (args, envelopeId) => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const envelopeApi = new docusignEsign.EnvelopesApi(ApiClientConfigurator.dsApiClient);
      const result = await envelopeApi.createSenderView(
        args.accountId,
        envelopeId,
        createEnvelopeViewRequest(args.returnUrl)
      );

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new Error('An error occurred while trying to create sender.');
    }
  };

  /**
   * Create an envelope based on a template definition.
   * @param {{ basePath: string, accessToken: string, accountId: string, templateId: string, templateName: string, recipients: string, placeholders: Array<Object.<string, any>> }} args - The arguments for creating an envelope.
   * @returns {Promise<string>} - The ID of the created envelope.
   */
  static createEnvelopFromTemplate = async args => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const envelopeApi = new docusignEsign.EnvelopesApi(ApiClientConfigurator.dsApiClient);

      const envelope = await envelopeApi.createEnvelope(args.accountId, {
        envelopeDefinition: {
          status: 'created',
          templateId: args.templateId,
          templateRoles: args.recipients,
          emailSubject: args.templateName,
        },
      });

      if (args.placeholders) {
        await this.updateDocGenFormFields(args, envelope.envelopeId);
      }

      return envelope?.envelopeId;
    } catch (error) {
      this.logger.error(error);
      throw new Error('An error occurred while creating the envelope.');
    }
  };

  /**
   * Update an envelope with placeholders.
   * @param {{ basePath: string, accessToken: string, accountId: string, placeholders: Array<Object.<string, any>> }} args - The arguments including placeholders.
   * @param {string} envelopeId - The ID of the envelope to update.
   */
  static async updateDocGenFormFields(args, envelopeId) {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const envelopeApi = new docusignEsign.EnvelopesApi(ApiClientConfigurator.dsApiClient);
      const document = await envelopeApi.getEnvelopeDocGenFormFields(args.accountId, envelopeId);

      if (document.docGenFormFields?.length > 0) {
        const docFieldData = Object.entries(args.placeholders).map(([name, value]) => ({
          name,
          value,
          required: 'true',
        }));
        // Update placeholders in envelope
        await envelopeApi.updateEnvelopeDocGenFormFields(args.accountId, envelopeId, {
          docGenFormFieldRequest: {
            docGenFormFields: [
              {
                documentId: document?.docGenFormFields[0]?.documentId,
                docGenFormFieldList: docFieldData,
              },
            ],
          },
        });
      }
    } catch (error) {
      this.logger.error('Failed to update document placeholders fields:', error);
    }
  }

  /**
   * Retrieve contacts by IDs.
   * @param {{ basePath: string, accessToken: string, accountId: string, contactIds: string[] }} args - The arguments for fetching contacts.
   * @returns {Promise<{ contacts: Array<{ email: string, name: string, company: string }> }>} - List of contacts.
   */
  static listContacts = async args => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const usersApi = new docusignEsign.UsersApi(ApiClientConfigurator.dsApiClient);

      if (!args.contactIds || args.contactIds.length === 0) {
        return { contacts: [] };
      }

      const contactsData = await Promise.all(
        JSON.parse(args.contactIds).map(async contactId => {
          const contact = await usersApi.getContactById(args.accountId, contactId);
          return this.contactToEntity(contact.contacts[0]);
        })
      );
      return { contacts: contactsData };
    } catch (error) {
      this.logger.error(error);
      throw new Error('An error occurred while listing contacts.');
    }
  };

  /**
   * Create a new contact.
   * @param {{ basePath: string, accessToken: string, accountId: string, phone: string, emails: string[], contactName: string, companyName: string }} args - The arguments for creating a contact.
   * @returns {Promise<{ email: string, name: string, company: string }>} - The created contact.
   */
  static createContact = async args => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const usersApi = new docusignEsign.UsersApi(ApiClientConfigurator.dsApiClient);

      const result = await usersApi.postContacts(args.accountId, {
        contactModRequest: {
          contactList: [
            {
              contactPhoneNumbers: [
                {
                  phoneNumber: args.phone,
                  phoneType: 'work',
                },
              ],
              emails: [args.emails],
              isOwner: true,
              name: args.contactName,
              organization: args.companyName,
            },
          ],
        },
      });
      if (result?.contacts?.[0].errorDetails) {
        return {
          message: result?.contacts?.[0].errorDetails?.message,
        };
      }

      return this.contactToEntity(result.contacts[0]);
    } catch (error) {
      this.logger.error(error);
      throw new Error('An error occurred while creating contact.');
    }
  };

  /**
   * Convert a contact to a simpler entity format.
   * @param {Object} contact - The contact data.
   * @returns {{ email: string, name: string, company: string }} - A simplified contact object.
   */
  static contactToEntity(contact) {
    return {
      email: contact?.emails?.[0],
      name: contact?.name,
      company: contact?.organization,
    };
  }
}

module.exports = ContactsService;
