/**
 * @file
 * This file handles the Contacts scenarios.
 */

const ContactsService = require('../services/contactsService');
const TemplatesService = require('../services/templatesService');
const ErrorHandler = require('../utils/errorHandler');
const { setBaseArgs } = require('../utils/requestUtils');
const createPrefixedLogger = require('../utils/logger');
const defaultContacts = require('../assets/templates/contacts.template');
const config = require('../config');

class ContactsController {
  static logger = createPrefixedLogger(ContactsController.name);
  static errorHandler = new ErrorHandler(this.logger);

  /**
   * Creates an envelope using a specific template and returns a URL for editing and confirmation.
   */
  static sendEnvelope = async (req, res) => {
    try {
      const { body } = req;
      // Get template name from the TemplatesService
      const baseArgs = setBaseArgs(req);
      const { name } = await TemplatesService.getTemplate(baseArgs, body.templateId);

      const args = {
        ...baseArgs,
        returnUrl: body.returnUrl,
        templateId: body.templateId,
        templateName: name,
        recipients: [
          body.recipient,
          // Adding sender information (current user)
          {
            roleName: 'Company',
            email: req?.user?.email || req?.session?.userEmail,
            name: req?.user?.name || req?.session?.userName,
          },
        ],
      };

      // If placeholders are provided in the body, include company details (for NDA template)
      if (body.placeholders != null) {
        args.placeholders = {
          ...body.placeholders,
          Party_1_Company_Name: config.companyName,
          Party_1_State: config.companyState,
          Party_1_Entity_Type: config.companyType,
          State_Law: config.stateLaw,
          Party_1_StreetAddress: config.streetAddress,
          State: config.state,
          Party_1_Representative_Name: config.representativeName,
        };
      }

      // Create envelope in status of "created"
      const envelopeId = await ContactsService.createEnvelopFromTemplate(args);
      // Generate URL for editing the recently created envelope
      const result = await ContactsService.createSender(args, envelopeId);

      res.json({
        url: result.url,
        envelopeId,
      });
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };

  /**
   * Returns a list of contacts based on provided IDs.
   */
  static getContacts = async (req, res) => {
    try {
      // List contacts by provided IDs
      const result = await ContactsService.listContacts({
        ...setBaseArgs(req),
        contactIds: req.query.contacts || '',
      });

      res.json(result);
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };

  /**
   * Creates a default set of contacts.
   */
  static createDefaultContacts = async (req, res) => {
    try {
      // Create contacts using the defaultContacts template and return results
      const result = await Promise.all(
        defaultContacts().map(async contact => {
          const contactDetails = await ContactsService.createContact({
            ...setBaseArgs(req),
            phone: contact.phoneNumber,
            emails: contact.emailAddress,
            contactName: contact.fullName,
            companyName: contact.companyName,
          });
          return contactDetails;
        })
      );

      res.json({ contacts: result });
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };

  /**
   * Creates a new contact.
   */
  static createContact = async (req, res) => {
    try {
      const { body } = req;
      const args = {
        ...setBaseArgs(req),
        envelopeId: req.params.envelopeId,
        phone: body.phone,
        emails: body.emails,
        contactName: body.contactName,
        companyName: body.companyName,
      };

      // Create contact based on provided body and return result
      const result = await ContactsService.createContact(args);
      res.json(result);
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };
}

module.exports = ContactsController;
