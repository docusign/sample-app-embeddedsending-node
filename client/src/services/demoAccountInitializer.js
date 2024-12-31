import { api } from '../api';
import createPrefixedLogger from '../helpers/logger';
import { templatesLoaded } from '../store/actions';
import { store } from '../store/store';

const logger = createPrefixedLogger('DemoAccountInitializer');

export default class DemoAccountInitializer {
  static async initializeAccount() {
    const reduxState = store.getState();
    const templatesList = reduxState.templates.list;
    if (templatesList) {
      // Already initialized
      return;
    }

    try {
      // For the sake of the demo, we create individual templates for each session.
      // This allows many users to edit the templates while isolating the changes from other people.
      const createResponse = await api.templates.createDefaultTemplates();
      const templates = createResponse.data.templates;
      const templatesIds = templates.map(t => t.templateId);
      const templatesListResponse = await api.templates.getTemplates(templatesIds);
      store.dispatch(templatesLoaded(templatesListResponse.data.templates));
    } catch (e) {
      logger.error('Unexpected error when loading account info', e);
    }
  }
}
