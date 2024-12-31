/**
 * @file
 * This file handles work with DocuSign eSign templates services.
 */

const docusignEsign = require('docusign-esign');
const templateSC = require('../assets/templates/sc.template');
const templateSW = require('../assets/templates/sw.template');
const templateNDA = require('../assets/templates/nda.template');
const ApiClientConfigurator = require('../utils/apiClientConfigurator');
const { TemplateType, ViewType } = require('../constants');
const createPrefixedLogger = require('../utils/logger');

class TemplatesService {
  static workflowSuffix = 'send invite to signer';
  static logger = createPrefixedLogger(TemplatesService.name);

  /**
   * Select the appropriate template based on the template type.
   * @param {string} templateType - The type of the template.
   * @returns {{templateCaller: Function}} - Returns the function for creating the template.
   * @throws {Error} - Throws an error if the template type is not valid.
   */
  static selectTemplate = templateType => {
    let templateCaller = null;
    switch (templateType) {
      case TemplateType.SC:
        templateCaller = templateSC;
        break;

      case TemplateType.SW:
        templateCaller = templateSW;
        break;

      case TemplateType.NDA:
        templateCaller = templateNDA;
        break;

      default:
        throw new Error('selectTemplate: TemplateType is not correct or not found');
    }

    return { templateCaller };
  };

  /**
   * Retrieve templates by IDs.
   * @param {{ basePath: string, accessToken: string, accountId: string, templateIds: string[] }} args - The arguments for retrieving templates.
   * @returns {Promise<Array<{ templateId: string, templateName: string, recipient: string, placeholders: Array<string> }>>} - A list of templates with details.
   */
  static getTemplates = async args => {
    try {
      const results = await Promise.all(
        args.templateIds.map(async templ => {
          const template = await this.getTemplate(args, templ);
          return {
            templateId: template.templateId,
            templateName: template.name,
            recipient: template.recipients?.signers[0]?.roleName,
            placeholders: template?.documents?.[0]?.docGenFormFields?.map(elem => elem?.name),
          };
        })
      );

      return results;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error fetching templates: ${error.message}`);
    }
  };

  /**
   * Create templates based on the available template types.
   * @param {{ basePath: string, accessToken: string, accountId: string }} args - The arguments for creating templates.
   * @returns {Promise<Array<{ templateId: string, templateName: string }>>} - Created templates details.
   */
  static createTemplates = async args => {
    try {
      const results = await Promise.all(
        Object.values(TemplateType).map(async element => {
          const template = await this.createDefaultTemplate({ ...args, templateType: element });
          return template;
        })
      );

      return results;
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Error creating templates: ${error.message}`);
    }
  };

  /**
   * Edit an existing template.
   * @param {{ basePath: string, accessToken: string, accountId: string, templateId: string, returnUrl: string }} args - The arguments for editing a template.
   * @returns {Promise<{ returnUrl: string }>} - The URL for editing the template.
   */
  static editTemplate = async args => {
    try {
      ApiClientConfigurator.configureApiClient(args);

      const templatesApi = new docusignEsign.TemplatesApi(ApiClientConfigurator.dsApiClient);
      const result = await templatesApi.createEditView(args.accountId, args.templateId, {
        templateViewRequest: {
          returnUrl: args.returnUrl,
          viewAccess: ViewType.TEMPLATE,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error);
      return { message: error.message || 'An error occurred while trying to edit the template.' };
    }
  };

  /**
   * Create a default template based on the template type.
   * @param {{ basePath: string, accessToken: string, accountId: string, templateType: TemplateType }} args - The arguments for creating a default template.
   * @returns {Promise<{ templateId: string, templateName: string }>} - The created template details.
   */
  static createDefaultTemplate = async args => {
    try {
      const { templateCaller } = this.selectTemplate(args.templateType);

      ApiClientConfigurator.configureApiClient(args);

      const templatesApi = new docusignEsign.TemplatesApi(ApiClientConfigurator.dsApiClient);
      const template = await templatesApi.createTemplate(args.accountId, {
        envelopeTemplate: templateCaller(),
      });

      // Edit newly created template and remove (number) from template name
      const originName = template.name.replace(/\s?\(\d+\)$/, '');

      await templatesApi.update(args.accountId, template.templateId, {
        envelopeTemplate: {
          name: originName,
        },
      });

      return {
        templateId: template.templateId,
        templateName: originName,
      };
    } catch (error) {
      this.logger.error(error);
      return { message: error.message || 'An error occurred while creating default templates.' };
    }
  };

  /**
   * Retrieve a specific template by its ID.
   * @param {{ basePath: string, accessToken: string, accountId: string }} args - The arguments for fetching a template.
   * @param {string} templateId - The ID of the template to retrieve.
   * @returns {Promise<EnvelopeTemplate>} - The details of the requested template.
   */
  static getTemplate = async (args, templateId) => {
    try {
      ApiClientConfigurator.configureApiClient(args);

      const templatesApi = new docusignEsign.TemplatesApi(ApiClientConfigurator.dsApiClient);
      return await templatesApi.get(args.accountId, templateId);
    } catch (error) {
      this.logger.error(error);
      return { message: error.message || 'An error occurred while retrieving the template.' };
    }
  };
}

module.exports = TemplatesService;
