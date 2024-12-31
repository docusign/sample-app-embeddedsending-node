import withAuth from '../../hocs/withAuth/withAuth.jsx';
import AuthLayout from '../../components/AuthLayout/AuthLayout.jsx';
import ContactsTable from './components/ContactsTable.jsx';
import t from '../../helpers/t.js';
import MyButton from '../../components/MyButton/MyButton.jsx';
import ContactsBehindScenes from './components/ContactsBehindScenes.jsx';
import SidebarLayoutFrame from '../../components/SidebarLayoutFrame/SidebarLayoutFrame.jsx';
import { AppRoute } from '../../constants.js';
import styles from './Contacts.module.css';

const ContactsNonAuth = () => {
  return (
    <AuthLayout behindScenesContentNode={<ContactsBehindScenes />}>
      <SidebarLayoutFrame>
        <div className={styles.header}>
          <h1>{t.tabs.contacts}</h1>
          <MyButton to={AppRoute.ADD_CONTACT} className={styles.createContactButton}>
            {t.contacts.createContact}
          </MyButton>
        </div>
        <ContactsTable />
      </SidebarLayoutFrame>
    </AuthLayout>
  );
};

const Contacts = withAuth(ContactsNonAuth);
export default Contacts;
