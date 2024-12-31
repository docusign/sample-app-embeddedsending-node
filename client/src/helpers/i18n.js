const locale = 'en-US';

/**
 * @param {Date} dateObj
 */
export function formatLocalizedDateTime(dateObj) {
  return dateObj.toLocaleString(locale);
}
