import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx/lite';
import edit from '../../../assets/img/edit.svg';
import send from '../../../assets/img/send.svg';
import MyButton from '../../../components/MyButton/MyButton';
import ErrorPopup from '../../../components/Popups/ErrorPopup';
import EnvelopeSender from '../../../services/envelopeSender';
import createPrefixedLogger from '../../../helpers/logger';
import t from '../../../helpers/t';
import baseTableStyles from '../../../components/BaseTable/BaseTable.module.css';
import { AppRouteFactory } from '../../../constants';
import styles from './ContactsTableRow.module.css';

const logger = createPrefixedLogger('ContactsListItem');

const ContactsTableRow = ({ contact }) => {
  const templates = useSelector(state => state.templates.list);
  const [isLoading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const handleTemplateToSendClicked = async (e, template) => {
    e.preventDefault();

    dropdownRef.current?.click();

    if (isLoading) {
      return;
    }

    setLoading(true);
    try {
      const senderViewUrl = await EnvelopeSender.sendEnvelope(contact, template);

      window.location.href = senderViewUrl;

      // Note: Show loading a bit longer because the browser isn't redirected immediately,
      //       but we also don't want to softlock the button in case of back navigation
      setTimeout(() => setLoading(false), 5000);
    } catch (e) {
      logger.error('Unexpected error while sending envelope', e);
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        {contact.name}

        {!!error && <ErrorPopup message={error} togglePopup={() => setError(null)} />}
      </td>
      <td>{contact.organization}</td>
      <td className={clsx(baseTableStyles.stickyColumn, styles.actionsCell)}>
        <div className={styles.actions}>
          <MyButton to={AppRouteFactory.createEditContact(contact.id)} variant="link" className={styles.editButton}>
            {/* Desktop & Tablet text */}
            <span className="d-none d-md-inline">{t.contacts.editContact}</span>
            {/* Mobile icon */}
            <img className="d-inline d-md-none" src={edit} alt={t.contacts.editContact} />
          </MyButton>

          <div ref={dropdownRef} className="dropdown">
            {/* Desktop & Tablet button with text & dropdown arrow */}
            <MyButton
              variant="link"
              className="dropdown-toggle d-none d-md-inline-block"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              showLoading={isLoading}
              disabled={isLoading}
            >
              {t.contacts.sendEnvelope}
            </MyButton>
            {/* Mobile button with icon only */}
            <MyButton
              variant="link"
              className="d-inline-block d-md-none"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              showLoading={isLoading}
              disabled={isLoading}
            >
              <img src={send} alt={t.contacts.sendEnvelope} />
            </MyButton>
            <ul className={clsx('dropdown-menu', styles.templatesDropdown)}>
              {templates.map(t => (
                <li key={t.templateId}>
                  <a className="dropdown-item" href="#" onClick={e => handleTemplateToSendClicked(e, t)}>
                    {t.templateName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ContactsTableRow;
