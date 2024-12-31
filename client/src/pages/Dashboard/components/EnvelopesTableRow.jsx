import { useState } from 'react';
import edit from '../../../assets/img/edit.svg';
import { formatLocalizedDateTime } from '../../../helpers/i18n';
import MyButton from '../../../components/MyButton/MyButton';
import t from '../../../helpers/t';
import { api } from '../../../api';
import createPrefixedLogger from '../../../helpers/logger';
import { AppRoute } from '../../../constants';
import ErrorPopup from '../../../components/Popups/ErrorPopup';
import EnvelopeStatusBadge from './EnvelopeStatusBadge';
import baseTableStyles from '../../../components/BaseTable/BaseTable.module.css';

const logger = createPrefixedLogger('EnvelopesListItem');

const EnvelopesTableRow = ({
  envelope: { envelopeId, envelopeContacts, envelopeName, envelopeStatus, envelopeDate, allowEdit },
}) => {
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleEditClick = async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    try {
      const returnUrl = `${window.location.origin}${AppRoute.DASHBOARD}`;
      const response = await api.envelopes.editEnvelope({ envelopeId, returnUrl });
      const correctUrl = response.data.url;
      if (!correctUrl) {
        throw new Error('Edit response is missing url property.');
      }

      window.location.href = correctUrl;

      // Note: Show loading a bit longer because the browser isn't redirected immediately,
      //       but we also don't want to softlock the button in case of back navigation
      setTimeout(() => setLoading(false), 5000);
    } catch (e) {
      logger.error('Unexpected error while editing envelope', e);
      setError(e.message);
      setLoading(false);
    }
  };
  return (
    <tr>
      <td>
        {envelopeContacts}

        {
          /* Popup is placed here because browsers don't really like non-table elements in a table tree */
          !!error && <ErrorPopup message={error} togglePopup={() => setError(null)} />
        }
      </td>
      <td>{envelopeName}</td>
      <td>
        <EnvelopeStatusBadge status={envelopeStatus} />
      </td>
      <td>{formatLocalizedDateTime(new Date(envelopeDate))}</td>
      <td className={baseTableStyles.stickyColumn}>
        <MyButton variant="link" onClick={handleEditClick} disabled={!allowEdit || isLoading} showLoading={isLoading}>
          {/* Desktop & Tablet text */}
          <span className="d-none d-md-inline">{t.envelopes.edit}</span>
          {/* Mobile icon */}
          <img className="d-inline d-md-none" src={edit} alt={t.envelopes.edit} />
        </MyButton>
      </td>
    </tr>
  );
};

export default EnvelopesTableRow;
