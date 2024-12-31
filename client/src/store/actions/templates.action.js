import { TEMPLATES_LOADED } from '../types';

export const templatesLoaded = templatesList => ({
  type: TEMPLATES_LOADED,
  payload: templatesList,
});
