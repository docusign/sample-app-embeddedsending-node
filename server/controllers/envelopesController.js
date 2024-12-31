/**
 * @file
 * This file handles the Envelopes scenarios.
 */

const EnvelopesService = require('../services/envelopesService');
const ErrorHandler = require('../utils/errorHandler');
const { setBaseArgs } = require('../utils/requestUtils');
const createPrefixedLogger = require('../utils/logger');
const { ALLOWED_FOR_EDIT_ENVELOPE_STATUSES } = require('../constants');

class EnvelopesController {
  static logger = createPrefixedLogger(EnvelopesController.name);
  static errorHandler = new ErrorHandler(this.logger);

  /**
   * Retrieves envelopes based on provided envelope IDs.
   */
  static getEnvelopes = async (req, res) => {
    try {
      const { body } = req;
      const envelopeResponse = await EnvelopesService.getEnvelopes({
        ...setBaseArgs(req),
        envelopeIds: body.envelopeIds,
      });
      res.json({ envelopes: envelopeResponse });
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };

  /**
   * Returns a URL for editing an envelope if its status allows it.
   */
  static editEnvelope = async (req, res) => {
    try {
      const { body } = req;
      const args = {
        ...setBaseArgs(req),
        envelopeId: req.params.envelopeId,
        returnUrl: body.returnUrl,
      };
      const envelope = await EnvelopesService.getEnvelope(args, args.envelopeId);

      if (ALLOWED_FOR_EDIT_ENVELOPE_STATUSES.includes(envelope.status)) {
        const editUrl = await EnvelopesService.editEnvelope(args);
        res.json(editUrl);
      } else {
        res.status(409).json({
          message: `Envelope can't be edited since it is in status ${envelope.status}`,
        });
      }
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };
}

module.exports = EnvelopesController;
