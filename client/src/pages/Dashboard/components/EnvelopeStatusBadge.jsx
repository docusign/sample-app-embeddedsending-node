import clsx from 'clsx/lite';
import styles from './EnvelopeStatusBadge.module.css';
import t from '../../../helpers/t';

const EnvelopeStatusBadge = ({ status }) => {
  const className = getClassNameForStatus(status);
  const displayText = t.envelopes.status[status] ?? t.envelopes.status.unknown;
  return <span className={clsx(styles.badge, className)}>{displayText}</span>;
};

export default EnvelopeStatusBadge;

/**
 * @param {import('../../../store/reducers/envelopes.reducer').EnvelopeStatus} status
 * @returns {string}
 */
function getClassNameForStatus(status) {
  switch (status) {
    case 'completed':
    case 'delivered':
    case 'sent':
    case 'signed':
      return styles.success;

    case 'correct':
    case 'created':
      return styles.neutral;

    case 'declined':
    case 'voided':
      return styles.danger;

    default:
      return styles.danger;
  }
}
