/**
 * @file
 * This file handles work with DocuSign eSign envelopes services.
 */

const docusignEsign = require('docusign-esign');
const ApiClientConfigurator = require('../utils/apiClientConfigurator');
const { ALLOWED_FOR_EDIT_ENVELOPE_STATUSES } = require('../constants');
const { createEnvelopeViewRequest } = require('../utils/envelopeViewSettings');
const createPrefixedLogger = require('../utils/logger');

class EnvelopesService {
  static logger = createPrefixedLogger(EnvelopesService.name);

  /**
   * Retrieve envelopes by their IDs.
   * @param {{ basePath: string, accessToken: string, accountId:string, envelopeIds: string[] }} args - The arguments for retrieving envelopes.
   * @returns {Promise<Array<{envelopeId: string, envelopeName: string, envelopeContacts: string, envelopeStatus: string, envelopeDate: Date, allowEdit: boolean}>>} - A list of envelopes with details.
   */
  static getEnvelopes = async args => {
    try {
      const results = await Promise.all(
        args.envelopeIds.map(async env => {
          const envelope = await this.getEnvelope(args, env);
          const contacts = await this.getEnvelopeContacts(args, env);
          return {
            envelopeId: envelope.envelopeId,
            envelopeName: envelope.emailSubject,
            envelopeContacts: contacts.signers.map(signer => signer.name).join(', '),
            envelopeStatus: envelope.status,
            envelopeDate: envelope.lastModifiedDateTime,
            allowEdit: ALLOWED_FOR_EDIT_ENVELOPE_STATUSES.includes(envelope.status),
          };
        })
      );

      return results;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error fetching envelopes: ${error.message}`);
    }
  };

  /**
   * Edit an existing envelope.
   * @param {{ basePath: string, accessToken: string, accountId: string, envelopeId: string, returnUrl: string }} args - The arguments for editing an envelope.
   * @returns {Promise<{ returnUrl: string }>} - The URL for editing the envelope.
   */
  static editEnvelope = async args => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const envelopesApi = new docusignEsign.EnvelopesApi(ApiClientConfigurator.dsApiClient);

      const result = await envelopesApi.createCorrectView(
        args.accountId,
        args.envelopeId,
        createEnvelopeViewRequest(args.returnUrl, false)
      );

      return result;
    } catch (error) {
      this.logger.error(error);
      return {
        message: error.message || 'An error occurred while trying to edit the envelope.',
      };
    }
  };

  /**
   * Retrieve a specific envelope by its ID.
   * @param {{ basePath: string, accessToken: string, accountId: string }} args - The arguments for retrieving an envelope.
   * @param {string} envelopeId - The ID of the envelope to retrieve.
   * @returns {Promise<Envelope>} - The details of the requested envelope.
   */
  static getEnvelope = async (args, envelopeId) => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const envelopesApi = new docusignEsign.EnvelopesApi(ApiClientConfigurator.dsApiClient);
      return await envelopesApi.getEnvelope(args.accountId, envelopeId);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error fetching envelope ${envelopeId}: ${error.message}`);
    }
  };

  /**
   * Get the contacts (recipients) of a specific envelope.
   * @param {{ basePath: string, accessToken: string, accountId: string }} args - The arguments for retrieving envelope contacts.
   * @param {string} envelopeId - The ID of the envelope for which to retrieve contacts.
   * @returns {Promise<Recipients>} - A list of recipients for the specified envelope.
   */
  static getEnvelopeContacts = async (args, envelopeId) => {
    try {
      ApiClientConfigurator.configureApiClient(args);
      const envelopesApi = new docusignEsign.EnvelopesApi(ApiClientConfigurator.dsApiClient);
      return await envelopesApi.listRecipients(args.accountId, envelopeId);
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error fetching envelope contacts for ${envelopeId}: ${error.message}`);
    }
  };
}

module.exports = EnvelopesService;
