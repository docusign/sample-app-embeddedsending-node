import { NavLink } from 'react-router-dom';
import clsx from 'clsx/lite';
import { AppRoute } from '../../constants';
import t from '../../helpers/t';
import DashboardIcon from './DashboardIcon';
import TemplatesIcon from './TemplatesIcon';
import ContactsIcon from './ContactsIcon';
import styles from './SidebarLayoutFrame.module.css';

const SidebarLayoutFrame = ({ children }) => {
  const getNavLinkClass = ({ isActive }) => clsx(styles.sidebarLink, isActive && styles.sidebarLinkActive);

  return (
    <div className={styles.contentPanel}>
      <div className={styles.sidebar}>
        <NavLink to={AppRoute.DASHBOARD} className={getNavLinkClass}>
          <DashboardIcon className={styles.sidebarLinkIcon} /> {t.tabs.dashboard}
        </NavLink>
        <NavLink to={AppRoute.TEMPLATES} className={getNavLinkClass}>
          <TemplatesIcon className={styles.sidebarLinkIcon} /> {t.tabs.templates}
        </NavLink>
        <NavLink to={AppRoute.CONTACTS} className={getNavLinkClass}>
          <ContactsIcon className={styles.sidebarLinkIcon} /> {t.tabs.contacts}
        </NavLink>
        <NavLink to={AppRoute.NAVIGATOR} className={getNavLinkClass}>
          <ContactsIcon className={styles.sidebarLinkIcon} /> {t.tabs.navigator}
        </NavLink>
      </div>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default SidebarLayoutFrame;
