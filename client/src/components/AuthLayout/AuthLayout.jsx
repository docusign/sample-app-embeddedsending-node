import clsx from 'clsx/lite';
import Header from '../Header/Header';
import CopyrightFooter from '../CopyrightFooter/CopyrightFooter';
import t from '../../helpers/t';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ behindScenesContentNode, children }) => {
  return (
    <div className={styles.authLayout}>
      <Header />
      <div className={styles.pageBody}>
        <div className={clsx(styles.panel, styles.contentPanel)}>{children}</div>
        <aside className={clsx(styles.panel, styles.behindScenesPanel)}>
          <div className="dropdown">
            <button
              type="button"
              className={clsx('dropdown-toggle', styles.behindScenesToggleButton)}
              data-bs-toggle="collapse"
              data-bs-target="#behindScenesDropdown"
              aria-controls="behindScenesDropdown"
              aria-expanded="false"
            >
              {t.behindScenesCommon.behindScenes}
            </button>
            <div id="behindScenesDropdown" className="collapse">
              {behindScenesContentNode}
            </div>
          </div>
        </aside>
      </div>
      <CopyrightFooter />
    </div>
  );
};

export default AuthLayout;
