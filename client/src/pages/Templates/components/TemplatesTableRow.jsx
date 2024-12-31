import { useState } from 'react';
import edit from '../../../assets/img/edit.svg';
import { api } from '../../../api';
import { AppRoute } from '../../../constants';
import createPrefixedLogger from '../../../helpers/logger';
import ErrorPopup from '../../../components/Popups/ErrorPopup';
import t from '../../../helpers/t';
import baseTableStyles from '../../../components/BaseTable/BaseTable.module.css';
import MyButton from '../../../components/MyButton/MyButton';

const logger = createPrefixedLogger('TemplatesTableRow');

const TemplatesTableRow = ({ template: { templateId, templateName } }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClicked = async () => {
    if (isLoading) {
      return;
    }

    setLoading(true);
    try {
      const returnUrl = `${window.location.origin}${AppRoute.TEMPLATES}`;
      const response = await api.templates.editTemplate({ templateId, returnUrl });
      const editUrl = response.data.url;
      if (!editUrl) {
        throw new Error('Edit response is missing url property.');
      }
      window.location.href = editUrl;

      // Note: Show loading a bit longer because the browser isn't redirected immediately,
      //       but we also don't want to softlock the button in case of back navigation
      setTimeout(() => setLoading(false), 5000);
    } catch (e) {
      logger.error('Unexpected error while generating edit link', e);
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        {templateName}

        {!!error && <ErrorPopup message={error} togglePopup={() => setError(null)} />}
      </td>

      <td className={baseTableStyles.stickyColumn}>
        <MyButton variant="link" onClick={handleEditClicked} showLoading={isLoading} disabled={isLoading}>
          {/* Desktop & Tablet text */}
          <span className="d-none d-md-inline">{t.templates.edit}</span>
          {/* Mobile icon */}
          <img className="d-inline d-md-none" src={edit} alt={t.templates.edit} />
        </MyButton>
      </td>
    </tr>
  );
};

export default TemplatesTableRow;
