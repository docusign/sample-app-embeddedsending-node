/**
 * @file
 * This file handles the Template scenarios.
 */

const path = require('path');
const TemplatesService = require('../services/templatesService');
const ErrorHandler = require('../utils/errorHandler');
const createPrefixedLogger = require('../utils/logger');
const { setBaseArgs } = require('../utils/requestUtils');

class TemplatesController {
  static templatesPath = path.join(path.resolve(), 'assets/templates');
  static logger = createPrefixedLogger(TemplatesController.name);
  static errorHandler = new ErrorHandler(this.logger);

  /**
   * Returns templates based on provided template IDs.
   */
  static getTemplates = async (req, res) => {
    try {
      const { body } = req;
      const args = {
        ...setBaseArgs(req),
        templateIds: body.templateIds,
      };
      const templateResponse = await TemplatesService.getTemplates(args);
      res.json({ templates: templateResponse });
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };

  /**
   * Creates a default set of templates.
   */
  static createDefaultTemplates = async (req, res) => {
    try {
      const templateResponse = await TemplatesService.createTemplates(setBaseArgs(req));
      res.json({ templates: templateResponse });
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };

  /**
   * Returns a URL for editing a template.
   */
  static editTemplate = async (req, res) => {
    try {
      const { body } = req;
      const args = {
        ...setBaseArgs(req),
        templateId: req.params.templateId,
        returnUrl: body.returnUrl,
      };

      const editUrl = await TemplatesService.editTemplate(args);
      res.json(editUrl);
    } catch (error) {
      this.errorHandler.handleErrorResponse(error, res);
    }
  };
}

module.exports = TemplatesController;
