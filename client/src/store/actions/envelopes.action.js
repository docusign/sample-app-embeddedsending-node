import { ADD_ENVELOPE_ID, ENVELOPES_LOADED } from '../types';

export const addEnvelopeId = envelopeId => ({
  type: ADD_ENVELOPE_ID,
  payload: envelopeId,
});

export const envelopesLoaded = envelopesList => ({
  type: ENVELOPES_LOADED,
  payload: envelopesList,
});
