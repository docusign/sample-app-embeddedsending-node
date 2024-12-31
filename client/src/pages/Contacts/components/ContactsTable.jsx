import { useSelector } from 'react-redux';
import ContactsTableRow from './ContactsTableRow';
import BaseTable from '../../../components/BaseTable/BaseTable';
import t from '../../../helpers/t';
import baseTableStyles from '../../../components/BaseTable/BaseTable.module.css';
import styles from './ContactsTable.module.css';

const ContactsTable = () => {
  const contacts = useSelector(state => state.contacts.list);

  return (
    <BaseTable className={styles.contactsTable}>
      <thead>
        <tr>
          <th scope="col">{t.contacts.contactName}</th>
          <th scope="col">{t.contacts.contactCompany}</th>
          <th scope="col" className={baseTableStyles.stickyColumn}>
            <span className="visually-hidden">{t.contacts.actions}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(c => (
          <ContactsTableRow key={c.id} contact={c} />
        ))}
      </tbody>
    </BaseTable>
  );
};

export default ContactsTable;
