import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx/lite';
import logo from '../../assets/img/embeddedSendingIcon.svg';
import navbarToggler from '../../assets/img/navbarToggler.svg';
import t from '../../helpers/t.js';
import { AppRoute } from '../../constants.js';
import AuthService from '../../services/authService.js';
import LogoutIcon from './LogoutIcon.jsx';
import ExternalLink from '../ExternalLink/ExternalLink.jsx';
import styles from './Header.module.css';

const Header = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userEmail = useSelector(state => state.auth.userEmail);

  const handleLogOut = async e => {
    e.preventDefault();
    AuthService.logOut();
  };

  return (
    <header className={clsx('container', styles.header)}>
      <nav className="navbar navbar-expand-lg">
        <Link className={clsx('navbar-brand', styles.logo)} to={AppRoute.ROOT}>
          <img src={logo} alt={t.header.appName} />
          <span>{t.header.appName}</span>
        </Link>

        <button
          className={clsx('navbar-toggler', styles.navbarToggler)}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
        >
          <img src={navbarToggler} alt={t.header.toggleNavigation} />
        </button>

        <div className={clsx('offcanvas', 'offcanvas-end', styles.offcanvas)} tabIndex={-1} id="navbarNav">
          <div className="offcanvas-header">
            <button
              type="button"
              className={clsx('btn-close', 'btn-close-white', styles.closeButton)}
              data-bs-dismiss="offcanvas"
              aria-label={t.buttons.close}
            />
          </div>
          <div className="offcanvas-body">
            <div className="navbar-nav d-flex ms-auto">
              <ExternalLink className={clsx('nav-item', 'nav-link', styles.linkText)} href={t.links.github}>
                {t.header.github}
              </ExternalLink>
              {isAuthenticated && (
                <a className={clsx('nav-link', styles.linkText)} href="#" role="button" onClick={handleLogOut}>
                  {userEmail}

                  <LogoutIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
